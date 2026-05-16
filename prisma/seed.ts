import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed (Capacity Architecture)...');

  // 1. Clean existing data
  await prisma.allocation.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.period.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();
  await prisma.organization.deleteMany();

  console.log('🧹 Cleaned existing data.');

  // 2. Create Organization
  const org = await prisma.organization.upsert({
    where: { id: 'dev-org-id' },
    update: {},
    create: {
      id: 'dev-org-id',
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

  const product = await prisma.team.create({
    data: {
      name: 'Product Design',
      code: 'PD-DSGN',
      organizationId: org.id,
    },
  });

  console.log('👥 Teams created.');

  // 4. Create Users with Capacity
  const hashedPassword = await bcrypt.hash('password123', 10);

  const usersData = [
    { name: 'Admin User', email: 'admin@example.com', role: 'admin', capacity: 8.0 },
    { name: 'Guest User', email: 'guest@example.com', role: 'user', isGuest: true, capacity: 8.0 },
    { name: 'Alice Chen', email: 'alice@example.com', role: 'user', capacity: 8.0 },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'user', capacity: 6.0 }, // Part-time
    { name: 'Charlie Davis', email: 'charlie@example.com', role: 'user', capacity: 8.0 },
    { name: 'Diana Prince', email: 'diana@example.com', role: 'user', capacity: 8.0 },
    { name: 'Erik Lensherr', email: 'erik@example.com', role: 'user', capacity: 4.0 }, // 50%
  ];

  const createdUsers = [];
  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        role: u.role,
        isGuest: u.isGuest || false,
        organizationId: org.id,
        capacityPerDay: u.capacity,
      },
      create: {
        id: u.email === 'guest@example.com' ? 'guest-user-id' : undefined,
        name: u.name,
        email: u.email,
        role: u.role,
        isGuest: u.isGuest || false,
        password: hashedPassword,
        organizationId: org.id,
        capacityPerDay: u.capacity,
      },
    });
    createdUsers.push(user);
  }

  console.log('👤 Users created with capacity metrics.');

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
  const startDate = new Date(today);
  // Start from 2 weeks ago
  startDate.setDate(today.getDate() - today.getDay() - 14); 

  for (let i = 0; i < 8; i++) {
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

  console.log('📅 Weekly periods created.');

  // 7. Create Triple-Bucket Allocations
  for (const prj of projects) {
    // Each project gets some high-level team "Requested" hours
    for (const team of [frontend, backend, product]) {
      for (const per of periods) {
        const requested = 20 + Math.floor(Math.random() * 40);
        const allocated = requested - Math.floor(Math.random() * 10);
        const actual = (new Date(per.startDate) <= today) ? (allocated + (Math.random() > 0.5 ? 5 : -5)) : 0;

        await prisma.allocation.create({
          data: {
            projectId: prj.id,
            teamId: team.id,
            periodId: per.id,
            requestedHours: requested,
            allocatedHours: allocated,
            actualHours: actual,
          }
        });
      }
    }

    // Assign specific users to Project Phoenix
    if (prj.name === 'Project Phoenix') {
      const assignedUsers = createdUsers.slice(2, 5); // Alice, Bob, Charlie
      for (const user of assignedUsers) {
        for (const per of periods) {
          await prisma.allocation.create({
            data: {
              projectId: prj.id,
              teamId: frontend.id,
              userId: user.id,
              periodId: per.id,
              requestedHours: 0, // Individual usually don't have "requested" at this level in this model
              allocatedHours: 15 + Math.floor(Math.random() * 10),
              actualHours: (new Date(per.startDate) <= today) ? 15 + Math.floor(Math.random() * 15) : 0,
            }
          });
        }
      }
    }
  }

  console.log('📊 Allocation data seeded with Triple-Bucket values.');
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
