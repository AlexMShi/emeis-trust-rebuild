import { Link } from 'react-router-dom';
import { FileText, Phone, MessageSquare, ShieldCheck, ArrowRight, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { loyaltyFeatures } from '@/data/mockData';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Phone,
  MessageSquare,
  ShieldCheck,
};

export function LoyaltySection() {
  return (
    <section className="section-padding bg-gradient-trust">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Family Trust Loop"
          title="Stay Connected, Stay Informed"
          description="Our commitment to families doesn't end at admission. The Family Trust Loop keeps you involved every step of the way."
        />

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loyaltyFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon] || FileText;
            return (
              <div
                key={feature.id}
                className="card-trust p-6 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button variant="hero" asChild>
            <Link to="/family-portal">
              Explore Family Portal
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
