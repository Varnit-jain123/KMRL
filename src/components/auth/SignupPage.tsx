import { useState } from "react";
import { Eye, EyeOff, UserPlus, Mail, Lock, User, Building, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import kmrlLogo from "@/assets/kmrl-logo.png";

interface SignupPageProps {
  onLoginClick: () => void;
}

const departments = [
  "Engineering",
  "Administration", 
  "Finance",
  "Operations",
  "Human Resources",
  "IT & Technology",
  "Safety & Security",
  "Project Management",
  "Legal Affairs",
  "Public Relations"
];

export const SignupPage = ({ onLoginClick }: SignupPageProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const { signup, loading } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    const { name, email, department } = formData;
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive"
      });
      return false;
    }
    
    if (!email.includes("@") || !email.includes("kmrl")) {
      toast({
        title: "Error", 
        description: "Please use your official KMRL email address",
        variant: "destructive"
      });
      return false;
    }
    
    if (!department) {
      toast({
        title: "Error",
        description: "Please select your department",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    const { password, confirmPassword } = formData;
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return false;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error", 
        description: "Passwords do not match",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    const success = await signup({
      name: formData.name,
      email: formData.email,
      department: formData.department,
      password: formData.password
    });
    
    if (success) {
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to KMRL Document Platform",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "An account with this email already exists",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-kmrl-blue-light flex items-center justify-center p-4">
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
            <h2 className="text-xl font-semibold text-foreground">Employee Registration</h2>
            <p className="text-sm text-muted-foreground">Create your secure account</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`w-8 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'} rounded`} />
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        </div>

        {/* Signup Card */}
        <Card className="kmrl-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-primary" />
              {step === 1 ? "Personal Information" : "Security Setup"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit} className="space-y-4">
              
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10 kmrl-focus"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Official Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="yourname@kmrl.kerala.gov.in"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 kmrl-focus"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be your official KMRL email address
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                      <Select onValueChange={(value) => handleInputChange("department", value)}>
                        <SelectTrigger className="pl-10 kmrl-focus">
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full kmrl-button-primary">
                    Continue to Security Setup
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
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
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={`h-3 w-3 ${formData.password.length >= 8 ? 'text-success' : 'text-muted-foreground'}`} />
                        <span className="text-xs text-muted-foreground">At least 8 characters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={`h-3 w-3 ${/[A-Z]/.test(formData.password) ? 'text-success' : 'text-muted-foreground'}`} />
                        <span className="text-xs text-muted-foreground">One uppercase letter</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={`h-3 w-3 ${/[0-9]/.test(formData.password) ? 'text-success' : 'text-muted-foreground'}`} />
                        <span className="text-xs text-muted-foreground">One number</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 pr-10 kmrl-focus"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button type="submit" className="w-full kmrl-button-primary" disabled={loading}>
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                      Back
                    </Button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" className="p-0 text-primary" onClick={onLoginClick}>
                  Sign In
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="kmrl-card">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-success mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Secure Registration</p>
                <p className="text-xs text-muted-foreground">
                  Your account will be created with enterprise-grade security. 
                  Admin approval may be required for activation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};