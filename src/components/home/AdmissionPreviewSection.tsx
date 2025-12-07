import { Link } from 'react-router-dom';
import { FileText, Heart, Wallet, ClipboardList, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { checklistItems } from '@/data/mockData';

const categories = [
  { id: 'identity', label: 'Identity Documents', icon: FileText, color: 'bg-calm-blue/10 text-calm-blue' },
  { id: 'medical', label: 'Medical Information', icon: Heart, color: 'bg-soft-coral/10 text-soft-coral' },
  { id: 'financial', label: 'Financial Paperwork', icon: Wallet, color: 'bg-warm-gold/10 text-warm-gold' },
  { id: 'additional', label: 'Additional Forms', icon: ClipboardList, color: 'bg-primary/10 text-primary' },
];

export function AdmissionPreviewSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <SectionHeader
              eyebrow="Simple Process"
              title="Admission Made Clear"
              description="No surprises, no hidden steps. Our guided checklist helps you prepare everything you need for a smooth admission."
              align="left"
            />

            {/* Categories Preview */}
            <div className="mt-8 space-y-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const items = checklistItems.filter(item => item.category === category.id);
                const requiredCount = items.filter(item => item.required).length;
                
                return (
                  <div
                    key={category.id}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div className={`p-2.5 rounded-lg ${category.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{category.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {requiredCount} required items
                      </p>
                    </div>
                    <Check className="h-5 w-5 text-muted-foreground" />
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button variant="hero" asChild>
                <Link to="/admission">
                  Start Admission Process
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="card-trust p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Admission Progress</h3>
                <span className="text-2xl font-bold text-primary">25%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-3 bg-secondary rounded-full overflow-hidden mb-6">
                <div className="h-full w-1/4 bg-primary rounded-full transition-all duration-500" />
              </div>

              {/* Sample Items */}
              <div className="space-y-3">
                {checklistItems.slice(0, 4).map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      index === 0 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'border-muted-foreground'
                    }`}>
                      {index === 0 && <Check className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${index === 0 ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.estimatedTime}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Average completion time: 45 minutes
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
