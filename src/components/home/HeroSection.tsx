import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrustBadge } from '@/components/common/TrustBadge';
import { trustBadges, proofPillars } from '@/data/mockData';
import { events } from '@/lib/analytics';
import { Eye, Activity, Users, LucideIcon } from 'lucide-react';

const pillarIcons: Record<string, LucideIcon> = {
  Eye,
  Activity,
  Users,
};

export function HeroSection() {
  const handleBookVisit = () => {
    events.bookVisitClick('hero');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 trust-pattern opacity-30" />
      
      <div className="container-wide relative">
        <div className="py-16 md:py-24 lg:py-32">
          {/* Main Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-6 animate-fade-in-up">
              Trust, transparently{' '}
              <span className="text-gradient">earned.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
              Since 2022, Emeis has transformed under new leadership—focusing on 
              safety, care quality, and honest communication with families.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in-up animation-delay-200">
              <Button variant="hero" size="xl" onClick={handleBookVisit} asChild>
                <Link to="/transparency#book-visit">
                  Book a Visit
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="#documentary">
                  <Play className="h-5 w-5" />
                  Watch Our Story
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up animation-delay-300">
              {trustBadges.map((badge) => (
                <TrustBadge
                  key={badge.id}
                  icon={badge.icon}
                  label={badge.label}
                />
              ))}
            </div>
          </div>

          {/* Proof Pillars */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in-up animation-delay-400">
            {proofPillars.map((pillar) => {
              const Icon = pillarIcons[pillar.icon] || Eye;
              return (
                <div
                  key={pillar.id}
                  className="card-trust p-6 text-center group"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
