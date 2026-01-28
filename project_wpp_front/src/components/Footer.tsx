'use client'

interface FooterProps {
  variant?: 'default' | 'sidebar';
}

export default function Footer({ variant = 'default' }: FooterProps) {
  // 사이드바 Footer 스타일
  if (variant === 'sidebar') {
    return (
      <div className="p-6 bg-slate-950/50 border-t border-slate-800">
        <p className="text-xs text-slate-500 text-center font-medium">
          © 2026 FLOWISE System.
        </p>
      </div>
    );
  }

  // 일반 페이지 Footer 스타일 (기본값)
  return (
    <footer className="py-12 md:py-20 bg-slate-950 text-slate-600 text-center text-sm border-t border-white/5">
      <p>© 2026 FLOWISE System. Innovating Water Infrastructure through Intelligence.</p>
    </footer>
  );
}
