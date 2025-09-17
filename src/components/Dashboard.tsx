import { useState } from "react";
import { 
  FileText, 
  Clock, 
  Brain, 
  Search, 
  Upload, 
  Star,
  TrendingUp,
  AlertCircle,
  Users,
  Download,
  Play,
  BookOpen,
  Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  onDocumentClick: (docId: string) => void;
  onUploadClick: () => void;
  onNoticeClick: (noticeId: string) => void;
}

// Mock data
const recentDocuments = [
  {
    id: "1",
    title: "Q3 Financial Report 2024",
    type: "PDF",
    uploadedAt: "2 hours ago",
    summary: "Quarterly financial analysis showing 15% growth in revenue with detailed breakdown of departmental expenses...",
    aiTags: ["Finance", "Report", "Q3"],
    priority: "high",
    hasReminders: true,
    downloadCount: 23
  },
  {
    id: "2", 
    title: "Metro Project Timeline",
    type: "DOCX",
    uploadedAt: "5 hours ago",
    summary: "Updated project timeline for Phase 2 metro construction with critical milestones and resource allocation...",
    aiTags: ["Project", "Timeline", "Metro"],
    priority: "medium",
    hasReminders: false,
    downloadCount: 12
  },
  {
    id: "3",
    title: "Safety Guidelines Update",
    type: "PDF", 
    uploadedAt: "1 day ago",
    summary: "Enhanced safety protocols for construction sites including new equipment requirements and training schedules...",
    aiTags: ["Safety", "Guidelines", "Construction"],
    priority: "high",
    hasReminders: true,
    downloadCount: 45
  }
];

const notices = [
  {
    id: "1",
    title: "Important: Board Meeting Tomorrow",
    message: "Monthly board meeting scheduled for 10:00 AM in Conference Room A",
    priority: "high",
    department: "Administration",
    unread: true,
    timestamp: "30 minutes ago"
  },
  {
    id: "2",
    title: "New Document Upload Policy",
    message: "Updated guidelines for document classification and AI tagging",
    priority: "medium", 
    department: "IT",
    unread: false,
    timestamp: "2 hours ago"
  }
];

const aiInsights = [
  {
    title: "Documents Processed Today",
    value: "24",
    change: "+12%",
    icon: Brain
  },
  {
    title: "AI Summaries Generated", 
    value: "18",
    change: "+8%",
    icon: FileText
  },
  {
    title: "Pending Reviews",
    value: "5",
    change: "-3%",
    icon: Clock
  }
];

export const Dashboard = ({ onDocumentClick, onUploadClick, onNoticeClick }: DashboardProps) => {
  const [autoModeEnabled, setAutoModeEnabled] = useState(true);

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Good morning, Employee</h1>
          <p className="text-muted-foreground">Here's what's happening with your documents today</p>
        </div>
        <Button onClick={onUploadClick} className="kmrl-button-primary">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiInsights.map((insight, index) => (
          <Card key={index} className="kmrl-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                  <p className="text-2xl font-bold text-foreground">{insight.value}</p>
                  <p className="text-xs text-success font-medium">{insight.change} from yesterday</p>
                </div>
                <insight.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      

      

      {/* Detailed Documents Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Full Document List */}
        <div className="lg:col-span-2">
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  All Recent Documents
                </span>
                <Badge variant="secondary">{recentDocuments.length} total</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border cursor-pointer kmrl-transition hover:bg-accent/50 ${
                    doc.priority === "high" ? "border-l-4 border-l-destructive bg-destructive/5" : "border-border"
                  }`}
                  onClick={() => onDocumentClick(doc.id)}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-foreground truncate">{doc.title}</h3>
                      <div className="flex items-center space-x-2">
                        {doc.priority === "high" && (
                          <div className="flex items-center space-x-1">
                            <AlertCircle className="h-4 w-4 text-destructive" />
                            <Badge variant="destructive" className="text-xs">URGENT</Badge>
                          </div>
                        )}
                        {doc.hasReminders && (
                          <Clock className="h-4 w-4 text-warning" />
                        )}
                        <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{doc.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {doc.aiTags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {doc.downloadCount}
                        </span>
                        <span>{doc.uploadedAt}</span>
                      </div>
                    </div>



                    {/* AI Actions */}
                    <div className="flex items-center space-x-2 mt-3">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Play className="h-3 w-3 mr-1" />
                        Play Summary
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <BookOpen className="h-3 w-3 mr-1" />
                        View Original
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Brain className="h-3 w-3 mr-1" />
                        AI Notes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={onUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                AI Smart Search
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="mr-2 h-4 w-4" />
                Generate Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                View Departments
              </Button>
            </CardContent>
          </Card>

          {/* Auto Mode Status */}
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI Auto Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Auto-upload downloads</span>
                <Badge variant={autoModeEnabled ? "default" : "secondary"}>
                  {autoModeEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Automatically detect and upload downloaded files with AI tagging
              </p>
              <Progress value={autoModeEnabled ? 100 : 0} className="mb-2" />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setAutoModeEnabled(!autoModeEnabled)}
              >
                {autoModeEnabled ? "Disable" : "Enable"} Auto Mode
              </Button>
            </CardContent>
          </Card>

          
        </div>
      </div>

     {/* Recent Notices Section */}
<Card className="kmrl-card">
  <CardHeader>
    <CardTitle className="flex items-center justify-between">
      <span className="flex items-center">
        <Bell className="mr-2 h-5 w-5" />
        Recent Notices
      </span>
      <Badge variant="secondary">{notices.length} notices</Badge>
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    {notices.map((notice) => (
      <div
        key={notice.id}
        className={`p-4 rounded-lg border cursor-pointer kmrl-transition hover:bg-accent/50 ${
          notice.unread ? "border-primary bg-primary/5" : "border-border"
        } ${notice.priority === "high" ? "border-l-4 border-l-destructive" : ""}`}
        onClick={() => onNoticeClick(notice.id)}
      >
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-sm font-semibold text-foreground">{notice.title}</h4>
          <div className="flex items-center space-x-1">
            {notice.priority === "high" && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
            {notice.unread && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{notice.message}</p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">{notice.department}</Badge>
          <span className="text-xs text-muted-foreground">{notice.timestamp}</span>
        </div>
      </div>
    ))}
  </CardContent>
</Card>

    </div>
  );
};