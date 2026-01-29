import Header from "@/components/main/Header";

export default function MainLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <div className="flex min-h-screen bg-sky-50">
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
