import { Shield, LayoutDashboard, Search, AlertTriangle, FileText, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-card/30 backdrop-blur-xl flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border/40">
          <Shield className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-lg">Aegis AI</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/dashboard" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md bg-primary/10 text-primary">
            <LayoutDashboard className="h-4 w-4 mr-3" />
            Overview
          </Link>
          <Link href="/dashboard/phishing" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <AlertTriangle className="h-4 w-4 mr-3" />
            Phishing Detection
          </Link>
          <Link href="/dashboard/urls" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Search className="h-4 w-4 mr-3" />
            URL Analyzer
          </Link>
          <Link href="/dashboard/scanner" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Shield className="h-4 w-4 mr-3" />
            Vulnerability Scanner
          </Link>
          <Link href="/dashboard/chat" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Search className="h-4 w-4 mr-3" /> {/* Replace icon in actual code if needed, using Search as placeholder for Bot */}
            Aegis Copilot
          </Link>
          <Link href="/dashboard/reports" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <FileText className="h-4 w-4 mr-3" />
            Reports
          </Link>
          <Link href="/dashboard/settings" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border/40">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 mr-3" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-border/40 bg-background/50 backdrop-blur-sm flex items-center px-6 justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">SA</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
