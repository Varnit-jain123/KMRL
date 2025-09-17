import { useState } from "react";
import { 
  FileText, 
  Download, 
  Play, 
  Pause, 
  BookOpen, 
  Brain, 
  Clock, 
  Star,
  MessageCircle,
  X,
  Plus,
  Volume2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocumentViewerProps {
  open: boolean;
  onClose: () => void;
  documentId: string | null;
}

// Mock document data
const mockDocument = {
  id: "1",
  title: "Q3 Financial Report 2024",
  type: "PDF",
  uploadedAt: "2 hours ago",
  uploadedBy: "Finance Department",
  fileSize: "2.4 MB",
  pages: 24,
  summary: "This quarterly financial report presents a comprehensive analysis of KMRL's financial performance for Q3 2024. The report shows a 15% increase in revenue compared to the previous quarter, driven primarily by increased ridership and operational efficiency improvements. Key highlights include reduced operational costs, improved infrastructure maintenance, and strategic investments in future expansion projects.",
  aiTags: ["Finance", "Report", "Q3", "Revenue", "Analysis"],
  content: `KERALA METRO RAIL LIMITED
Q3 FINANCIAL REPORT 2024

EXECUTIVE SUMMARY
Kerala Metro Rail Limited (KMRL) presents the financial performance report for the third quarter of 2024. This period has shown remarkable growth and operational excellence.

KEY FINANCIAL HIGHLIGHTS
• Total Revenue: ₹245.6 crores (15% increase from Q2)
• Operating Expenses: ₹198.3 crores (8% increase from Q2)
• Net Profit: ₹47.3 crores (35% increase from Q2)
• EBITDA Margin: 23.8%

OPERATIONAL METRICS
• Daily Ridership: 4.2 lakh passengers
• On-time Performance: 98.5%
• Energy Efficiency: 15% improvement
• Customer Satisfaction: 4.6/5.0

DEPARTMENT-WISE BREAKDOWN
1. Operations & Maintenance: ₹145.2 crores
2. Infrastructure Development: ₹32.1 crores
3. Technology & Innovation: ₹12.8 crores
4. Human Resources: ₹8.2 crores

FUTURE OUTLOOK
The positive trends observed in Q3 2024 position KMRL well for continued growth. Strategic initiatives in Phase 2 expansion and smart city integration are expected to drive further improvements in subsequent quarters.`,
  notes: [
    {
      id: "1",
      author: "Rajesh Kumar",
      content: "Revenue growth is impressive. Need to focus on cost optimization.",
      timestamp: "1 hour ago"
    },
    {
      id: "2", 
      author: "Priya Singh",
      content: "The operational efficiency metrics look excellent.",
      timestamp: "30 minutes ago"
    }
  ],
  reminders: [
    {
      id: "1",
      title: "Board Meeting Discussion",
      date: "Tomorrow at 10:00 AM",
      description: "Present Q3 findings to board members"
    }
  ]
};

export const DocumentViewer = ({ open, onClose, documentId }: DocumentViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [newNote, setNewNote] = useState("");
  const [currentView, setCurrentView] = useState<"summary" | "original">("summary");

  const handlePlaySummary = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate audio playback
      const interval = setInterval(() => {
        setPlaybackProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${mockDocument.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic would go here
      setNewNote("");
    }
  };

  if (!documentId) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              {mockDocument.title}
            </span>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{mockDocument.type}</Badge>
              <Badge variant="secondary">{mockDocument.fileSize}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Document Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant={currentView === "summary" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentView("summary")}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  AI Summary
                </Button>
                <Button
                  variant={currentView === "original" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentView("original")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Original Document
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handlePlaySummary}>
                  {isPlaying ? (
                    <Pause className="mr-2 h-4 w-4" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"} Summary
                </Button>
                <Button size="sm" variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            {/* Audio Playback Progress */}
            {isPlaying && (
              <Card className="p-4">
                <div className="flex items-center space-x-4">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <Progress value={playbackProgress} className="mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Playing AI-generated summary...
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setIsPlaying(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Document Content */}
            <Card className="kmrl-card">
              <CardContent className="p-6">
                {currentView === "summary" ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Brain className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">AI-Generated Summary</h3>
                      <Badge variant="secondary">Auto-generated</Badge>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {mockDocument.summary}
                      </p>
                    </div>
                    
                    {/* AI Tags */}
                    <div className="flex items-center space-x-2 pt-4 border-t">
                      <span className="text-sm font-medium">AI Tags:</span>
                      {mockDocument.aiTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Original Document</h3>
                      <Badge variant="outline">{mockDocument.pages} pages</Badge>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-foreground font-mono bg-muted/30 p-4 rounded-lg overflow-auto max-h-96">
                        {mockDocument.content}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Document Info */}
            <Card className="kmrl-card">
              <CardHeader>
                <CardTitle className="text-lg">Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uploaded:</span>
                    <span>{mockDocument.uploadedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">By:</span>
                    <span>{mockDocument.uploadedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{mockDocument.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pages:</span>
                    <span>{mockDocument.pages}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes & Reminders Tabs */}
            <Card className="kmrl-card">
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="reminders">Reminders</TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes" className="space-y-4 p-4">
                  {/* Add New Note */}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a note about this document..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="text-sm"
                      rows={3}
                    />
                    <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>

                  <Separator />

                  {/* Existing Notes */}
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {mockDocument.notes.map((note) => (
                      <div key={note.id} className="p-3 bg-accent/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{note.author}</span>
                          <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reminders" className="space-y-4 p-4">
                  <Button size="sm" variant="outline" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    Set Reminder
                  </Button>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    {mockDocument.reminders.map((reminder) => (
                      <div key={reminder.id} className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{reminder.title}</span>
                          <Clock className="h-4 w-4 text-warning" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{reminder.date}</p>
                        <p className="text-sm">{reminder.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
