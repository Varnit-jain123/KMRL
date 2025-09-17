import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface VoiceSearchProps {
  onTranscript: (text: string) => void;
  onSearch: (query: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

// Mock speech recognition for demo
class MockSpeechRecognition {
  onstart: (() => void) | null = null;
  onresult: ((event: any) => void) | null = null;
  onend: (() => void) | null = null;
  onerror: ((event: any) => void) | null = null;

  continuous = true;
  lang = "en-US";
  interimResults = true;

  private timeout: NodeJS.Timeout | null = null;

  start() {
    if (this.onstart) this.onstart();
    
    // Simulate voice recognition with demo phrases
    const demoResponses = [
      "Metro project timeline",
      "Safety guidelines document", 
      "Financial budget allocation",
      "Board meeting minutes",
      "Construction progress report",
      "Employee handbook",
      "मेट्रो परियोजना की जानकारी", // Hindi demo
      "सुरक्षा दिशानिर्देश"
    ];

    this.timeout = setTimeout(() => {
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      
      if (this.onresult) {
        this.onresult({
          results: [{
            0: { transcript: randomResponse },
            isFinal: true
          }]
        });
      }
      
      setTimeout(() => {
        if (this.onend) this.onend();
      }, 500);
    }, 2000);
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (this.onend) this.onend();
  }
}

export const VoiceSearch = ({ onTranscript, onSearch, isListening, setIsListening }: VoiceSearchProps) => {
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const recognitionRef = useRef<MockSpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if speech recognition is supported (simulate support)
    setIsSupported(true);
    
    if (!recognitionRef.current) {
      recognitionRef.current = new MockSpeechRecognition();
      
      recognitionRef.current.onstart = () => {
        console.log("Voice recognition started");
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        onTranscript(transcript);
        
        if (event.results[0].isFinal) {
          onSearch(transcript);
          toast({
            title: "Voice Search Complete",
            description: `Searching for: "${transcript}"`,
          });
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Voice recognition error:", event);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or use text search",
          variant: "destructive"
        });
      };
    }
  }, [onTranscript, onSearch, setIsListening, toast]);

  const toggleListening = () => {
    if (!isSupported) {
      toast({
        title: "Voice Search Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language;
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript("");
        toast({
          title: "Voice Search Started",
          description: "Speak your search query...",
        });
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = language === "en-US" ? "hi-IN" : "en-US";
    setLanguage(newLang);
    toast({
      title: "Language Changed",
      description: `Voice recognition set to ${newLang === "en-US" ? "English" : "Hindi"}`,
    });
  };

  if (!isSupported) {
    return (
      <div className="text-xs text-muted-foreground">
        Voice search not supported
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Language Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="text-xs"
      >
        {language === "en-US" ? "EN" : "हिं"}
      </Button>

      {/* Voice Button */}
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="sm"
        onClick={toggleListening}
        className={`${isListening ? 'animate-pulse' : ''}`}
      >
        {isListening ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>

      {/* Status */}
      {isListening && (
        <div className="flex items-center space-x-1">
          <Badge variant="destructive" className="animate-pulse">
            Listening...
          </Badge>
          <Volume2 className="h-3 w-3 text-destructive animate-pulse" />
        </div>
      )}

      {/* Live Transcript */}
      {transcript && (
        <div className="text-xs text-muted-foreground max-w-32 truncate">
          "{transcript}"
        </div>
      )}
    </div>
  );
};