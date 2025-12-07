import { Link } from 'react-router-dom';
import { Play, CheckCircle, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { timelineEvents } from '@/data/mockData';
import { cn } from '@/lib/utils';

const typeIcons = {
  acknowledgment: CheckCircle,
  change: MessageCircle,
  voices: Users,
};

const typeColors = {
  acknowledgment: 'bg-soft-coral/10 text-soft-coral border-soft-coral/20',
  change: 'bg-calm-blue/10 text-calm-blue border-calm-blue/20',
  voices: 'bg-primary/10 text-primary border-primary/20',
};

export function TransformationSection() {
  return (
    <section id="transformation" className="section-padding bg-gradient-trust">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Our Journey"
          title="The Emeis Transformation"
          description="A documentary-style narrative of honest acknowledgment, evidence of change, and the voices of families and staff."
        />

        {/* Timeline */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {/* Timeline Events */}
            <div className="space-y-8 md:space-y-12">
              {timelineEvents.map((event, index) => {
                const Icon = typeIcons[event.type];
                const isEven = index % 2 === 0;
                
                return (
                  <div
                    key={event.year}
                    className={cn(
                      "relative flex gap-4 md:gap-8",
                      "md:items-center",
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background md:-translate-x-1.5 z-10" />

                    {/* Content Card */}
                    <div className={cn(
                      "ml-12 md:ml-0 md:w-[calc(50%-2rem)] card-trust p-6",
                      isEven ? "md:text-right" : "md:text-left"
                    )}>
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mb-3",
                        typeColors[event.type]
                      )}>
                        <Icon className="h-3.5 w-3.5" />
                        <span>{event.year}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {event.description}
                      </p>
                    </div>

                    {/* Spacer for desktop alignment */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Documentary CTA */}
        <div id="documentary" className="mt-12 md:mt-16 text-center">
          <div className="inline-block card-trust p-8 max-w-xl">
            <div className="relative aspect-video bg-muted rounded-xl mb-6 overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-left">
                <span className="text-xs font-medium text-primary-foreground bg-foreground/60 px-2 py-1 rounded">
                  15 min
                </span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Watch: The Emeis Transformation
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              A 15-minute documentary featuring interviews with leadership, staff, and families.
            </p>
            <Button variant="outline" asChild>
              <Link to="/about-transformation">
                <Play className="h-4 w-4 mr-2" />
                Watch Full Documentary
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
