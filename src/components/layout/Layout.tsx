import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { DebugPanel } from '@/components/debug/DebugPanel';
import { StickyCTA } from '@/components/common/StickyCTA';
import { isDebugMode } from '@/lib/experiments';
import { events } from '@/lib/analytics';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    events.pageView(location.pathname);
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyCTA />
      {isDebugMode() && <DebugPanel />}
    </div>
  );
}
