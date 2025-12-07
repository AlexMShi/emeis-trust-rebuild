import { Lock, Shield, CreditCard, CheckCircle } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Bank-Level Encryption',
    description: '256-bit SSL encryption protects all transactions',
  },
  {
    icon: Shield,
    title: 'Certified Processors',
    description: 'PCI DSS compliant payment partners',
  },
  {
    icon: CreditCard,
    title: 'Secure Direct Debit',
    description: 'Safe automatic payment setup through your bank',
  },
  {
    icon: CheckCircle,
    title: 'Transparent Billing',
    description: 'Detailed invoices with no hidden fees',
  },
];

export function PaymentSecuritySection() {
  return (
    <section className="py-12 bg-primary/5 border-y border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Badge */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                Secure Payment
              </p>
              <p className="text-lg font-display font-semibold text-foreground">
                Encrypted Transaction
              </p>
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
