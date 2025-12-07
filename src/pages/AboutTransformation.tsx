import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle, Users, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { timelineEvents } from '@/data/mockData';

const AboutTransformation = () => {
  return (
    <>
      {/* Hero with Documentary */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
                The Emeis Transformation
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                In 2022, Emeis faced its darkest hour. Public trust was shattered, 
                and families questioned everything. Rather than hide, new leadership 
                chose radical transparency. This is the story of rebuilding trust, 
                one verifiable action at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" asChild>
                  <Link to="/transparency#book-visit">
                    <Calendar className="h-5 w-5" />
                    Book a Visit
                  </Link>
                </Button>
                <Button variant="hero-outline">
                  <Play className="h-5 w-5" />
                  Watch Documentary
                </Button>
              </div>
            </div>

            {/* Documentary Video Placeholder */}
            <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="/placeholder.svg"
                alt="Documentary preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                <div className="p-5 rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                  <Play className="h-10 w-10" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-lg text-sm font-medium text-foreground">
                  15 min
                </span>
                <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-lg text-sm font-medium text-primary-foreground">
                  2024 Documentary
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Timeline */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeader
            title="The Journey of Change"
            description="A detailed look at how Emeis transformed from controversy to transparency."
          />

          <div className="mt-12 max-w-4xl mx-auto space-y-12">
            {/* 2022: Acknowledgment */}
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3">
                <div className="sticky top-24">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-soft-coral/10 text-soft-coral rounded-xl font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    2022
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mt-4">
                    Honest Acknowledgment
                  </h3>
                </div>
              </div>
              <div className="md:col-span-9 space-y-6">
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">New Leadership Takes Responsibility</h4>
                  <p className="text-muted-foreground">
                    Rather than deflect or minimize, new CEO Marie Dubois publicly acknowledged 
                    every failing uncovered in the 2022 investigations. "Denial helps no one," 
                    she stated in her first press conference. "Our residents and families 
                    deserve complete honesty about what went wrong."
                  </p>
                </div>
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">Comprehensive Audit</h4>
                  <p className="text-muted-foreground">
                    An independent audit of all 200+ facilities was commissioned. Results were 
                    published in full—including the uncomfortable findings. This unprecedented 
                    transparency became the foundation for everything that followed.
                  </p>
                </div>
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">Family Advisory Council</h4>
                  <p className="text-muted-foreground">
                    A council of family members was established to provide direct input into 
                    transformation plans. Their voices shaped every policy change that followed.
                  </p>
                </div>
              </div>
            </div>

            {/* 2023: Change */}
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3">
                <div className="sticky top-24">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-calm-blue/10 text-calm-blue rounded-xl font-semibold">
                    <MessageCircle className="h-5 w-5" />
                    2023
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mt-4">
                    Evidence of Change
                  </h3>
                </div>
              </div>
              <div className="md:col-span-9 space-y-6">
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">Care Tracking System Launch</h4>
                  <p className="text-muted-foreground">
                    The revolutionary care tracking system went live, giving families real-time 
                    visibility into their loved one's daily care. Meals, medications, activities, 
                    and communications—all documented and accessible 24/7.
                  </p>
                </div>
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">200+ Hour Staff Training Program</h4>
                  <p className="text-muted-foreground">
                    Every staff member completed comprehensive retraining. Not just protocols, 
                    but values. Empathy, communication, and accountability became core 
                    competencies, not optional soft skills.
                  </p>
                </div>
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">Quarterly Independent Audits</h4>
                  <p className="text-muted-foreground">
                    Moving from annual internal reviews to quarterly external audits. 
                    Results published openly, with action plans for any identified issues. 
                    No more marking our own homework.
                  </p>
                </div>
              </div>
            </div>

            {/* 2024: Voices */}
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3">
                <div className="sticky top-24">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-semibold">
                    <Users className="h-5 w-5" />
                    2024
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mt-4">
                    Family & Staff Voices
                  </h3>
                </div>
              </div>
              <div className="md:col-span-9 space-y-6">
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">2,000+ Verified Family Reviews</h4>
                  <p className="text-muted-foreground">
                    Our verified review system now includes feedback from over 2,000 families. 
                    Not cherry-picked testimonials, but authentic voices from people using 
                    our care tracking system daily.
                  </p>
                </div>
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">40% Improvement in Staff Retention</h4>
                  <p className="text-muted-foreground">
                    Happy staff provide better care. Investment in training, fair compensation, 
                    and genuine respect has transformed our workforce. Staff now stay longer 
                    and care more deeply.
                  </p>
                </div>
                <div className="card-trust p-6">
                  <h4 className="font-semibold text-foreground mb-2">Sustained Quality Improvements</h4>
                  <p className="text-muted-foreground">
                    Independent audits confirm sustained improvements across all key metrics. 
                    This isn't a one-time fix—it's a permanent culture change. The journey 
                    continues, with transparency as our guide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary/5">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            See the Transformation Yourself
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Words are easy. Actions are what matter. Visit us, meet our staff, 
            talk to current families, and judge for yourself.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/transparency#book-visit">
                <Calendar className="h-5 w-5" />
                Book a Visit
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/reviews">
                Read Family Reviews
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTransformation;
