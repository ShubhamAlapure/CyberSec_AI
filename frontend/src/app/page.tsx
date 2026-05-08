"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Lock, Globe, Zap, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 text-primary">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tighter text-foreground">Aegis AI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 md:pt-36 md:pb-48">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
          
          <div className="container relative mx-auto px-4 md:px-6 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-8"
            >
              <Activity className="mr-2 h-4 w-4" />
              <span>Next-Gen AI Security Platform</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground"
            >
              Secure Your Digital Frontier with AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
            >
              Detect phishing, analyze suspicious URLs, and scan for vulnerabilities in real-time. The ultimate cybersecurity assistant for SOC teams and ethical hackers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base group w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-primary/20 hover:bg-primary/10 w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-24 bg-background/50 relative border-t border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Defense</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to analyze threats and protect your infrastructure, powered by advanced language models.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Phishing Detection", icon: <Lock className="h-6 w-6 text-primary" />, desc: "Instantly analyze emails and messages for social engineering patterns." },
                { title: "URL Analyzer", icon: <Globe className="h-6 w-6 text-primary" />, desc: "Deep scan URLs for WHOIS data, SSL validity, and malicious intent." },
                { title: "Vulnerability Scans", icon: <Zap className="h-6 w-6 text-primary" />, desc: "Automated checks for missing headers, exposed endpoints, and basic XSS." },
                { title: "AI Threat Summaries", icon: <Cpu className="h-6 w-6 text-primary" />, desc: "Get natural language explanations of complex security vulnerabilities." },
                { title: "Real-time Dashboard", icon: <Activity className="h-6 w-6 text-primary" />, desc: "Monitor threats and attack surfaces dynamically with live analytics." },
                { title: "Chat Assistant", icon: <Shield className="h-6 w-6 text-primary" />, desc: "Ask our AI about security concepts, mitigation steps, and best practices." }
              ].map((feat, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 hover:bg-card/50 transition-colors backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      {feat.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your workflow?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Join thousands of security professionals using Aegis AI to stay ahead of threats.</p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-primary mb-4 md:mb-0">
            <Shield className="h-5 w-5" />
            <span className="font-bold">Aegis AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Aegis AI Security. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
