/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Project {
  id: string;
  name: string;
  code: string;
  teams?: { id: string; name: string }[];
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
  isLocked?: boolean;
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

const mockProjects: any[] = [
  { id: "p1", name: "Nebula Infrastructure", code: "NEB-01", status: "ACTIVE", organizationId: "mock-org", teamIds: ["t1"], allocations: [], actualAllocations: [], createdAt: "2026-03-27T10:00:00.000Z", updatedAt: "2026-03-27T10:00:00.000Z", progress: 45 },
  { id: "p2", name: "Solaris Portal v2", code: "SOL-02", status: "ACTIVE", organizationId: "mock-org", teamIds: ["t1"], allocations: [], actualAllocations: [], createdAt: "2026-03-27T11:00:00.000Z", updatedAt: "2026-03-27T11:00:00.000Z", progress: 78 },
  { id: "p3", name: "Quantum Analytics", code: "QUA-03", status: "ACTIVE", organizationId: "mock-org", teamIds: ["t2"], allocations: [], actualAllocations: [], createdAt: "2026-03-27T12:00:00.000Z", updatedAt: "2026-03-27T12:00:00.000Z", progress: 12 },
  { id: "p4", name: "Titan Core", code: "TIT-04", status: "ACTIVE", organizationId: "mock-org", teamIds: ["t2"], allocations: [], actualAllocations: [], createdAt: "2026-03-27T13:00:00.000Z", updatedAt: "2026-03-27T13:00:00.000Z", progress: 92 },
  { id: "p5", name: "Legacy Cleanup", code: "LEG-99", status: "COMPLETED", organizationId: "mock-org", teamIds: ["t1"], allocations: [], actualAllocations: [], createdAt: "2025-12-01T08:00:00.000Z", updatedAt: "2026-01-15T16:00:00.000Z", progress: 100 },
];

const mockAllocations: Allocation[] = [];
const mockActualAllocations: any[] = [];

export const createMockPrisma = () => {
  console.log("🛠️ [MOCK] Initializing High-Fidelity Prisma Mock...");

  return {
    user: {
      findFirst: async () => mockUser,
      findUnique: async () => mockUser,
      findMany: async () => [mockUser],
      create: async ({ data }: any) => ({ ...mockUser, ...data }),
    },
    team: {
      findMany: async ({ include }: any = {}) => {
        return mockTeams.map(t => {
          let parentTeam = null;
          if (include?.parentTeam && (t as any).parentTeamId) {
            parentTeam = mockTeams.find(p => p.id === (t as any).parentTeamId) || null;
          }
          const team = { 
            ...t, 
            isActive: true, 
            parentTeam,
            allocations: (t as any).allocations || []
          };
          if (include?.projects) {
            (team as any).projects = mockProjects.filter(p => p.teamIds?.includes(t.id));
          }
          return team;
        });
      },
      count: async () => mockTeams.length,
      create: async ({ data }: any) => {
        const newTeam = { id: `mock-team-${Date.now()}`, ...data, isActive: true, createdAt: new Date().toISOString() };
        mockTeams.push(newTeam);
        return newTeam;
      },
      update: async ({ where, data }: any) => {
        const idx = mockTeams.findIndex(t => t.id === where.id);
        if (idx >= 0) {
          const { projects, ...rest } = data;
          if (projects?.set) {
            const projectIds = projects.set.map((p: any) => p.id);
            // Updating a team's projects means updating the teamIds inside mockProjects
            mockProjects.forEach(p => {
              const hasTeam = p.teamIds?.includes(where.id);
              const shouldHaveTeam = projectIds.includes(p.id);
              if (shouldHaveTeam && !hasTeam) {
                p.teamIds = [...(p.teamIds || []), where.id];
              } else if (!shouldHaveTeam && hasTeam) {
                p.teamIds = p.teamIds.filter((id: string) => id !== where.id);
              }
            });
          }
          mockTeams[idx] = { ...mockTeams[idx], ...rest };
          return mockTeams[idx];
        }
        return null;
      },
      delete: async ({ where }: any) => {
        const idx = mockTeams.findIndex(t => t.id === where.id);
        if (idx >= 0) {
          const removed = mockTeams.splice(idx, 1)[0];
          // Remove this team from any projects
          mockProjects.forEach(p => {
            if (p.teamIds?.includes(where.id)) {
              p.teamIds = p.teamIds.filter((id: string) => id !== where.id);
            }
          });
          return removed;
        }
        return null;
      },
      findUnique: async ({ where, include }: any) => {
        const t = mockTeams.find(team => team.id === where.id);
        if (t) {
          const team = { 
            ...t,
            allocations: (t as any).allocations || []
          };
          if (include?.projects) {
            (team as any).projects = mockProjects.filter(p => p.teamIds?.includes(t.id));
          }
          return team;
        }
        return null;
      },
    },
    project: {
      findMany: async ({ where, include }: any = {}) => {
        let results = mockProjects.filter(p => !where?.status || p.status === where.status);
        
        if (include) {
          results = results.map(p => {
            const extended: any = { 
              ...p,
              allocations: p.allocations || [],
              actualAllocations: p.actualAllocations || [],
              teams: p.teams || []
            };
            if (include.teams) {
              extended.teams = (p.teamIds || []).map((id: string) => mockTeams.find(t => t.id === id)).filter(Boolean);
            }
            return extended;
          });
        }
        return results;
      },
      findUnique: async ({ where, include }: any) => {
        const p = mockProjects.find(project => project.id === where.id);
        if (p) {
          const project = { ...p };
          if (include?.teams) {
            (project as any).teams = (p.teamIds || []).map((id: string) => mockTeams.find(t => t.id === id)).filter(Boolean);
          }
          return project;
        }
        return null;
      },
      count: async ({ where }: any) => {
        return mockProjects.filter(p => !where?.status || p.status === where.status).length;
      },
      create: async ({ data }: any) => {
        const { teams, ...rest } = data;
        const teamIds = teams?.connect ? teams.connect.map((c: any) => c.id) : [];
        const newProject = { 
          id: `p-${Date.now()}`, 
          ...rest, 
          teamIds, 
          status: "ACTIVE", 
          progress: 0, 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString() 
        };
        mockProjects.push(newProject);
        return newProject;
      },
      update: async ({ where, data }: any) => {
        const idx = mockProjects.findIndex(p => p.id === where.id);
        if (idx >= 0) {
          const { teams, ...rest } = data;
          if (teams?.set) {
            mockProjects[idx].teamIds = teams.set.map((s: any) => s.id);
          }
          mockProjects[idx] = { ...mockProjects[idx], ...rest, updatedAt: new Date().toISOString() };
          return mockProjects[idx];
        }
        return null;
      },
      delete: async ({ where }: any) => {
        const idx = mockProjects.findIndex(p => p.id === where.id);
        if (idx >= 0) return mockProjects.splice(idx, 1)[0];
        return null;
      }
    },
    period: {
      findMany: async () => [],
      findUnique: async ({ where }: any) => ({ id: where.id, label: `Mock Period ${where.id}`, isLocked: false }),
      findFirst: async ({ where }: any) => ({ id: where?.id || "p1", label: "Mock Period Alpha", isLocked: false }),
      upsert: async ({ create, where, update }: any) => {
        console.log("🛠️ [MOCK] period.upsert", where);
        return { 
          id: where?.id || `per-${create?.startDate?.toISOString() || Date.now()}`, 
          label: create?.label || "Mock Period",
          isLocked: false,
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
        const { teamId, projectId, periodId } = where.teamId_projectId_periodId || where;

        const existingIdx = mockAllocations.findIndex(a => 
          a.teamId === teamId &&
          a.projectId === projectId && 
          a.periodId === periodId
        );

        if (existingIdx >= 0) {
          mockAllocations[existingIdx] = { ...mockAllocations[existingIdx], ...update };
          return mockAllocations[existingIdx];
        } else {
          const newAlloc = { 
            id: `alloc-${Date.now()}`, 
            teamId, 
            projectId, 
            periodId, 
            ...create 
          };
          mockAllocations.push(newAlloc);
          return newAlloc;
        }
      }
    },
    actualAllocation: {
      findMany: async ({ where }: any) => {
        let results = mockActualAllocations;
        if (where?.projectId?.in) {
          results = results.filter(a => where.projectId.in.includes(a.projectId));
        }
        if (where?.periodId?.in) {
          results = results.filter(a => where.periodId.in.includes(a.periodId));
        }
        return results;
      },
      upsert: async ({ create, update, where }: any) => {
        console.log("🛠️ [MOCK] actualAllocation.upsert", where);
        
        const { teamId, projectId, periodId } = where.teamId_projectId_periodId || where;

        const existingIdx = mockActualAllocations.findIndex(a => 
          a.teamId === teamId &&
          a.projectId === projectId && 
          a.periodId === periodId
        );

        if (existingIdx >= 0) {
          mockActualAllocations[existingIdx] = { ...mockActualAllocations[existingIdx], ...update };
          return mockActualAllocations[existingIdx];
        } else {
          const newAlloc = { 
            id: `actual-${Date.now()}`, 
            teamId, 
            projectId, 
            periodId, 
            ...create 
          };
          mockActualAllocations.push(newAlloc);
          return newAlloc;
        }
      },
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
      findFirst: async () => ({ 
        id: "mock-org", 
        name: "Mock Organization",
        fiscalYearStartMonth: 1,
        defaultCurrency: "USD"
      }),
      findUnique: async ({ where }: any) => ({ 
        id: where.id || "mock-org", 
        name: "Mock Organization",
        fiscalYearStartMonth: 1,
        defaultCurrency: "USD"
      }),
      update: async ({ where, data }: any) => ({ 
        id: where.id || "mock-org", 
        name: "Mock Organization", 
        ...data 
      }),
    },
    $transaction: async (promises: Promise<any>[]) => Promise.all(promises),
  };
};
