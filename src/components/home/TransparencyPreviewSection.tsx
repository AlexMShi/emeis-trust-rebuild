import { Link } from 'react-router-dom';
import { Eye, Smartphone, Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useExperiment } from '@/lib/experiments';

const previewCards = [
  {
    id: 'tour',
    icon: Eye,
    title: '360° Virtual Tours',
    description: 'Explore our facilities from anywhere. See common areas, rooms, gardens, and dining spaces.',
    cta: 'Start Virtual Tour',
    image: '/placeholder.svg',
  },
  {
    id: 'tracking',
    icon: Smartphone,
    title: 'Real-Time Care Tracking',
    description: 'See meals, medications, activities, and communications in real-time through our app.',
    cta: 'Try Demo',
    image: '/placeholder.svg',
  },
  {
    id: 'testimonials',
    icon: Video,
    title: 'Family Testimonials',
    description: 'Watch verified families share their genuine experiences with Emeis care.',
    cta: 'Watch Stories',
    image: '/placeholder.svg',
  },
];

export function TransparencyPreviewSection() {
  const variant = useExperiment('transparency');
  const isVariantB = variant === 'B';

  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeader
          eyebrow="See For Yourself"
          title="Experience Our Transparency"
          description="We believe the best way to build trust is to show you everything. Explore our commitment to openness."
        />

        <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-6">
          {previewCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="card-trust group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="p-2 rounded-lg bg-background/90 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {card.description}
                  </p>
                  <Button variant="ghost" size="sm" className="group/btn" asChild>
                    <Link to="/transparency">
                      {card.cta}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional CTA for Variant B */}
        {isVariantB && (
          <div className="mt-8 text-center">
            <Button variant="hero" asChild>
              <Link to="/transparency#book-visit">
                Book Your Visit Today
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
