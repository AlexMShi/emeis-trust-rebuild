import { useState } from 'react';
import { Settings, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { experiments, getAllVariants, setVariant, resetExperiments } from '@/lib/experiments';
import { cn } from '@/lib/utils';

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [variants, setVariants] = useState(getAllVariants());

  const handleVariantChange = (expName: string, variant: string) => {
    setVariant(expName, variant);
    setVariants(getAllVariants());
  };

  const handleReset = () => {
    resetExperiments();
    setVariants(getAllVariants());
    window.location.reload();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 right-4 md:bottom-4 z-50 p-3 rounded-full shadow-lg transition-colors",
          "bg-foreground text-background hover:bg-foreground/90"
        )}
        aria-label="Debug experiments"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="fixed bottom-32 right-4 md:bottom-16 z-50 w-80 bg-card border border-border rounded-2xl shadow-elevated animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">A/B Experiments</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close">
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {Object.values(experiments).map((exp) => (
              <div key={exp.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {exp.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Current: {variants[exp.name]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {exp.description}
                </p>
                <div className="flex gap-2">
                  {exp.variants.map((variant) => (
                    <Button
                      key={variant}
                      size="sm"
                      variant={variants[exp.name] === variant ? 'default' : 'outline'}
                      onClick={() => handleVariantChange(exp.name, variant)}
                    >
                      Variant {variant}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset All & Reload
              </Button>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                URL params: <code className="bg-muted px-1 rounded">?exp_transparency=B&exp_reviews=B</code>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <a href="/debug/analytics" className="text-primary hover:underline">
                  View Analytics →
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
