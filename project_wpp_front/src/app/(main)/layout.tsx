import Header from "@/components/Header";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8fafc]">
      <div className="flex min-h-screen">
        <div className="flex-1 flex flex-col relative overflow-auto w-full">
          <Header />
          <main className="p-4 md:p-8 flex flex-col flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
