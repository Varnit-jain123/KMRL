import { useState } from "react";
import { FileText, Download, Brain, Volume2, Search, Filter, Tag, Calendar, User, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface DocumentsSectionProps {
  onDocumentClick: (docId: string) => void;
}

// Mock uploaded documents with AI features
const uploadedDocuments = [
  {
    id: "doc1",
    title: "Metro Expansion Project Report",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    uploader: "Engineering Team",
    category: "Project Reports",
    tags: ["metro", "expansion", "engineering"],
    summary: "Comprehensive analysis of Phase 2 metro expansion including timeline, budget allocation, and technical specifications.",
    isUrgent: true,
    aiGenerated: true
  },
  {
    id: "doc2", 
    title: "Safety Protocol Guidelines",
    type: "DOCX",
    size: "1.8 MB", 
    uploadDate: "2024-01-12",
    uploader: "Safety Department",
    category: "Safety",
    tags: ["safety", "protocol", "guidelines"],
    summary: "Updated safety measures and compliance requirements for all KMRL operations and construction activities.",
    isUrgent: false,
    aiGenerated: true
  },
  {
    id: "doc3",
    title: "Budget Allocation Q4 2024",
    type: "XLSX", 
    size: "512 KB",
    uploadDate: "2024-01-10",
    uploader: "Finance Department",
    category: "Finance",
    tags: ["budget", "finance", "Q4"],
    summary: "Quarterly financial breakdown showing resource allocation across departments and upcoming projects.",
    isUrgent: false,
    aiGenerated: true
  },
  {
    id: "doc4",
    title: "Employee Training Manual",
    type: "PDF",
    size: "3.2 MB",
    uploadDate: "2024-01-08", 
    uploader: "HR Department",
    category: "Training",
    tags: ["training", "employee", "manual"],
    summary: "Complete training guide for new employees covering operations, safety, and company policies.",
    isUrgent: false,
    aiGenerated: true
  }
];

const categories = ["All", "Project Reports", "Safety", "Finance", "Training", "Operations"];

export const DocumentsSection = ({ onDocumentClick }: DocumentsSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const filteredDocuments = uploadedDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const urgentDocuments = filteredDocuments.filter(doc => doc.isUrgent);
  const regularDocuments = filteredDocuments.filter(doc => !doc.isUrgent);

  const handlePlayAudio = (docId: string) => {
    if (playingAudio === docId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(docId);
      // Simulate audio playback
      setTimeout(() => setPlayingAudio(null), 5000);
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-primary" />;
  };

  const DocumentCard = ({ doc }: { doc: typeof uploadedDocuments[0] }) => (
    <Card className={`cursor-pointer hover:shadow-md transition-all ${doc.isUrgent ? 'border-destructive bg-destructive/5' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getFileIcon(doc.type)}
            <div>
              <CardTitle className="text-sm font-medium">{doc.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
            </div>
          </div>
          {doc.isUrgent && (
            <Badge variant="destructive" className="text-xs">Urgent</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* AI Summary */}
        <div className="mb-4 p-3 bg-accent/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">AI Summary</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePlayAudio(doc.id)}
                className="h-6 w-6 p-0"
              >
                {playingAudio === doc.id ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
              <Volume2 className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{doc.summary}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {doc.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Metadata */}
        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>Uploaded by {doc.uploader}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onDocumentClick(doc.id)}
            className="flex-1"
          >
            <FileText className="h-3 w-3 mr-1" />
            Open
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Documents</h2>
          <p className="text-muted-foreground">Manage and search your uploaded documents</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents by title or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Urgent Documents */}
      {urgentDocuments.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="destructive">Urgent</Badge>
            <h3 className="text-lg font-medium">Urgent Documents</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urgentDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      )}

      {urgentDocuments.length > 0 && regularDocuments.length > 0 && <Separator />}

      {/* Regular Documents */}
      {regularDocuments.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">All Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      )}

      {filteredDocuments.length === 0 && (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No documents found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};