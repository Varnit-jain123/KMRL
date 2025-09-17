import { useState } from "react";
import { Eye, EyeOff, Shield, Mail, Lock, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import kmrlLogo from "@/assets/kmrl-logo.png";

interface LoginPageProps {
  onSignupClick: () => void;
}

export const LoginPage = ({ onSignupClick }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const { login, loading } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      // Simulate MFA for demo
      if (email.includes("admin") && !mfaEnabled) {
        setMfaEnabled(true);
        toast({
          title: "MFA Required",
          description: "Please enter your authentication code",
        });
        return;
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome to KMRL Document Platform",
      });
    } else {
      toast({
        title: "Login Failed", 
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode === "123456") {
      toast({
        title: "Authentication Complete",
        description: "Access granted to KMRL platform",
      });
      setMfaEnabled(false);
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your authentication code",
        variant: "destructive"
      });
    }
  };

  const demoAccounts = [
    { email: "rajesh@kmrl.kerala.gov.in", role: "Senior Engineer", dept: "Engineering" },
    { email: "priya@kmrl.kerala.gov.in", role: "Manager", dept: "Administration" },
    { email: "admin@kmrl.kerala.gov.in", role: "Administrator", dept: "IT" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kmrl-blue-light via-background to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <img src={kmrlLogo} alt="KMRL" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">KMRL</h1>
              <p className="text-sm text-muted-foreground">Document Platform</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Employee Login</h2>
            <p className="text-sm text-muted-foreground">Access your secure document portal</p>
          </div>
        </div>

        {/* Main Login Card */}
        <Card className="kmrl-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              {mfaEnabled ? "Two-Factor Authentication" : "Secure Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!mfaEnabled ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="employee@kmrl.kerala.gov.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 kmrl-focus"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 kmrl-focus"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full kmrl-button-primary" 
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                <div className="text-center space-y-2">
                  <Button variant="link" className="text-sm text-primary">
                    Forgot Password?
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    New employee?{" "}
                    <Button variant="link" className="p-0 text-primary" onClick={onSignupClick}>
                      Request Account
                    </Button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleMfaSubmit} className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mfa">Authentication Code</Label>
                  <Input
                    id="mfa"
                    type="text"
                    placeholder="123456"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    className="text-center text-lg tracking-widest kmrl-focus"
                    maxLength={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Button type="submit" className="w-full kmrl-button-primary">
                    Verify & Login
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setMfaEnabled(false)}
                  >
                    Back to Login
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="kmrl-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Demo Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              For testing purposes, use any of these accounts:
            </p>
            {demoAccounts.map((account, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-accent/30 rounded-lg cursor-pointer hover:bg-accent/50 kmrl-transition"
                onClick={() => {
                  setEmail(account.email);
                  setPassword("password123");
                }}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{account.email}</p>
                  <p className="text-xs text-muted-foreground">{account.role} • {account.dept}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Click to fill
                </Badge>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center">
              Password for all accounts: <code className="bg-accent px-1 rounded">password123</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};