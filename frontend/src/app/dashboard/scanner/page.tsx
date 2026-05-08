"use client";

import { useState } from "react";
import { Radar, Zap, ShieldAlert, Server, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function VulnerabilityScannerPage() {
  const [target, setTarget] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;
    
    setIsScanning(true);
    setIsScanning(true);
    try {
      const response = await fetch("http://localhost:8000/api/scan/vulnerability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ target }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error scanning target:", error);
      alert("Failed to connect to the security backend. Please ensure the FastAPI server is running on port 8000.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vulnerability Scanner</h1>
        <p className="text-muted-foreground">Perform safe, defensive scans against your infrastructure to identify missing security headers and common misconfigurations.</p>
      </div>

      {/* Input Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm"
      >
        <form onSubmit={handleScan} className="flex gap-4">
          <div className="relative flex-1">
            <Server className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input 
              type="text" 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="example.com or 192.168.1.1" 
              className="w-full h-12 pl-10 pr-4 rounded-lg border border-border/50 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <Button type="submit" disabled={isScanning} className="h-12 px-8 min-w-[160px]">
            {isScanning ? (
              <div className="flex items-center gap-2">
                <Radar className="h-4 w-4 animate-spin" />
                Scanning...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Initiate Scan
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
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="col-span-1 rounded-xl border border-orange-500/20 bg-orange-500/5 p-6 backdrop-blur-sm flex flex-col items-center justify-center text-center">
              <ShieldAlert className="h-12 w-12 text-orange-500 mb-4" />
              <h2 className="text-xl font-bold text-orange-500 mb-1">{results.status}</h2>
              <div className="relative flex items-center justify-center h-28 w-28 rounded-full border-[6px] border-orange-500/20 mt-4">
                <span className="text-2xl font-bold text-orange-500">{results.score}</span>
                <div className="absolute inset-0 border-[6px] border-orange-500 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 35%)' }} />
              </div>
              <p className="mt-4 text-sm font-medium">Security Score</p>
            </div>

            <div className="col-span-1 md:col-span-2 rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                Scan Findings
              </h3>
              <div className="space-y-3">
                {results.findings.map((finding: any, idx: number) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
                    <div className="shrink-0">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        finding.severity === 'High' ? 'bg-destructive/10 text-destructive' :
                        finding.severity === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {finding.severity}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">{finding.type}</p>
                      <p className="text-sm text-muted-foreground">{finding.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
