/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A lightweight, Proxy-based mock of the Prisma Client for local UI verification.
 * This allows testing the 'Bulk Mode' and TanStack Table without GCP Cloud SQL credentials.
 */

const mockProjects = [
  { id: "p1", name: "Nebula Infrastructure", code: "NEB-01", status: "ACTIVE", organizationId: "mock-org", teamId: "t1" },
  { id: "p2", name: "Solaris Portal v2", code: "SOL-02", status: "ACTIVE", organizationId: "mock-org", teamId: "t1" },
  { id: "p3", name: "Quantum Analytics", code: "QUA-03", status: "ACTIVE", organizationId: "mock-org", teamId: "t2" },
  { id: "p4", name: "Titan Core", code: "TIT-04", status: "ACTIVE", organizationId: "mock-org", teamId: "t2" },
  { id: "p5", name: "Legacy Cleanup", code: "LEG-99", status: "COMPLETED", organizationId: "mock-org", teamId: "t1" },
];

const mockTeams = [
  { id: "t1", name: "Engineering Alpha", organizationId: "mock-org" },
  { id: "t2", name: "Design Beta", organizationId: "mock-org" },
];

const mockUser = {
  id: "u1",
  name: "Mock Administrator",
  email: "mock@example.com",
  role: "admin",
  organizationId: "mock-org"
};

const mockAllocations: any[] = [];

export const createMockPrisma = () => {
  console.log("🛠️ [MOCK] Initializing Mock Prisma Client...");

  const handler = {
    get(target: any, prop: string): any {
      if (prop === "project") {
        return {
          findMany: async ({ where }: any) => {
            console.log("🛠️ [MOCK] project.findMany", where);
            return mockProjects.filter(p => !where?.status || p.status === where.status);
          },
          findUnique: async ({ where }: any) => mockProjects.find(p => p.id === where.id),
          count: async () => mockProjects.length,
        };
      }

      if (prop === "team") {
        return {
          findMany: async () => mockTeams,
          count: async () => mockTeams.length,
        };
      }

      if (prop === "organization") {
        return {
          findFirst: async () => ({ id: "mock-org", name: "Mock Organization" }),
          create: async ({ data }: any) => ({ id: "mock-org", ...data }),
        };
      }

      if (prop === "user") {
        return {
          findFirst: async () => mockUser,
          findUnique: async () => mockUser,
          create: async ({ data }: any) => ({ ...mockUser, ...data }),
        };
      }

      if (prop === "period") {
        return {
          findMany: async () => [],
          upsert: async ({ create }: any) => ({ id: `per-${create.startDate.getTime()}`, ...create }),
        };
      }

      if (prop === "budgetAllocation") {
        return {
          findMany: async () => mockAllocations,
          upsert: async ({ create, update, where }: any) => {
             // Handle the composite key "where" filter correctly
             const filter = where.teamId_projectId_periodId || where;
             const existingIdx = mockAllocations.findIndex(a => 
                a.projectId === filter.projectId && 
                a.periodId === filter.periodId &&
                a.teamId === filter.teamId
             );
             
             if (existingIdx >= 0) {
               mockAllocations[existingIdx].plannedHours = update.plannedHours;
               return mockAllocations[existingIdx];
             } else {
               const newAlloc = { id: `alloc-${Date.now()}`, ...create };
               mockAllocations.push(newAlloc);
               return newAlloc;
             }
          }
        };
      }

      if (prop === "$transaction") {
        return async (promises: Promise<any>[]) => Promise.all(promises);
      }

      return () => { console.log(`🛠️ [MOCK] Unhandled call to ${prop}`); return null; };
    }
  };

  return new Proxy({}, handler);
};
