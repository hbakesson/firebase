"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CalendarRange, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: string;
    organizationId?: string | null;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Teams", href: "/teams", icon: Users },
    { label: "Projects", href: "/projects", icon: Briefcase },
    { label: "Planning", href: "/planning", icon: CalendarRange },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">Project Tracker</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          {user.role} • Org: {user.organizationId?.slice(0, 8) || "General"}
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge" style={{ padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
              {user.name || user.email?.split('@')[0]}
            </span>
            <span style={{ fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.email}
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="danger btn-sm"
          style={{ width: '100%', justifyContent: 'flex-start', padding: '0.6rem 1rem' }}
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
