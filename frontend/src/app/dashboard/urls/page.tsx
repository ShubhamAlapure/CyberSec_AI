"use client";

import { useState } from "react";
import { Search, ShieldAlert, CheckCircle, AlertTriangle, Globe, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function UrlAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsScanning(true);
    setIsScanning(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-five-brown-palvp06slw.vercel.app";
      const response = await fetch(`${API_URL}/api/scan/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error analyzing URL:", error);
      alert("Failed to connect to the security backend. Please ensure the FastAPI server is running on port 8000.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">URL Analyzer</h1>
        <p className="text-muted-foreground">Deep scan URLs for WHOIS data, SSL validity, and malicious intent using our AI engine.</p>
      </div>

      {/* Input Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm"
      >
        <form onSubmit={handleScan} className="flex gap-4">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://suspicious-link.com/login" 
              className="w-full h-12 pl-10 pr-4 rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <Button type="submit" disabled={isScanning} className="h-12 px-8 min-w-[140px]">
            {isScanning ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Scanning...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Analyze URL
              </div>
            )}
          </Button>
        </form>
      </motion.div>

      {/* Results Section */}
      {results && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Main Score Card */}
          <div className="col-span-1 rounded-xl border border-destructive/20 bg-destructive/5 p-6 backdrop-blur-sm flex flex-col items-center justify-center text-center">
            <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold text-destructive mb-1">{results.safetyStatus}</h2>
            <p className="text-muted-foreground mb-6 break-all max-w-full px-2">{results.url}</p>
            
            <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-[8px] border-destructive/20">
              <span className="text-3xl font-bold text-destructive">{results.trustScore}</span>
              <div className="absolute inset-0 border-[8px] border-destructive rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 55%)' }} />
            </div>
            <p className="mt-4 text-sm font-medium">Trust Score (0-100)</p>
          </div>

          {/* Details & AI Summary */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                AI Threat Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {results.aiSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border/50 bg-card/30 p-4 flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Lock className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SSL Certificate</p>
                  <p className="font-semibold">{results.sslValid ? "Valid" : "Invalid"}</p>
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-card/30 p-4 flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Domain Age</p>
                  <p className="font-semibold">{results.domainAge}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
