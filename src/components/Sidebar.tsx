"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight,
  Upload,
  ShieldCheck,
  Zap,
  Calendar,
  Sun,
  Moon
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "./ThemeContext";

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
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Teams", href: "/teams", icon: Users },
    { label: "Users", href: "/users", icon: Zap }, // Using Zap for now as a prominent admin feature
    { label: "Projects", href: "/projects", icon: Briefcase },
    { label: "Bulk Planning", href: "/planning/bulk", icon: Zap },
    { label: "Project Planning", href: "/project-planning", icon: Calendar },
    { label: "Import", href: "/import", icon: Upload },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Audit Trail", href: "/audit", icon: ShieldCheck },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="flex items-center justify-between">
          <div className="sidebar-logo">Project Tracker</div>
          <button 
            onClick={toggleTheme}
            className="p-1 hover:bg-indigo-500/10 rounded-md transition-all text-slate-400 hover:text-indigo-500"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
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
