import { useState } from "react";
import { Shield, Key, Smartphone, Clock, MapPin, Monitor, ToggleLeft, ToggleRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SecuritySectionProps {}

// Mock security data
const securitySettings = {
  mfaEnabled: false,
  loginNotifications: true,
  sessionTimeout: 30,
  lastPasswordChange: "2024-01-01T00:00:00Z"
};

const loginHistory = [
  {
    id: "login1",
    timestamp: "2024-01-15T09:30:00Z",
    device: "Chrome on Windows",
    location: "Kochi, Kerala",
    ipAddress: "192.168.1.101",
    success: true
  },
  {
    id: "login2", 
    timestamp: "2024-01-14T18:45:00Z",
    device: "Mobile App on Android",
    location: "Kochi, Kerala",
    ipAddress: "192.168.1.102",
    success: true
  },
  {
    id: "login3",
    timestamp: "2024-01-14T08:15:00Z", 
    device: "Chrome on Windows",
    location: "Kochi, Kerala",
    ipAddress: "192.168.1.101",
    success: true
  },
  {
    id: "login4",
    timestamp: "2024-01-13T14:22:00Z",
    device: "Unknown Device",
    location: "Unknown Location", 
    ipAddress: "203.0.113.1",
    success: false
  },
  {
    id: "login5",
    timestamp: "2024-01-13T09:10:00Z",
    device: "Safari on macOS",
    location: "Kochi, Kerala",
    ipAddress: "192.168.1.103",
    success: true
  }
];

const userRoles = [
  {
    role: "Employee",
    permissions: ["View Documents", "Upload Documents", "Create Reminders", "View Notices"],
    isActive: true
  },
  {
    role: "Department Head",
    permissions: ["All Employee Permissions", "Create Notices", "Manage Department", "View Reports"],
    isActive: false
  },
  {
    role: "Administrator",
    permissions: ["All Permissions", "User Management", "System Configuration", "Security Settings"],
    isActive: false
  }
];

export const SecuritySection = ({}: SecuritySectionProps) => {
  const [settings, setSettings] = useState(securitySettings);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleMFAToggle = () => {
    setSettings(prev => ({ ...prev, mfaEnabled: !prev.mfaEnabled }));
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Simulate password change
    setSettings(prev => ({ ...prev, lastPasswordChange: new Date().toISOString() }));
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsPasswordChangeOpen(false);
    alert("Password changed successfully!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes("Mobile") || device.includes("Android") || device.includes("iOS")) {
      return <Smartphone className="h-4 w-4" />;
    }
    return <Monitor className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Security</h2>
          <p className="text-muted-foreground">Manage your account security and access controls</p>
        </div>
      </div>

      {/* Security Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Authentication Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Authentication Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Multi-Factor Authentication */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Multi-Factor Authentication</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={settings.mfaEnabled} 
                  onCheckedChange={handleMFAToggle}
                />
                {settings.mfaEnabled ? (
                  <Badge variant="default">Enabled</Badge>
                ) : (
                  <Badge variant="secondary">Disabled</Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Password Change */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Password</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Last changed: {formatDate(settings.lastPasswordChange)}
              </p>
              <Dialog open={isPasswordChangeOpen} onOpenChange={setIsPasswordChangeOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Current Password</label>
                      <div className="relative">
                        <Input
                          type={showPasswords.current ? "text" : "password"}
                          placeholder="Enter current password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        >
                          {showPasswords.current ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">New Password</label>
                      <div className="relative">
                        <Input
                          type={showPasswords.new ? "text" : "password"}
                          placeholder="Enter new password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        >
                          {showPasswords.new ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <div className="relative">
                        <Input
                          type={showPasswords.confirm ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        >
                          {showPasswords.confirm ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsPasswordChangeOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handlePasswordChange}
                        disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                      >
                        Change Password
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* MFA Alert */}
            {!settings.mfaEnabled && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Consider enabling Multi-Factor Authentication for enhanced security.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Role-Based Access Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userRoles.map((roleData, index) => (
              <div key={index} className={`p-4 rounded-lg border ${roleData.isActive ? 'border-primary bg-primary/5' : 'border-muted'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{roleData.role}</h3>
                  {roleData.isActive && (
                    <Badge variant="default" className="text-xs">Active</Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {roleData.permissions.map((permission, permIndex) => (
                      <Badge key={permIndex} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Login Activity History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Login Activity History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loginHistory.map((login) => (
              <div key={login.id} className={`flex items-center justify-between p-4 rounded-lg border ${login.success ? 'border-muted' : 'border-destructive bg-destructive/5'}`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${login.success ? 'bg-success/10' : 'bg-destructive/10'}`}>
                    {getDeviceIcon(login.device)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{login.device}</span>
                      {login.success ? (
                        <Badge variant="secondary" className="text-xs">Success</Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">Failed</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{login.location}</span>
                      </div>
                      <span>IP: {login.ipAddress}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(login.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};