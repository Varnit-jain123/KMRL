import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Upload,
  Search,
  Brain,
  Bell,
  Clock,
  Users,
  Shield,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  urgentCount: number;
}

const menuItems = [
  {
    section: "dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Overview & recent activity"
  },
  {
    section: "documents",
    label: "Documents",
    icon: FileText,
    description: "Browse & manage files",
    hasUrgent: true
  },
  {
    section: "upload",
    label: "Upload",
    icon: Upload,
    description: "Add new documents"
  },
  {
    section: "search",
    label: "Smart Search",
    icon: Search,
    description: "AI-powered search"
  },
  {
    section: "ai-features",
    label: "AI Features",
    icon: Brain,
    description: "Summaries & automation"
  },
  {
    section: "notices",
    label: "Notices",
    icon: Bell,
    description: "Announcements & alerts",
    hasUrgent: true
  },
  {
    section: "reminders",
    label: "Reminders",
    icon: Clock,
    description: "Tasks & deadlines",
    hasUrgent: true
  },
  {
    section: "departments",
    label: "Departments",
    icon: Users,
    description: "Team & contacts"
  },
  {
    section: "security",
    label: "Security",
    icon: Shield,
    description: "Access & permissions"
  },
  {
    section: "settings",
    label: "Settings",
    icon: Settings,
    description: "Preferences & profile"
  },
  {
    section: "help",
    label: "Help & Support",
    icon: HelpCircle,
    description: "Tutorials & assistance"
  },
  {
    section: "history",
    label: "History",
    icon: History,
    description: "Downloads & read notices"
  }
];

export const Sidebar = ({ onNavigate, activeSection, urgentCount }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (section: string) => activeSection === section;

  return (
    <aside className={`
      ${isCollapsed ? 'w-16' : 'w-64'} 
      bg-sidebar border-r border-sidebar-border 
      flex flex-col h-full transition-all duration-300 ease-in-out
      sticky top-16 z-40
    `}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-sidebar-foreground">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Urgent Items Alert */}
      {urgentCount > 0 && !isCollapsed && (
        <div className="mx-4 mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              {urgentCount} Urgent Items
            </span>
          </div>
          <p className="text-xs text-destructive/80 mt-1">
            Requires immediate attention
          </p>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.section);
          const hasUrgentBadge = item.hasUrgent && urgentCount > 0;

          return (
            <Button
              key={item.section}
              variant={active ? "default" : "ghost"}
              className={`
                w-full justify-start h-auto p-3
                ${active 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }
                ${isCollapsed ? "px-3" : "px-4"}
                transition-all duration-200
              `}
              onClick={() => onNavigate(item.section)}
            >
              <div className="flex items-center w-full">
                <div className="flex items-center space-x-3 flex-1">
                  <IconComponent className={`h-5 w-5 ${active ? 'text-sidebar-primary-foreground' : ''}`} />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {hasUrgentBadge && (
                          <Badge 
                            variant="destructive" 
                            className="h-5 px-1.5 text-xs ml-2"
                          >
                            !
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs opacity-75 ${active ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground'}`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
                {isCollapsed && hasUrgentBadge && (
                  <Badge 
                    variant="destructive" 
                    className="h-4 w-4 p-0 flex items-center justify-center text-xs absolute top-1 right-1"
                  >
                    !
                  </Badge>
                )}
              </div>
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/60 space-y-1">
            <p>KMRL Document Platform</p>
            <p>© 2024 Kochi Metro Rail Limited</p>
          </div>
        )}
      </div>
    </aside>
  );
};