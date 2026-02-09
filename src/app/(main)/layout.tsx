import Footer from "@/components/Footer";
import Header from "@/components/main/Header";

export default function MainLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <div className="h-dvh bg-sky-50">
      <div className="flex flex-col h-dvh">
        <Header />
        <main className="flex-1 overflow-y-auto p-2">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
