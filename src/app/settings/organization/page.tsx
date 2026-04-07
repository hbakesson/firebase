import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import OrgSettingsForm from "./OrgSettingsForm";
import { Building, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default async function OrgSettingsPage() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") redirect("/settings");
  if (!session.user.organizationId) redirect("/");

  const organization = await prisma.organization.findUnique({
    where: { id: session.user.organizationId }
  });

  if (!organization) redirect("/");

  return (
    <div className="space-y-8">
      <header className="header-row">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/settings" className="secondary btn-xs flex items-center gap-1" style={{ padding: '0.2rem 0.5rem' }}>
              <ArrowLeft size={14} /> Back to Settings
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <Building size={32} className="text-indigo-400" />
            Organization Governance
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Configure organization-wide defaults, fiscal calendars, and administrative controls.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '800px' }}>
        <div className="card shadow-glass">
          <div className="flex items-center gap-2 mb-6" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Shield size={14} /> Admin Access Only
          </div>
          
          <OrgSettingsForm 
            initialData={{
              name: organization.name,
              fiscalYearStartMonth: organization.fiscalYearStartMonth,
              defaultCurrency: organization.defaultCurrency
            }} 
          />
        </div>

        <div className="card shadow-glass mt-8" style={{ border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.02)' }}>
          <h3 className="text-red-400 font-bold mb-4">Danger Zone</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Deleting an organization will permanently remove all associated projects, teams, and data. This action is not reversible.
          </p>
          <button className="secondary" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }} disabled>
            Delete Organization
          </button>
        </div>
      </div>
    </div>
  );
}
