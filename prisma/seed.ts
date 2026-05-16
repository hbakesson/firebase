import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean existing data
  await prisma.actualAllocation.deleteMany();
  await prisma.budgetAllocation.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.period.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();
  await prisma.organization.deleteMany();

  console.log('🧹 Cleaned existing data.');

  // 2. Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Global Innovation Lab',
      fiscalYearStartMonth: 1,
      defaultCurrency: 'USD',
    },
  });

  // 3. Create Teams
  const eng = await prisma.team.create({
    data: {
      name: 'Engineering',
      code: 'ENG',
      organizationId: org.id,
    },
  });

  const frontend = await prisma.team.create({
    data: {
      name: 'Frontend Web',
      code: 'FE-WEB',
      parentTeamId: eng.id,
      organizationId: org.id,
    },
  });

  const backend = await prisma.team.create({
    data: {
      name: 'Backend Systems',
      code: 'BE-SYS',
      parentTeamId: eng.id,
      organizationId: org.id,
    },
  });

  const mobile = await prisma.team.create({
    data: {
      name: 'Mobile Core',
      code: 'MOB-CORE',
      parentTeamId: eng.id,
      organizationId: org.id,
    },
  });

  const product = await prisma.team.create({
    data: {
      name: 'Product Design',
      code: 'PD-DSGN',
      organizationId: org.id,
    },
  });

  console.log('👥 Teams created.');

  // 4. Create Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const usersData = [
    { name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { name: 'Guest User', email: 'guest@example.com', role: 'user', isGuest: true },
    { name: 'Alice Chen', email: 'alice@example.com', role: 'user' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
    { name: 'Charlie Davis', email: 'charlie@example.com', role: 'user' },
    { name: 'Diana Prince', email: 'diana@example.com', role: 'user' },
    { name: 'Erik Lensherr', email: 'erik@example.com', role: 'user' },
    { name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'user' },
    { name: 'George Miller', email: 'george@example.com', role: 'user' },
    { name: 'Hannah Abbott', email: 'hannah@example.com', role: 'user' },
    { name: 'Ivan Vanko', email: 'ivan@example.com', role: 'user' },
    { name: 'Julia Roberts', email: 'julia@example.com', role: 'user' },
  ];

  for (const u of usersData) {
    await prisma.user.create({
      data: {
        ...u,
        password: hashedPassword,
        organizationId: org.id,
      },
    });
  }

  console.log('👤 Additional users created.');

  // 5. Create Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'Project Phoenix',
        code: 'PHX-01',
        status: 'ACTIVE',
        priority: 1,
        organizationId: org.id,
        createdBy: 'system',
        teams: { connect: [{ id: frontend.id }, { id: backend.id }] }
      }
    }),
    prisma.project.create({
      data: {
        name: 'Quantum UI',
        code: 'QNT-UI',
        status: 'ACTIVE',
        priority: 2,
        organizationId: org.id,
        createdBy: 'system',
        teams: { connect: [{ id: frontend.id }, { id: product.id }] }
      }
    }),
    prisma.project.create({
      data: {
        name: 'Deep Data API',
        code: 'DDP-API',
        status: 'ACTIVE',
        priority: 1,
        organizationId: org.id,
        createdBy: 'system',
        teams: { connect: [{ id: backend.id }] }
      }
    }),
    prisma.project.create({
      data: {
        name: 'Mobile Revamp',
        code: 'MOB-RVP',
        status: 'ACTIVE',
        priority: 3,
        organizationId: org.id,
        createdBy: 'system',
        teams: { connect: [{ id: mobile.id }] }
      }
    }),
    prisma.project.create({
      data: {
        name: 'Legacy Migration',
        code: 'LEG-MIG',
        status: 'ACTIVE',
        priority: 2,
        organizationId: org.id,
        createdBy: 'system',
        teams: { connect: [{ id: backend.id }, { id: frontend.id }] }
      }
    }),
  ]);

  console.log('🏗️ Projects created.');

  // 6. Create Weekly Periods
  const periods = [];
  const today = new Date();
  // Start from 4 weeks ago to show some historical actuals
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay() - 28); 

  for (let i = 0; i < 12; i++) {
    const pStart = new Date(startDate);
    pStart.setDate(startDate.getDate() + (i * 7));
    
    const pEnd = new Date(pStart);
    pEnd.setDate(pStart.getDate() + 6);

    const period = await prisma.period.create({
      data: {
        organizationId: org.id,
        type: 'WEEKLY',
        startDate: pStart,
        endDate: pEnd,
        label: `W${i + 1}`,
        isLocked: pEnd < today,
      }
    });
    periods.push(period);
  }

  console.log('📅 Periods created.');

  // 7. Create Some Allocations and Actuals
  for (const prj of projects) {
    const relatedTeams = [frontend, backend, mobile, product].filter(t => 
      // Simplified: if project has teams relation, we just use those
      true // We'll just seed a bit for everyone for the demo
    );

    for (const team of relatedTeams) {
      for (const per of periods) {
        // Random hours
        const planned = Math.floor(Math.random() * 40);
        const actual = Math.floor(Math.random() * 45);

        await prisma.budgetAllocation.create({
          data: {
            teamId: team.id,
            projectId: prj.id,
            periodId: per.id,
            plannedHours: planned,
          }
        });

        // Only add actuals for past or current periods
        if (new Date(per.startDate) <= today) {
          await prisma.actualAllocation.create({
            data: {
              teamId: team.id,
              projectId: prj.id,
              periodId: per.id,
              actualHours: actual,
            }
          });
        }
      }
    }
  }

  console.log('📊 Allocation data seeded.');
  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
