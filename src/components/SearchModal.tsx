import { useState } from "react";
import { Search, Mic, Brain, FileText, Clock, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VoiceSearch } from "@/components/VoiceSearch";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onDocumentClick: (docId: string) => void;
}

// Mock search results
const searchResults = [
  {
    id: "1",
    title: "Metro Project Phase 2 Timeline",
    type: "document",
    summary: "Updated construction timeline with critical milestones for metro expansion project...",
    relevanceScore: 95,
    lastUpdated: "2 hours ago",
    tags: ["Metro", "Project", "Timeline"]
  },
  {
    id: "2", 
    title: "Financial Budget Allocation Q4",
    type: "document",
    summary: "Quarterly budget breakdown showing allocated resources for various departments...",
    relevanceScore: 87,
    lastUpdated: "1 day ago", 
    tags: ["Finance", "Budget", "Q4"]
  },
  {
    id: "3",
    title: "Safety Protocol Updates",
    type: "summary",
    summary: "AI-generated summary of new safety measures and compliance requirements...",
    relevanceScore: 82,
    lastUpdated: "3 days ago",
    tags: ["Safety", "Protocol", "AI Summary"]
  }
];

const recentSearches = [
  "Metro construction timeline",
  "Budget allocation Q4",
  "Safety guidelines",
  "Board meeting minutes"
];

export const SearchModal = ({ open, onClose, onDocumentClick }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof searchResults>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate AI search delay
    setTimeout(() => {
      setSearchResults([
        {
          id: "1",
          title: "Metro Project Phase 2 Timeline",
          type: "document",
          summary: "Updated construction timeline with critical milestones for metro expansion project...",
          relevanceScore: 95,
          lastUpdated: "2 hours ago",
          tags: ["Metro", "Project", "Timeline"]
        },
        {
          id: "2", 
          title: "Financial Budget Allocation Q4",
          type: "document", 
          summary: "Quarterly budget breakdown showing allocated resources for various departments...",
          relevanceScore: 87,
          lastUpdated: "1 day ago",
          tags: ["Finance", "Budget", "Q4"]
        }
      ]);
      setIsSearching(false);
    }, 1000);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setSearchQuery(transcript);
  };

  const handleVoiceSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            AI-Powered Smart Search
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documents, ask questions in English or Hindi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              className="pl-10 pr-12 text-base"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <VoiceSearch
                onTranscript={handleVoiceTranscript}
                onSearch={handleVoiceSearch}
                isListening={isListening}
                setIsListening={setIsListening}
              />
            </div>
          </div>

          {/* Search Actions */}
          <div className="flex items-center space-x-2">
            <Button onClick={() => handleSearch(searchQuery)} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>

          {/* Language Support Notice */}
          <div className="text-xs text-muted-foreground bg-accent/50 p-2 rounded">
            💡 Supports English and Hindi search queries with AI-powered understanding
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {isSearching && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-muted-foreground">AI is searching through documents...</span>
              </div>
            </div>
          )}

          {searchResults.length > 0 && !isSearching && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Search Results ({searchResults.length})
              </h3>
              {searchResults.map((result) => (
                <Card 
                  key={result.id} 
                  className="cursor-pointer hover:bg-accent/50 kmrl-transition"
                  onClick={() => {
                    onDocumentClick(result.id);
                    onClose();
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-foreground">{result.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {result.relevanceScore}% match
                        </Badge>
                        <Badge variant={result.type === "summary" ? "default" : "outline"} className="text-xs">
                          {result.type === "summary" ? "AI Summary" : "Document"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{result.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {result.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {result.lastUpdated}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {searchResults.length === 0 && !isSearching && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Recent Searches</h3>
              <div className="grid grid-cols-2 gap-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => {
                      setSearchQuery(search);
                      handleSearch(search);
                    }}
                  >
                    <Clock className="h-3 w-3 mr-2" />
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* AI Search Tips */}
          {searchResults.length === 0 && !isSearching && (
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">AI Search Tips</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Ask questions: "What is the budget for metro project?"</p>
                <p>• Search by content: "Documents containing safety protocols"</p>
                <p>• Use Hindi: "मेट्रो परियोजना की समयसीमा"</p>
                <p>• Voice search: Click the microphone icon</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};