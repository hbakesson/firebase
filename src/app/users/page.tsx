import { Users, Shield, Clock, Mail } from "lucide-react";
import { Metadata } from "next";
import InviteUserModal from "@/components/InviteUserModal";
import UserRow from "@/components/UserRow";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "User Management | Project Tracker",
};

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  
  const orgId = session.user.organizationId!;

  // "Active" = Has at least one account linked or has logged in (NextAuth logic)
  // "Pending" = Invited but no account linked yet
  const usersWithAccounts = await prisma.user.findMany({
    where: { organizationId: orgId },
    include: { accounts: true }
  });

  const activeUsers = usersWithAccounts.filter((u: { accounts: unknown[]; id: string }) => u.accounts.length > 0 || u.id === session.user.id);
  const pendingUsers = usersWithAccounts.filter((u: { accounts: unknown[]; id: string }) => u.accounts.length === 0 && u.id !== session.user.id);

  return (
    <div className="users-page space-y-8">
      <header className="header-row">
        <div>
          <h1 className="text-3xl font-extrabold">User Management</h1>
          <p style={{ color: "var(--text-muted)" }}>Manage roles, permissions, and collaborate with your team</p>
        </div>
        <InviteUserModal />
      </header>

      <div className="card">
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
              {activeUsers.map((user: { id: string; name: string | null; email: string | null; role: string }) => (
                <UserRow key={user.id} user={user} currentUserId={session.user.id!} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={20} className="text-indigo-400" />
            Roles & Permissions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}>
              <div style={{ fontWeight: 600 }}>Admin</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full system access, fiscal governance, and user management.</p>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}>
              <div style={{ fontWeight: 600 }}>User</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Standard access to planning, reporting, and project management.</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} className="text-indigo-400" />
            Pending Invites
          </h3>
          {pendingUsers.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No pending invitations
            </div>
          ) : (
            <div className="space-y-3">
              {pendingUsers.map((user: { id: string; email: string | null; role: string }) => (
                <div key={user.id} className="user-badge" style={{ justifyContent: 'space-between', padding: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Mail size={16} className="text-indigo-400" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user.email}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Invited as {user.role}</div>
                    </div>
                  </div>
                  <span className="role-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: 'none' }}>
                    Awaiting
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
