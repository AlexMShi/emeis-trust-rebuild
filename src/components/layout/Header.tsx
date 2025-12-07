import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { events } from '@/lib/analytics';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Transparency', href: '/transparency' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Admission', href: '/admission' },
  { label: 'Family Portal', href: '/family-portal' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleBookVisitClick = () => {
    events.bookVisitClick('header');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-display font-semibold text-foreground"
          >
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            <span>Emeis</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/family-portal">Family Login</Link>
            </Button>
            <Button size="sm" onClick={handleBookVisitClick} asChild>
              <Link to="/transparency#book-visit">Book a Visit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in-down">
          <nav className="container-wide py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
              <Button variant="outline" asChild>
                <Link to="/family-portal" onClick={() => setIsMenuOpen(false)}>
                  Family Login
                </Link>
              </Button>
              <Button onClick={() => { handleBookVisitClick(); setIsMenuOpen(false); }} asChild>
                <Link to="/transparency#book-visit">Book a Visit</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
