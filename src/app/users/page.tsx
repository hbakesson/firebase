import { getUsers } from "@/lib/actions";
import { Users, Shield, Mail, CheckCircle2, Clock } from "lucide-react";
import { Metadata } from "next";
import InviteUserModal from "@/components/InviteUserModal";
import UserRow from "@/components/UserRow";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User Management | Project Tracker",
};

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user?.organizationId) redirect("/login");
  
  const users = await getUsers();

  return (
    <div className="users-page">
      <header className="header-row">
        <div>
          <h1>User Management</h1>
          <p style={{ color: "var(--text-muted)" }}>Manage roles, permissions, and collaborate with your team</p>
        </div>
        <InviteUserModal />
      </header>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="search-bar">
          <input type="text" placeholder="Search users by name or email..." />
          <Users className="search-icon" size={18} />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <UserRow key={user.id} user={user} currentUserId={session.user.id!} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={18} style={{ color: 'var(--primary)' }} />
            Roles & Permissions
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Configure global access levels for your organization members.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}>
              <strong>Admin</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full system access and user management</p>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}>
              <strong>User</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Can create and manage projects/teams</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} style={{ color: 'var(--primary)' }} />
            Pending Invites
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Users who haven&apos;t accepted their invitation yet.
          </p>
          <div className="empty-state" style={{ padding: '1rem' }}>
            No pending invitations
          </div>
        </div>
      </div>
    </div>
  );
}
