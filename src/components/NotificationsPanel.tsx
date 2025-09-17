import { useState } from "react";
import { Bell, X, Check, Clock, AlertCircle, FileText, Users, Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
  onDocumentClick: (docId: string) => void;
  onNoticeClick: (noticeId: string) => void;
}

// Mock notifications data
const notifications = [
  {
    id: "1",
    type: "document",
    title: "New document uploaded: Financial Report Q3",
    message: "AI summary generated automatically",
    timestamp: "5 minutes ago",
    unread: true,
    priority: "medium",
    actionData: { documentId: "doc_123" }
  },
  {
    id: "2",
    type: "reminder",
    title: "Meeting reminder: Board Meeting", 
    message: "Scheduled for tomorrow at 10:00 AM",
    timestamp: "30 minutes ago",
    unread: true,
    priority: "high",
    actionData: { reminderId: "rem_456" }
  },
  {
    id: "3",
    type: "notice",
    title: "Important: New Safety Guidelines",
    message: "Updated safety protocols for all departments",
    timestamp: "2 hours ago",
    unread: false,
    priority: "high",
    actionData: { noticeId: "not_789" }
  },
  {
    id: "4",
    type: "ai",
    title: "AI Processing Complete",
    message: "3 documents processed with summaries generated",  
    timestamp: "4 hours ago",
    unread: false,
    priority: "low",
    actionData: {}
  },
  {
    id: "5",
    type: "system",
    title: "Auto-upload activated",
    message: "Downloaded file detected and uploaded successfully",
    timestamp: "6 hours ago", 
    unread: false,
    priority: "low",
    actionData: { documentId: "doc_321" }
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "document":
      return FileText;
    case "reminder":
      return Clock;
    case "notice":
      return AlertCircle;
    case "ai":
      return Bell;
    case "system":
      return Settings;
    default:
      return Bell;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-destructive";
    case "medium":
      return "text-warning";
    case "low":
      return "text-muted-foreground";
    default:
      return "text-muted-foreground";
  }
};

export const NotificationsPanel = ({ 
  open, 
  onClose, 
  onDocumentClick, 
  onNoticeClick 
}: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "document",
      title: "New document uploaded: Financial Report Q3",
      message: "AI summary generated automatically",
      timestamp: "5 minutes ago",
      unread: true,
      priority: "medium",
      actionData: { documentId: "doc_123" }
    },
    {
      id: "2",
      type: "reminder",
      title: "Meeting reminder: Board Meeting", 
      message: "Scheduled for tomorrow at 10:00 AM",
      timestamp: "30 minutes ago",
      unread: true,
      priority: "high",
      actionData: { reminderId: "rem_456" }
    },
    {
      id: "3",
      type: "notice",
      title: "Important: New Safety Guidelines",
      message: "Updated safety protocols for all departments",
      timestamp: "2 hours ago",
      unread: false,
      priority: "high",
      actionData: { noticeId: "not_789" }
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, unread: false }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    
    if (notification.type === "document" && notification.actionData.documentId) {
      onDocumentClick(notification.actionData.documentId);
      onClose();
    } else if (notification.type === "notice" && notification.actionData.noticeId) {
      onNoticeClick(notification.actionData.noticeId);
      onClose();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} unread
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Actions */}
          {unreadCount > 0 && (
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="mr-2 h-4 w-4" />
                Mark all read
              </Button>
            </div>
          )}

          <Separator />

          {/* Notifications List */}
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                
                return (
                  <Card
                    key={notification.id}
                    className={`cursor-pointer kmrl-transition hover:bg-accent/50 ${
                      notification.unread ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 ${getPriorityColor(notification.priority)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-foreground truncate">
                              {notification.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              {notification.unread && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                              <Badge variant="secondary" className="text-xs capitalize">
                                {notification.type}
                              </Badge>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          {(notification.type === "document" || notification.type === "notice") && (
                            <div className="mt-3 flex space-x-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                Open
                              </Button>
                              {!notification.unread && (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Read
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <>
              <Separator />
              <div className="text-center">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  View all notifications
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};