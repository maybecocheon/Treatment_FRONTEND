import Footer from '@/components/Footer';
import Introduce from '@/components/loginJoin/Introduce';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Introduce />
      <Footer />
    </div>
  );
};