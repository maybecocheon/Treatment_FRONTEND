import Footer from "@/components/Footer";
import AuthGuard from "@/components/main/AuthGuard";
import Header from "@/components/main/Header";

export default function MainLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="h-dvh bg-background text-foreground transition-colors duration-300">
      <div className="flex flex-col h-dvh">
        <AuthGuard>
          <Header />
          <main className="flex-1 overflow-y-auto p-2">
            {children}
          </main>
          <Footer />
        </AuthGuard>
      </div>
    </div>
  );
}
