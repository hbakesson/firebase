/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Project {
  id: string;
  name: string;
  code: string;
  teamId?: string;
  organizationId: string;
  status: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface Period {
  id: string;
  label: string;
  startDate: Date;
  endDate: Date;
}

export interface Allocation {
  id: string;
  projectId: string;
  periodId: string;
  plannedHours: number;
  teamId: string;
}

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
  { id: "t1", name: "Engineering Alpha", organizationId: "mock-org", createdAt: "2026-03-27T10:00:00.000Z", isActive: true },
  { id: "t2", name: "Design Beta", organizationId: "mock-org", createdAt: "2026-03-27T11:00:00.000Z", isActive: true },
];

const mockProjects = [
  { id: "p1", name: "Nebula Infrastructure", code: "NEB-01", status: "ACTIVE", organizationId: "mock-org", teamId: "t1", allocations: [], actualAllocations: [], createdAt: "2026-03-27T12:00:00.000Z", updatedAt: "2026-03-28T09:00:00.000Z", progress: 45 },
  { id: "p2", name: "Solaris Portal v2", code: "SOL-02", status: "ACTIVE", organizationId: "mock-org", teamId: "t1", allocations: [], actualAllocations: [], createdAt: "2026-03-27T13:00:00.000Z", updatedAt: "2026-03-28T10:30:00.000Z", progress: 78 },
  { id: "p3", name: "Quantum Analytics", code: "QUA-03", status: "ACTIVE", organizationId: "mock-org", teamId: "t2", allocations: [], actualAllocations: [], createdAt: "2026-03-27T14:00:00.000Z", updatedAt: "2026-03-28T11:15:00.000Z", progress: 12 },
  { id: "p4", name: "Titan Core", code: "TIT-04", status: "ACTIVE", organizationId: "mock-org", teamId: "t2", allocations: [], actualAllocations: [], createdAt: "2026-03-27T15:00:00.000Z", updatedAt: "2026-03-28T12:45:00.000Z", progress: 92 },
  { id: "p5", name: "Legacy Cleanup", code: "LEG-99", status: "COMPLETED", organizationId: "mock-org", teamId: "t1", allocations: [], actualAllocations: [], createdAt: "2025-12-01T08:00:00.000Z", updatedAt: "2026-01-15T16:00:00.000Z", progress: 100 },
];

const mockAllocations: Allocation[] = [];

export const createMockPrisma = () => {
  console.log("🛠️ [MOCK] Initializing High-Fidelity Prisma Mock...");

  return {
    user: {
      findFirst: async () => mockUser,
      findUnique: async () => mockUser,
      create: async ({ data }: any) => ({ ...mockUser, ...data }),
    },
    team: {
      findMany: async () => mockTeams.map(t => ({ ...t, isActive: true })),
      count: async () => mockTeams.length,
    },
    project: {
      findMany: async ({ where, include }: any) => {
        console.log("🛠️ [MOCK] project.findMany", where);
        let results = mockProjects.filter(p => !where?.status || p.status === where.status);
        
        if (include?.team) {
          results = results.map(p => ({
            ...p,
            team: mockTeams.find(t => t.id === p.teamId)
          }));
        }
        return results;
      },
      findUnique: async ({ where }: any) => {
        const p = mockProjects.find(project => project.id === where.id);
        if (p) {
          return { ...p, team: mockTeams.find(t => t.id === p.teamId) };
        }
        return null;
      },
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
