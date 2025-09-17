import { useState } from "react";
import { Bell, Search, Settings, User, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import kmrlLogo from "@/assets/kmrl-logo.png";

interface HeaderProps {
  onSearchOpen: () => void;
  onNotificationsOpen: () => void;
  onSettingsOpen: () => void;
  user?: any;
  onLogout?: () => void;
}

export const Header = ({ onSearchOpen, onNotificationsOpen, onSettingsOpen, user, onLogout }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("EN");
  
  // Mock notification count
  const notificationCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* KMRL Logo */}
        <div className="flex items-center space-x-3 cursor-pointer kmrl-transition hover:opacity-80">
          <img 
            src={kmrlLogo} 
            alt="KMRL Logo" 
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-kmrl-heading text-xl font-bold">KMRL</span>
            <span className="text-xs text-muted-foreground">Document Platform</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documents, summaries, or ask AI..."
              className="pl-10 kmrl-focus"
              onClick={onSearchOpen}
              readOnly
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "EN" ? "हिं" : "EN")}
            className="text-sm font-medium"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language}
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={onNotificationsOpen}
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.name || "KMRL Employee"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || "employee@kmrl.kerala.gov.in"}</p>
                <p className="text-xs text-muted-foreground">{user?.department || "Department"} • {user?.role || "Employee"}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSettingsOpen}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={onLogout}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};