import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { LoginPage } from "@/components/auth/LoginPage";
import { SignupPage } from "@/components/auth/SignupPage";
import { MainLayout } from "@/components/MainLayout";
import { ThemeProvider } from "next-themes";

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-kmrl-blue-light via-background to-accent flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading KMRL Platform...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showSignup ? (
      <SignupPage onLoginClick={() => setShowSignup(false)} />
    ) : (
      <LoginPage onSignupClick={() => setShowSignup(true)} />
    );
  }

  return <MainLayout />;
};

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;