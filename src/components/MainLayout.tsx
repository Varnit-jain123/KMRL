import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { SearchModal } from "@/components/SearchModal";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { SettingsModal } from "@/components/SettingsModal";
import { DocumentViewer } from "@/components/DocumentViewer";
import { UploadModal } from "@/components/UploadModal";
import { DocumentsSection } from "@/components/DocumentsSection";
import { NoticesSection } from "@/components/NoticesSection";
import { RemindersSection } from "@/components/RemindersSection";
import { DepartmentsSection } from "@/components/DepartmentsSection";
import { SecuritySection } from "@/components/SecuritySection";
import { HistorySection } from "@/components/HistorySection";
import { useToast } from "@/hooks/use-toast";

export const MainLayout = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock urgent count - would come from backend
  const urgentCount = 5;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const handleDocumentClick = (docId: string) => {
    setSelectedDocumentId(docId);
    setDocumentViewerOpen(true);
    toast({
      title: "Opening document",
      description: "Loading document viewer...",
    });
  };

  const handleNoticeClick = (noticeId: string) => {
    toast({
      title: "Notice opened",
      description: "Displaying full notice content...",
    });
  };

  const handleUploadSuccess = () => {
    toast({
      title: "Upload successful",
      description: "Document uploaded and AI processing started",
    });
    setUploadModalOpen(false);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    // Handle special cases
    if (section === "search") {
      setSearchOpen(true);
      return;
    }
    if (section === "upload") {
      setUploadModalOpen(true);
      return;
    }
    if (section === "settings") {
      setSettingsOpen(true);
      return;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard
            onDocumentClick={handleDocumentClick}
            onUploadClick={() => setUploadModalOpen(true)}
            onNoticeClick={handleNoticeClick}
          />
        );
      case "documents":
        return <DocumentsSection onDocumentClick={handleDocumentClick} />;
      case "notices":
        return <NoticesSection onNoticeClick={handleNoticeClick} />;
      case "reminders":
        return <RemindersSection />;
      case "departments":
        return <DepartmentsSection />;
      case "security":
        return <SecuritySection />;
      case "history":
        return <HistorySection />;
      case "ai-features":
        return <div className="p-6"><h1 className="text-2xl font-bold">AI Features</h1><p>AI-powered features coming soon...</p></div>;
      case "help":
        return <div className="p-6"><h1 className="text-2xl font-bold">Help & Support</h1><p>Help documentation coming soon...</p></div>;
      default:
        return (
          <Dashboard
            onDocumentClick={handleDocumentClick}
            onUploadClick={() => setUploadModalOpen(true)}
            onNoticeClick={handleNoticeClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onSearchOpen={() => setSearchOpen(true)}
        onNotificationsOpen={() => setNotificationsOpen(true)}
        onSettingsOpen={() => setSettingsOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          onNavigate={handleNavigate}
          activeSection={activeSection}
          urgentCount={urgentCount}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {renderContent()}
        </main>
      </div>

      {/* Modals and Panels */}
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onDocumentClick={handleDocumentClick}
      />

      <NotificationsPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onDocumentClick={handleDocumentClick}
        onNoticeClick={handleNoticeClick}
      />

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <DocumentViewer
        open={documentViewerOpen}
        onClose={() => setDocumentViewerOpen(false)}
        documentId={selectedDocumentId}
      />

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};