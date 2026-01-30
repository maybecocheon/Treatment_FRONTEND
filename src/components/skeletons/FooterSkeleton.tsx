'use client'


export default function FooterSkeleton() {
  return (
    <footer className="py-12 md:py-20 bg-slate-950 border-t border-white/5 flex justify-center items-center">
      <div className="h-4 w-64 md:w-96 bg-slate-800 animate-pulse rounded-full" />
    </footer>
  );
}