import { PrismaClient } from '../src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Connector } from '@google-cloud/cloud-sql-connector';
import pg from 'pg';

/**
 * PRODUCTION SEEDER
 * Populates the Cloud SQL instance with the hardened model data
 * used during the regression audit.
 */

async function seed() {
  console.log('🚀 [SEED] Starting Production Seeder...');
  
  // 1. Initialize Cloud SQL Connector for the script
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: 'testapp-4f81d:europe-north1:project-tracker',
    ipType: 'PUBLIC',
  });

  const pool = new pg.Pool({
    ...clientOpts,
    user: 'postgres',
    password: 'Tjorn2026!!!!!!',
    database: 'project-tracker',
    max: 1,
  });

  const adapter = new PrismaPg(pool as any);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log('📦 [SEED] Cleaning existing data...');
    // Sequence matters due to FKs
    await prisma.budgetAllocation.deleteMany();
    await prisma.actualAllocation.deleteMany();
    await prisma.auditLog.deleteMany();
    await prisma.project.deleteMany();
    await prisma.team.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();

    console.log('🏢 [SEED] Creating Organization...');
    await prisma.organization.create({
      data: {
        id: 'mock-org',
        name: 'Mock Industries',
      }
    });

    console.log('👥 [SEED] Creating Teams...');
    await prisma.team.createMany({
      data: [
        { id: 't1', name: 'Engineering Alpha', organizationId: 'mock-org', code: 'TEAM-ALPHA', isActive: true },
        { id: 't2', name: 'Design Beta', organizationId: 'mock-org', code: 'TEAM-BETA', isActive: true },
      ]
    });

    console.log('📊 [SEED] Creating Projects...');
    await prisma.project.createMany({
      data: [
        { id: 'p1', name: 'Nebula Infrastructure', code: 'NEB-01', status: 'ACTIVE', organizationId: 'mock-org', teamId: 't1', progress: 45, createdBy: 'seed' },
        { id: 'p2', name: 'Solaris Portal v2', code: 'SOL-02', status: 'ACTIVE', organizationId: 'mock-org', teamId: 't1', progress: 78, createdBy: 'seed' },
        { id: 'p3', name: 'Quantum Analytics', code: 'QUA-03', status: 'ACTIVE', organizationId: 'mock-org', teamId: 't2', progress: 12, createdBy: 'seed' },
        { id: 'p4', name: 'Titan Core', code: 'TIT-04', status: 'ACTIVE', organizationId: 'mock-org', teamId: 't2', progress: 92, createdBy: 'seed' },
        { id: 'p5', name: 'Legacy Cleanup', code: 'LEG-99', status: 'COMPLETED', organizationId: 'mock-org', teamId: 't1', progress: 100, createdBy: 'seed' },
      ]
    });

    console.log('✅ [SEED] Production Seeder Completed Successfully.');
  } catch (error) {
    console.error('❌ [SEED] Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
    connector.close();
  }
}

seed();
