import { useState } from 'react';
import { FileText, Phone, MessageSquare, ShieldCheck, Users, Star, Gift, ArrowRight, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { loyaltyFeatures } from '@/data/mockData';
import { events } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Phone,
  MessageSquare,
  ShieldCheck,
};

const FamilyPortal = () => {
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [showQAModal, setShowQAModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleWeeklySummaryView = () => {
    events.portalWeeklySummaryView();
  };

  const handleCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    events.checkinRequestSubmit();
    setSubmitted('checkin');
    setTimeout(() => {
      setShowCheckinModal(false);
      setSubmitted(null);
    }, 2000);
  };

  const handleQASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    events.qaSubmit();
    setSubmitted('qa');
    setTimeout(() => {
      setShowQAModal(false);
      setSubmitted(null);
    }, 2000);
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    events.referralSubmit();
    setSubmitted('referral');
    setTimeout(() => {
      setShowReferralModal(false);
      setSubmitted(null);
    }, 2000);
  };

  const handleReviewIntent = () => {
    events.reviewIntentClick();
  };

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-wide text-center">
          <SectionHeader
            eyebrow="Family Trust Loop"
            title="Your Connection to Care"
            description="Stay informed, stay connected, stay confident. The Family Portal keeps you involved in every aspect of your loved one's care."
          />

          {/* Login Demo */}
          <div className="mt-8 max-w-sm mx-auto">
            <div className="card-trust p-6">
              <h3 className="font-semibold text-foreground mb-4">Family Portal Login</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button variant="hero" className="w-full">
                  Sign In (Demo)
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                This is a demo. In production, you would receive login credentials upon admission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Loop Features */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeader
            title="Family Trust Loop Features"
            description="Everything you need to stay connected and informed about your loved one's care."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loyaltyFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon] || FileText;
              return (
                <div
                  key={feature.id}
                  className="card-trust p-6"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-4">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {feature.description}
                  </p>
                  {feature.id === 'weekly-summary' && (
                    <Button variant="outline" size="sm" onClick={handleWeeklySummaryView}>
                      View Sample
                    </Button>
                  )}
                  {feature.id === 'nurse-checkin' && (
                    <Button variant="outline" size="sm" onClick={() => setShowCheckinModal(true)}>
                      Request Check-in
                    </Button>
                  )}
                  {feature.id === 'qa-feature' && (
                    <Button variant="outline" size="sm" onClick={() => setShowQAModal(true)}>
                      Ask a Question
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Safety Banner */}
          <div className="mt-12 card-trust p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Weekly Safety Checks Completed</h3>
                <p className="text-sm text-muted-foreground">
                  All safety protocols verified for this week. Last check: Today at 09:00
                </p>
              </div>
              <Check className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Verified Advocacy & Referral Loop */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Advocacy Program"
            title="Verified Advocacy & Referral Loop"
            description="Happy families help other families. Our advocacy program rewards you for sharing your positive experience."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* How it works */}
            <div className="card-trust p-6">
              <div className="inline-flex p-3 rounded-xl bg-warm-gold/10 text-warm-gold mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Satisfaction Signals</h3>
              <p className="text-sm text-muted-foreground">
                When we detect positive engagement—regular portal usage, high care ratings—we invite you to share your experience.
              </p>
            </div>

            <div className="card-trust p-6">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Verified Badge</h3>
              <p className="text-sm text-muted-foreground">
                Reviews from active Family Portal users receive a "Verified Family" badge, building trust for prospective families.
              </p>
            </div>

            <div className="card-trust p-6">
              <div className="inline-flex p-3 rounded-xl bg-calm-blue/10 text-calm-blue mb-4">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Referral Benefits</h3>
              <p className="text-sm text-muted-foreground">
                Refer a family and both receive benefits when they join—a thank you for spreading trust.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={handleReviewIntent}>
              <Star className="h-4 w-4" />
              Write a Review
            </Button>
            <Button variant="hero" onClick={() => setShowReferralModal(true)}>
              <Gift className="h-4 w-4" />
              Refer a Family
            </Button>
          </div>
        </div>
      </section>

      {/* Check-in Request Modal */}
      {showCheckinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
          <div className="bg-card rounded-2xl shadow-elevated p-6 max-w-md w-full animate-scale-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Request a Check-in</h3>
                <p className="text-muted-foreground text-sm">A nurse will call you within 24 hours</p>
              </div>
              <button onClick={() => setShowCheckinModal(false)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {submitted === 'checkin' ? (
              <div className="text-center py-8">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <p className="font-semibold text-foreground">Check-in Requested!</p>
                <p className="text-sm text-muted-foreground">We'll call you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleCheckinSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Preferred Call Time
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Morning (9am - 12pm)</option>
                    <option>Afternoon (12pm - 5pm)</option>
                    <option>Evening (5pm - 8pm)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Topics to Discuss (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Any specific concerns or questions?"
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full">
                  Submit Request
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Q&A Modal */}
      {showQAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
          <div className="bg-card rounded-2xl shadow-elevated p-6 max-w-md w-full animate-scale-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Ask a Question</h3>
                <p className="text-muted-foreground text-sm">Response within 4 hours guaranteed</p>
              </div>
              <button onClick={() => setShowQAModal(false)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {submitted === 'qa' ? (
              <div className="text-center py-8">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <p className="font-semibold text-foreground">Question Submitted!</p>
                <p className="text-sm text-muted-foreground">You'll receive a response within 4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleQASubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Your Question
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="What would you like to know about your loved one's care?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Category
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>General Care</option>
                    <option>Medical / Health</option>
                    <option>Activities</option>
                    <option>Nutrition</option>
                    <option>Other</option>
                  </select>
                </div>
                <Button type="submit" variant="hero" className="w-full">
                  Submit Question
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
          <div className="bg-card rounded-2xl shadow-elevated p-6 max-w-md w-full animate-scale-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Refer a Family</h3>
                <p className="text-muted-foreground text-sm">Share the gift of quality care</p>
              </div>
              <button onClick={() => setShowReferralModal(false)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {submitted === 'referral' ? (
              <div className="text-center py-8">
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <p className="font-semibold text-foreground">Referral Submitted!</p>
                <p className="text-sm text-muted-foreground">We'll reach out to them soon.</p>
              </div>
            ) : (
              <form onSubmit={handleReferralSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Their Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Family member's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Their Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="their@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Their Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Add a personal note..."
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full">
                  <Gift className="h-4 w-4" />
                  Send Referral
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FamilyPortal;
