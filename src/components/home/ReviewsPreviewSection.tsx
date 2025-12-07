import { Link } from 'react-router-dom';
import { Star, ArrowRight, BadgeCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { reviews, beforeAfterImprovements } from '@/data/mockData';
import { useExperiment } from '@/lib/experiments';

export function ReviewsPreviewSection() {
  const variant = useExperiment('reviews');
  const isVariantB = variant === 'B';

  // Get recent verified reviews
  const recentReviews = reviews
    .filter(r => r.verified && r.year >= 2023)
    .slice(0, 3);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Family Voices"
          title="Verified Reviews"
          description={isVariantB 
            ? "Reviews from 2023-2025, verified through our Family Portal. See the real transformation." 
            : "Hear from families currently using our care tracking system."
          }
        />

        <div className="mt-12 md:mt-16">
          {/* Review Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {recentReviews.map((review) => (
              <div key={review.id} className="card-trust p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-warm-gold fill-warm-gold'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  {review.verified && isVariantB && (
                    <span className="badge-verified">
                      <BadgeCheck className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-foreground mb-4 text-sm line-clamp-4">
                  "{review.content}"
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-foreground">{review.author}</p>
                    <p className="text-muted-foreground text-xs">{review.relationship}</p>
                  </div>
                  {isVariantB && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {review.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Before/After Panel (Variant B only) */}
          {isVariantB && (
            <div className="card-trust p-6 md:p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Improvements Since 2022
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {beforeAfterImprovements.map((item) => (
                  <div key={item.area} className="p-4 bg-secondary/50 rounded-xl">
                    <p className="text-sm font-medium text-foreground mb-2">{item.area}</p>
                    <div className="space-y-1 text-xs">
                      <p className="text-muted-foreground line-through">{item.before}</p>
                      <p className="text-primary font-medium">{item.after}</p>
                    </div>
                    <p className="text-lg font-bold text-primary mt-2">{item.improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/reviews">
                View All Reviews
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
