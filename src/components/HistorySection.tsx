import { useState } from "react";
import { History, Download, Eye, Calendar, FileText, Bell, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HistorySectionProps {}

// Mock history data
const downloadHistory = [
  {
    id: "dl1",
    documentTitle: "Metro Expansion Project Report",
    documentType: "PDF",
    downloadDate: "2024-01-15T14:30:00Z",
    fileSize: "2.4 MB",
    category: "Project Reports"
  },
  {
    id: "dl2",
    documentTitle: "Safety Protocol Guidelines", 
    documentType: "DOCX",
    downloadDate: "2024-01-14T09:15:00Z",
    fileSize: "1.8 MB",
    category: "Safety"
  },
  {
    id: "dl3",
    documentTitle: "Budget Allocation Q4 2024",
    documentType: "XLSX",
    downloadDate: "2024-01-13T16:45:00Z", 
    fileSize: "512 KB",
    category: "Finance"
  },
  {
    id: "dl4",
    documentTitle: "Employee Training Manual",
    documentType: "PDF",
    downloadDate: "2024-01-12T11:20:00Z",
    fileSize: "3.2 MB",
    category: "Training"
  },
  {
    id: "dl5",
    documentTitle: "Technical Specifications Phase 2",
    documentType: "PDF", 
    downloadDate: "2024-01-11T13:10:00Z",
    fileSize: "4.1 MB",
    category: "Project Reports"
  }
];

const noticesHistory = [
  {
    id: "nh1",
    noticeTitle: "System Maintenance Schedule",
    readDate: "2024-01-15T10:00:00Z",
    priority: "high",
    department: "IT Department",
    author: "IT Admin"
  },
  {
    id: "nh2",
    noticeTitle: "New Safety Protocol Implementation",
    readDate: "2024-01-14T15:30:00Z",
    priority: "urgent", 
    department: "Safety Department",
    author: "Safety Officer"
  },
  {
    id: "nh3",
    noticeTitle: "Monthly Team Meeting",
    readDate: "2024-01-13T12:15:00Z",
    priority: "normal",
    department: "HR Department", 
    author: "HR Manager"
  },
  {
    id: "nh4",
    noticeTitle: "Budget Review Guidelines",
    readDate: "2024-01-12T09:45:00Z",
    priority: "normal",
    department: "Finance Department",
    author: "Finance Director"
  },
  {
    id: "nh5",
    noticeTitle: "Emergency Drill Schedule",
    readDate: "2024-01-11T14:20:00Z",
    priority: "high",
    department: "Safety Department",
    author: "Safety Coordinator"
  }
];

const categories = ["All", "Project Reports", "Safety", "Finance", "Training", "Operations"];
const departments = ["All", "IT Department", "Safety Department", "HR Department", "Finance Department", "Engineering Department"];

export const HistorySection = ({}: HistorySectionProps) => {
  const [activeTab, setActiveTab] = useState("downloads");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredDownloads = downloadHistory.filter(item => {
    const matchesSearch = item.documentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredNotices = noticesHistory.filter(item => {
    const matchesSearch = item.noticeTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || item.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4 text-primary" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      default: return "secondary";
    }
  };

  const DownloadHistoryCard = ({ item }: { item: typeof downloadHistory[0] }) => (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {getFileIcon(item.documentType)}
            <div>
              <h4 className="font-medium text-sm">{item.documentTitle}</h4>
              <p className="text-xs text-muted-foreground">
                {item.documentType} • {item.fileSize}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Download className="h-3 w-3" />
            <span>Downloaded: {formatDate(item.downloadDate)}</span>
          </div>
          <Button variant="outline" size="sm" className="h-6 text-xs">
            Download Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const NoticeHistoryCard = ({ item }: { item: typeof noticesHistory[0] }) => (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Bell className="h-4 w-4 text-primary" />
            <div>
              <h4 className="font-medium text-sm">{item.noticeTitle}</h4>
              <p className="text-xs text-muted-foreground">
                {item.department} • {item.author}
              </p>
            </div>
          </div>
          <Badge variant={getPriorityColor(item.priority)} className="text-xs">
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>Read: {formatDate(item.readDate)}</span>
          </div>
          <Button variant="outline" size="sm" className="h-6 text-xs">
            View Again
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
          <h2 className="text-2xl font-semibold">History</h2>
          <p className="text-muted-foreground">Track your downloads and read notices</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          {activeTab === "downloads" ? (
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
          ) : (
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="downloads">
            <Download className="h-4 w-4 mr-1" />
            Downloads ({downloadHistory.length})
          </TabsTrigger>
          <TabsTrigger value="notices">
            <Bell className="h-4 w-4 mr-1" />
            Read Notices ({noticesHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="downloads" className="space-y-4">
          {filteredDownloads.length > 0 ? (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {downloadHistory.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Downloads</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(downloadHistory.reduce((acc, item) => {
                        const size = parseFloat(item.fileSize);
                        return acc + (item.fileSize.includes('MB') ? size : size / 1024);
                      }, 0) * 10) / 10}
                    </div>
                    <div className="text-sm text-muted-foreground">Total MB</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {new Set(downloadHistory.map(item => item.category)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {downloadHistory.filter(item => {
                        const downloadDate = new Date(item.downloadDate);
                        const sevenDaysAgo = new Date();
                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                        return downloadDate >= sevenDaysAgo;
                      }).length}
                    </div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                  </CardContent>
                </Card>
              </div>

              {/* Downloads List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDownloads.map((item) => (
                  <DownloadHistoryCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No downloads found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notices" className="space-y-4">
          {filteredNotices.length > 0 ? (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {noticesHistory.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Read</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {noticesHistory.filter(item => item.priority === "urgent").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Urgent</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {new Set(noticesHistory.map(item => item.department)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Departments</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {noticesHistory.filter(item => {
                        const readDate = new Date(item.readDate);
                        const sevenDaysAgo = new Date();
                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                        return readDate >= sevenDaysAgo;
                      }).length}
                    </div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                  </CardContent>
                </Card>
              </div>

              {/* Notices List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotices.map((item) => (
                  <NoticeHistoryCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No notices found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};