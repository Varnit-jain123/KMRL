import { useState } from "react";
import { Clock, Check, Plus, Calendar, Brain, AlertTriangle, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RemindersSectionProps {
  onReminderClick?: (reminderId: string) => void;
}

// Mock reminders data
const initialReminders = [
  {
    id: "reminder1",
    title: "Submit Safety Training Report",
    description: "Complete and submit the quarterly safety training completion report",
    dueDate: "2024-01-20T17:00:00Z",
    priority: "high",
    type: "manual",
    isCompleted: false,
    createdAt: "2024-01-15T09:00:00Z",
    source: "Manual Entry"
  },
  {
    id: "reminder2",
    title: "Review Budget Allocation Document",
    description: "AI detected a deadline in Budget Allocation Q4 2024 document",
    dueDate: "2024-01-22T12:00:00Z",
    priority: "urgent",
    type: "ai-suggested",
    isCompleted: false,
    createdAt: "2024-01-14T10:30:00Z",
    source: "AI Analysis - Budget Allocation Q4 2024.xlsx"
  },
  {
    id: "reminder3",
    title: "Attend Monthly Team Meeting",
    description: "Monthly all-hands meeting in main conference room",
    dueDate: "2024-01-22T10:00:00Z",
    priority: "normal",
    type: "manual",
    isCompleted: true,
    createdAt: "2024-01-13T14:15:00Z",
    completedAt: "2024-01-22T10:00:00Z",
    source: "Manual Entry"
  },
  {
    id: "reminder4",
    title: "Metro Project Phase 2 Milestone Review",
    description: "AI detected an important deadline in Metro Expansion Project Report",
    dueDate: "2024-01-25T16:00:00Z",
    priority: "high",
    type: "ai-suggested",
    isCompleted: false,
    createdAt: "2024-01-12T11:45:00Z",
    source: "AI Analysis - Metro Expansion Project Report.pdf"
  }
];

export const RemindersSection = ({ onReminderClick }: RemindersSectionProps) => {
  const [reminders, setReminders] = useState(initialReminders);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  
  // Create form state
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "normal"
  });

  const handleMarkAsDone = (reminderId: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, isCompleted: true, completedAt: new Date().toISOString() }
        : reminder
    ));
  };

  const handleCreateReminder = () => {
    const newReminder = {
      id: `reminder${Date.now()}`,
      title: createForm.title,
      description: createForm.description,
      dueDate: new Date(createForm.dueDate).toISOString(),
      priority: createForm.priority,
      type: "manual" as const,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      source: "Manual Entry"
    };

    setReminders(prev => [newReminder, ...prev]);
    setCreateForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "normal"
    });
    setIsCreateOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      default: return "secondary";
    }
  };

  const getPriorityIcon = (priority: string) => {
    return priority === "urgent" ? "🚨" : priority === "high" ? "⚠️" : "ℹ️";
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const pendingReminders = reminders.filter(r => !r.isCompleted);
  const completedReminders = reminders.filter(r => r.isCompleted);
  const urgentReminders = pendingReminders.filter(r => r.priority === "urgent" || isOverdue(r.dueDate));

  const ReminderCard = ({ reminder, showActions = true }: { reminder: typeof reminders[0], showActions?: boolean }) => (
    <Card className={`
      transition-all hover:shadow-md
      ${reminder.isCompleted ? 'opacity-75' : ''}
      ${isOverdue(reminder.dueDate) && !reminder.isCompleted ? 'border-destructive bg-destructive/5' : ''}
      ${reminder.priority === "urgent" && !reminder.isCompleted ? 'border-destructive bg-destructive/5' : ''}
    `}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm">{getPriorityIcon(reminder.priority)}</span>
              <CardTitle className={`text-sm font-medium ${reminder.isCompleted ? 'line-through' : ''}`}>
                {reminder.title}
              </CardTitle>
              {reminder.type === "ai-suggested" && (
                <Badge variant="outline" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  AI
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={getPriorityColor(reminder.priority)} className="text-xs">
                {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
              </Badge>
              {isOverdue(reminder.dueDate) && !reminder.isCompleted && (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Overdue
                </Badge>
              )}
              {reminder.isCompleted && (
                <Badge variant="secondary" className="text-xs">
                  <Check className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">{reminder.description}</p>
        
        <div className="space-y-1 text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Due: {formatDate(reminder.dueDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Source: {reminder.source}</span>
          </div>
          {reminder.isCompleted && reminder.completedAt && (
            <div className="flex items-center space-x-1">
              <Check className="h-3 w-3" />
              <span>Completed: {formatDate(reminder.completedAt)}</span>
            </div>
          )}
        </div>

        {showActions && !reminder.isCompleted && (
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleMarkAsDone(reminder.id)}
              className="flex-1"
            >
              <Check className="h-3 w-3 mr-1" />
              Mark as Done
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Reminders</h2>
          <p className="text-muted-foreground">Stay on top of your tasks and deadlines</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Reminder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter reminder title..."
                  value={createForm.title}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter description..."
                  rows={3}
                  value={createForm.description}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date & Time</label>
                <Input
                  type="datetime-local"
                  value={createForm.dueDate}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select 
                  value={createForm.priority} 
                  onValueChange={(value) => setCreateForm(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateReminder}
                  disabled={!createForm.title || !createForm.dueDate}
                >
                  Create Reminder
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Urgent Alert */}
      {urgentReminders.length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-destructive flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {urgentReminders.length} Urgent Reminder{urgentReminders.length > 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({pendingReminders.length})
          </TabsTrigger>
          <TabsTrigger value="urgent">
            Urgent ({urgentReminders.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-1" />
            Completed ({completedReminders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingReminders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pendingReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No pending reminders</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          {urgentReminders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {urgentReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Check className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No urgent reminders</h3>
              <p className="text-muted-foreground">All urgent items are handled</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {completedReminders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {completedReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} showActions={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No completed reminders</h3>
              <p className="text-muted-foreground">Complete some reminders to see history</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};