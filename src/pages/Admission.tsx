import { useState } from 'react';
import { FileText, Heart, Wallet, ClipboardList, Check, Download, Lock, Shield, ArrowRight, Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { checklistItems, ChecklistItem } from '@/data/mockData';
import { events } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'identity', label: 'Identity Documents', icon: FileText, color: 'text-calm-blue' },
  { id: 'medical', label: 'Medical Information', icon: Heart, color: 'text-soft-coral' },
  { id: 'financial', label: 'Financial Paperwork', icon: Wallet, color: 'text-warm-gold' },
  { id: 'additional', label: 'Additional Forms', icon: ClipboardList, color: 'text-primary' },
];

const Admission = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showSecurityPrompt, setShowSecurityPrompt] = useState(false);
  const [securityResponse, setSecurityResponse] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);

    // Calculate and track progress
    const progress = Math.round((newChecked.size / checklistItems.length) * 100);
    const item = checklistItems.find(i => i.id === itemId);
    events.checklistProgress(progress, item?.category);
  };

  const handleStartAdmission = () => {
    events.admissionStart();
    // In a real app, this would navigate to the actual admission form
  };

  const handlePaymentView = () => {
    events.paymentView();
    setShowSecurityPrompt(true);
  };

  const handleSecurityResponse = (response: string) => {
    setSecurityResponse(response);
    events.paymentTrustPromptSubmit(response);
    setTimeout(() => setShowSecurityPrompt(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const progress = Math.round((checkedItems.size / checklistItems.length) * 100);
  const requiredItems = checklistItems.filter(i => i.required);
  const requiredComplete = requiredItems.filter(i => checkedItems.has(i.id)).length;

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-hero no-print">
        <div className="container-wide text-center">
          <SectionHeader
            eyebrow="Step by Step"
            title="Admission Made Clear"
            description="Our guided checklist helps you prepare everything you need. No hidden requirements, no surprises."
          />

          {/* Progress Overview */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="card-trust p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Your Progress
                </span>
                <span className="text-2xl font-bold text-primary">{progress}%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {requiredComplete} of {requiredItems.length} required items completed
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              Print Checklist
            </Button>
            <Button variant="hero" onClick={handleStartAdmission}>
              Start Admission
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              const categoryItems = checklistItems.filter(i => i.category === category.id);
              const categoryComplete = categoryItems.filter(i => checkedItems.has(i.id)).length;

              return (
                <div key={category.id} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={cn("h-6 w-6", category.color)} />
                    <h3 className="text-xl font-semibold text-foreground">
                      {category.label}
                    </h3>
                    <span className="text-sm text-muted-foreground ml-auto">
                      {categoryComplete}/{categoryItems.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                          checkedItems.has(item.id)
                            ? "bg-primary/5 border-primary/20"
                            : "bg-card border-border hover:border-primary/30"
                        )}
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className={cn(
                          "mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                          checkedItems.has(item.id)
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground"
                        )}>
                          {checkedItems.has(item.id) && <Check className="h-4 w-4" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn(
                              "font-medium",
                              checkedItems.has(item.id) 
                                ? "text-muted-foreground line-through" 
                                : "text-foreground"
                            )}>
                              {item.title}
                              {item.required && (
                                <span className="ml-2 text-xs text-destructive">*Required</span>
                              )}
                            </p>
                            <span className="text-xs text-muted-foreground shrink-0">
                              ~{item.estimatedTime}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Security Section */}
      <section className="section-padding bg-secondary/30 no-print">
        <div className="container-narrow">
          <SectionHeader
            eyebrow="Secure Payment"
            title="Payment Security"
            description="All financial transactions are protected with bank-level encryption."
          />

          <div className="mt-8 card-trust p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">256-bit SSL Encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    Your data is encrypted with the same technology used by major banks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">PCI DSS Compliant</h4>
                  <p className="text-sm text-muted-foreground">
                    We meet the highest payment card industry security standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Mock Payment Form */}
            <div className="p-6 bg-secondary/50 rounded-xl">
              <h4 className="font-semibold text-foreground mb-4">Payment Details (Demo)</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="•••• •••• •••• ••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background"
                    disabled
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Lock className="h-4 w-4 text-primary" />
                <span>Secure Payment — Encrypted Transaction</span>
              </div>

              <Button variant="hero" className="w-full" onClick={handlePaymentView}>
                <Lock className="h-4 w-4" />
                View Payment Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Trust Prompt Modal */}
      {showSecurityPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 no-print">
          <div className="bg-card rounded-2xl shadow-elevated p-6 max-w-sm w-full animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Question</h3>
              <button onClick={() => setShowSecurityPrompt(false)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {securityResponse ? (
              <p className="text-center text-primary font-medium py-4">
                Thank you for your feedback!
              </p>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">
                  Do the security features displayed make you feel more confident about payment?
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleSecurityResponse('no')}
                  >
                    Not Really
                  </Button>
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => handleSecurityResponse('yes')}
                  >
                    Yes, Definitely
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Admission;
