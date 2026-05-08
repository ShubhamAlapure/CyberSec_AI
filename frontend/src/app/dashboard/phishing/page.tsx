"use client";

import { useState } from "react";
import { ShieldAlert, Mail, Activity, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function PhishingDetectionPage() {
  const [text, setText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    
    setIsScanning(true);
    try {
      const response = await fetch("http://localhost:8000/api/scan/phishing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error scanning text:", error);
      alert("Failed to connect to the security backend. Please ensure the FastAPI server is running on port 8000.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Phishing Detection</h1>
        <p className="text-muted-foreground">Paste suspicious emails or messages. Our AI will analyze the text for social engineering patterns and malicious intent.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm shadow-sm flex flex-col h-[500px]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Message Content</h2>
          </div>
          <form onSubmit={handleScan} className="flex flex-col flex-1">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the suspicious email text here...&#10;&#10;Dear Customer,&#10;Your account will be suspended within 24 hours. Please click here to verify your identity immediately." 
              className="flex-1 w-full p-4 rounded-lg border border-border/50 bg-background/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none mb-4"
              required
            />
            <Button type="submit" disabled={isScanning} className="w-full h-12">
              {isScanning ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Analyzing Text...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Analyze with AI
                </div>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Results Section */}
        {results ? (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 backdrop-blur-sm flex items-center gap-6">
              <div className="relative flex items-center justify-center h-24 w-24 rounded-full border-[6px] border-destructive/20 shrink-0">
                <span className="text-2xl font-bold text-destructive">{results.score}%</span>
                <div className="absolute inset-0 border-[6px] border-destructive rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 20%)' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-destructive mb-1">{results.status}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{results.threatCategory}</span>
                </div>
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {results.confidence}% Confidence
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                AI Threat Explanation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {results.aiSummary}
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Suspicious Phrases Detected</h3>
              <ul className="space-y-2">
                {results.highlightedPhrases.map((phrase: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 bg-destructive/10 text-destructive-foreground p-2 rounded-md text-sm border border-destructive/20">
                    <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                    <span>"{phrase}"</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : (
          <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm border-dashed flex flex-col items-center justify-center text-center h-[500px] text-muted-foreground">
            <Activity className="h-12 w-12 mb-4 opacity-20" />
            <p>Paste an email and click analyze to see the AI threat report here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
