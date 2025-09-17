import { useState, useCallback } from "react";
import { Upload, FileText, Brain, X, Check, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  aiTags?: string[];
  summary?: string;
}

export const UploadModal = ({ open, onClose, onUploadSuccess }: UploadModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [autoMode, setAutoMode] = useState(true);
  const [aiProcessing, setAiProcessing] = useState(true);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || getFileTypeFromName(file.name),
      status: "uploading",
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId && file.status === "uploading") {
          const newProgress = file.progress + 10;
          if (newProgress >= 100) {
            clearInterval(uploadInterval);
            // Start AI processing
            setTimeout(() => simulateAIProcessing(fileId), 500);
            return { ...file, progress: 100, status: "processing" };
          }
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 200);
  };

  const simulateAIProcessing = (fileId: string) => {
    // Simulate AI processing
    setTimeout(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          return {
            ...file,
            status: "completed",
            aiTags: ["Finance", "Report", "Q4"],
            summary: "AI has analyzed this document and automatically categorized it. Summary and tags have been generated."
          };
        }
        return file;
      }));
    }, 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeFromName = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'PDF';
      case 'doc':
      case 'docx': return 'Word';
      case 'xls':
      case 'xlsx': return 'Excel';
      case 'ppt':
      case 'pptx': return 'PowerPoint';
      case 'txt': return 'Text';
      default: return 'Document';
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
        return <Upload className="h-4 w-4 text-primary animate-pulse" />;
      case "processing":
        return <Brain className="h-4 w-4 text-warning animate-pulse" />;
      case "completed":
        return <Check className="h-4 w-4 text-success" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleFinish = () => {
    const completedFiles = files.filter(file => file.status === "completed");
    if (completedFiles.length > 0) {
      onUploadSuccess();
    }
    setFiles([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Upload Documents
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <span className="text-sm font-medium">Auto Mode</span>
                <p className="text-xs text-muted-foreground">Auto-detect downloaded files</p>
              </div>
              <Switch checked={autoMode} onCheckedChange={setAutoMode} />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <span className="text-sm font-medium">AI Processing</span>
                <p className="text-xs text-muted-foreground">Generate summaries and tags</p>
              </div>
              <Switch checked={aiProcessing} onCheckedChange={setAiProcessing} />
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Drop files here or click to browse</h3>
                <p className="text-muted-foreground">
                  Supports PDF, Word, Excel, PowerPoint, and text files
                </p>
              </div>
              
              <Button variant="outline">
                Choose Files
              </Button>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justified-between">
                <h3 className="text-lg font-semibold">Uploading Files ({files.length})</h3>
                <Button variant="outline" size="sm" onClick={() => setFiles([])}>
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {files.map((file) => (
                  <Card key={file.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(file.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium truncate">{file.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">{file.type}</Badge>
                            <Badge variant="secondary" className="text-xs">{file.size}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        {file.status === "uploading" && (
                          <div className="space-y-1">
                            <Progress value={file.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Uploading... {file.progress}%
                            </p>
                          </div>
                        )}
                        
                        {file.status === "processing" && (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Brain className="h-3 w-3 text-warning animate-pulse" />
                              <p className="text-xs text-muted-foreground">AI processing...</p>
                            </div>
                          </div>
                        )}
                        
                        {file.status === "completed" && file.aiTags && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Check className="h-3 w-3 text-success" />
                              <p className="text-xs text-success">Upload completed</p>
                            </div>
                            <div className="flex items-center space-x-1 flex-wrap">
                              {file.aiTags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            {file.summary && (
                              <p className="text-xs text-muted-foreground">{file.summary}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {files.filter(f => f.status === "completed").length} of {files.length} files processed
            </div>
            
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleFinish}
                disabled={files.length === 0 || files.some(f => f.status === "uploading" || f.status === "processing")}
              >
                Finish Upload
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};