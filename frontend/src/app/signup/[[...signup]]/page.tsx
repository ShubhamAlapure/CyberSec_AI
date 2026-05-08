import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <SignUp appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
          card: 'bg-card border border-border shadow-xl',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 'bg-background border border-border text-foreground hover:bg-muted',
          dividerText: 'text-muted-foreground',
          formFieldLabel: 'text-muted-foreground',
          formFieldInput: 'bg-background border border-border text-foreground',
          footerActionText: 'text-muted-foreground',
          footerActionLink: 'text-primary hover:text-primary/90'
        }
      }} />
    </div>
  );
}
