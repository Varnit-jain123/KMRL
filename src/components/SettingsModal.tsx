import { useState } from "react";
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Shield, 
  Download, 
  Brain,
  Volume2,
  Mic,
  Eye,
  Lock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("english");
  const [notifications, setNotifications] = useState({
    documents: true,
    reminders: true,
    notices: true,
    aiProcessing: false
  });
  const [aiSettings, setAiSettings] = useState({
    autoSummary: true,
    autoTagging: true,
    voiceSearch: true,
    multiLanguage: true
  });
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analyticsOptIn: true,
    autoBackup: true
  });
  const [audioSettings, setAudioSettings] = useState({
    summaryPlayback: [75],
    microphoneSensitivity: [60]
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            KMRL Platform Settings
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Appearance Settings */}
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {theme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">Dark Mode</span>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>

              {/* Language Selection */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">Language</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={language === "english" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("english")}
                  >
                    English
                  </Button>
                  <Button
                    variant={language === "hindi" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("hindi")}
                  >
                    हिंदी
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Document uploads</span>
                  <Switch
                    checked={notifications.documents}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, documents: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reminders</span>
                  <Switch
                    checked={notifications.reminders}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, reminders: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Important notices</span>
                  <Switch
                    checked={notifications.notices}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, notices: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI processing</span>
                  <Switch
                    checked={notifications.aiProcessing}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, aiProcessing: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Features Settings */}
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Auto-generate summaries</span>
                    <p className="text-xs text-muted-foreground">Create AI summaries for new documents</p>
                  </div>
                  <Switch
                    checked={aiSettings.autoSummary}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({ ...prev, autoSummary: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Smart tagging</span>
                    <p className="text-xs text-muted-foreground">Auto-categorize documents</p>
                  </div>
                  <Switch
                    checked={aiSettings.autoTagging}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({ ...prev, autoTagging: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Voice search</span>
                    <p className="text-xs text-muted-foreground">Enable microphone for search</p>
                  </div>
                  <Switch
                    checked={aiSettings.voiceSearch}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({ ...prev, voiceSearch: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Multi-language AI</span>
                    <p className="text-xs text-muted-foreground">Process Hindi documents</p>
                  </div>
                  <Switch
                    checked={aiSettings.multiLanguage}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({ ...prev, multiLanguage: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Volume2 className="mr-2 h-5 w-5" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Summary playback volume</span>
                    <Badge variant="secondary">{audioSettings.summaryPlayback[0]}%</Badge>
                  </div>
                  <Slider
                    value={audioSettings.summaryPlayback}
                    onValueChange={(value) => 
                      setAudioSettings(prev => ({ ...prev, summaryPlayback: value }))
                    }
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Microphone sensitivity</span>
                    <Badge variant="secondary">{audioSettings.microphoneSensitivity[0]}%</Badge>
                  </div>
                  <Slider
                    value={audioSettings.microphoneSensitivity}
                    onValueChange={(value) => 
                      setAudioSettings(prev => ({ ...prev, microphoneSensitivity: value }))
                    }
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Data sharing for improvements</span>
                    <p className="text-xs text-muted-foreground">Help improve AI features</p>
                  </div>
                  <Switch
                    checked={privacy.dataSharing}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Usage analytics</span>
                    <p className="text-xs text-muted-foreground">Anonymous usage statistics</p>
                  </div>
                  <Switch
                    checked={privacy.analyticsOptIn}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, analyticsOptIn: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Automatic backup</span>
                    <p className="text-xs text-muted-foreground">Secure cloud backup</p>
                  </div>
                  <Switch
                    checked={privacy.autoBackup}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, autoBackup: checked }))
                    }
                  />
                </div>
              </div>

              <Separator />
              
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export My Data
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className="kmrl-card">
            <CardHeader>
              <CardTitle className="text-lg">Help & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Tutorial Videos
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                User Guide (PDF)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Contact IT Support
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Report Issue
              </Button>
              
              <Separator />
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>KMRL Document Platform v2.1</p>
                <p>© 2024 Kerala Metro Rail Limited</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="space-x-2">
            <Button variant="outline">
              Reset to Defaults
            </Button>
            <Button onClick={onClose}>
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};