/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A robust, high-fidelity mock Prisma Client for local UI verification.
 * This simulates the official Prisma API for teams, projects, and allocations,
 * enabling full Dashboard and Bulk Mode verification without GCP.
 */

const mockUser = {
  id: "u1",
  name: "Mock Administrator",
  email: "mock@example.com",
  role: "admin",
  organizationId: "mock-org"
};

const mockTeams = [
  { id: "t1", name: "Engineering Alpha", organizationId: "mock-org" },
  { id: "t2", name: "Design Beta", organizationId: "mock-org" },
];

const mockProjects = [
  { id: "p1", name: "Nebula Infrastructure", code: "NEB-01", status: "ACTIVE", organizationId: "mock-org", teamId: "t1" },
  { id: "p2", name: "Solaris Portal v2", code: "SOL-02", status: "ACTIVE", organizationId: "mock-org", teamId: "t1" },
  { id: "p3", name: "Quantum Analytics", code: "QUA-03", status: "ACTIVE", organizationId: "mock-org", teamId: "t2" },
  { id: "p4", name: "Titan Core", code: "TIT-04", status: "ACTIVE", organizationId: "mock-org", teamId: "t2" },
  { id: "p5", name: "Legacy Cleanup", code: "LEG-99", status: "COMPLETED", organizationId: "mock-org", teamId: "t1" },
];

const mockAllocations: any[] = [];

export const createMockPrisma = () => {
  console.log("🛠️ [MOCK] Initializing High-Fidelity Prisma Mock...");

  return {
    user: {
      findFirst: async () => mockUser,
      findUnique: async () => mockUser,
      create: async ({ data }: any) => ({ ...mockUser, ...data }),
    },
    team: {
      findMany: async () => mockTeams,
      count: async () => mockTeams.length,
    },
    project: {
      findMany: async ({ where }: any) => {
        console.log("🛠️ [MOCK] project.findMany", where);
        return mockProjects.filter(p => !where?.status || p.status === where.status);
      },
      findUnique: async ({ where }: any) => mockProjects.find(p => p.id === where.id),
      count: async ({ where }: any) => {
        return mockProjects.filter(p => !where?.status || p.status === where.status).length;
      },
    },
    period: {
      findMany: async () => [],
      upsert: async ({ create, where, update }: any) => {
        console.log("🛠️ [MOCK] period.upsert", where);
        return { 
          id: `per-${create?.startDate?.toISOString() || Date.now()}`, 
          ...create,
          ...update
        };
      },
    },
    budgetAllocation: {
      findMany: async ({ where }: any) => {
        if (where?.projectId?.in) {
          return mockAllocations.filter(a => where.projectId.in.includes(a.projectId));
        }
        return mockAllocations;
      },
      upsert: async ({ create, update, where }: any) => {
        console.log("🛠️ [MOCK] budgetAllocation.upsert", where);
        
        // Handle composite unique key logic from prisma call: 
        // where: { teamId_projectId_periodId: { teamId, projectId, periodId } }
        const { projectId, periodId } = where.teamId_projectId_periodId || where;

        const existingIdx = mockAllocations.findIndex(a => 
          a.projectId === projectId && 
          a.periodId === periodId
        );

        if (existingIdx >= 0) {
          mockAllocations[existingIdx] = { ...mockAllocations[existingIdx], ...update };
          return mockAllocations[existingIdx];
        } else {
          const newAlloc = { id: `alloc-${Date.now()}`, ...create };
          mockAllocations.push(newAlloc);
          return newAlloc;
        }
      }
    },
    actualAllocation: {
      upsert: async ({ create }: any) => ({ id: `actual-${Date.now()}`, ...create }),
    },
    auditLog: {
      create: async ({ data }: any) => {
        console.log("🛠️ [MOCK] auditLog.create", data.action, data.entityType);
        return { id: `log-${Date.now()}`, ...data, timestamp: new Date() };
      },
      findMany: async () => [],
      count: async () => 0,
    },
    organization: {
      findFirst: async () => ({ id: "mock-org", name: "Mock Organization" }),
    },
    $transaction: async (promises: Promise<any>[]) => Promise.all(promises),
  };
};
