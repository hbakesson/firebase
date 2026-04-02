import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Settings as SettingsIcon, User, Shield, Building } from "lucide-react";
import { Metadata } from "next";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Settings | Project Tracker",
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { name, email, role, organizationId } = session.user;

  return (
    <div className="space-y-8">
      <header className="header-row">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <SettingsIcon size={32} className="text-indigo-400" />
            Settings
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Manage your personal preferences and account details.
          </p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Profile Settings */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <User size={20} className="text-indigo-400" />
            Profile Details
          </h3>
          <ProfileForm initialName={name || ""} email={email || ""} />
        </div>

        {/* Organization / Role Info */}
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <Shield size={20} className="text-indigo-400" />
            Account Status
          </h3>
          <div className="space-y-4">
            <div className="form-group">
              <label>Current Role</label>
              <div style={{ marginTop: '0.5rem' }}>
                <span className={`role-tag ${role === 'admin' ? 'role-admin' : 'role-staff'}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                  {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Unknown"}
                </span>
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={16} />
                Organization ID
              </label>
              <code className="sku" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                {organizationId || "None"}
              </code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
