"use client";

import { Activity, ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard title="Total Scans" value="1,284" icon={<Activity className="h-4 w-4 text-primary" />} />
        <StatCard title="Threats Blocked" value="342" icon={<ShieldAlert className="h-4 w-4 text-destructive" />} />
        <StatCard title="Vulnerabilities" value="12" icon={<AlertTriangle className="h-4 w-4 text-orange-500" />} />
        <StatCard title="System Health" value="98%" icon={<CheckCircle className="h-4 w-4 text-green-500" />} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/40">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${i % 2 === 0 ? 'bg-destructive' : 'bg-primary'}`} />
                  <div>
                    <p className="font-medium text-sm">URL Analysis: example{i}.com</p>
                    <p className="text-xs text-muted-foreground">Scanned 2 mins ago</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${i % 2 === 0 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                  {i % 2 === 0 ? 'Malicious' : 'Safe'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Risk Score</h2>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-[8px] border-primary/20">
              <span className="text-3xl font-bold text-primary">85</span>
              <div className="absolute inset-0 border-[8px] border-primary rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }} />
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground">Overall Security Posture</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
