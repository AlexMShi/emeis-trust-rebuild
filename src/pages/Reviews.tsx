import { useState, useEffect } from 'react';
import { Star, BadgeCheck, Filter, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { reviews, beforeAfterImprovements, Review } from '@/data/mockData';
import { useExperiment } from '@/lib/experiments';
import { events } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const categories = ['All', 'Staff', 'Hygiene', 'Daily tracking', 'Communication'];
const years = [2024, 2023, 2022];

const Reviews = () => {
  const variant = useExperiment('reviews');
  const isVariantB = variant === 'B';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYears, setSelectedYears] = useState<number[]>(isVariantB ? [2024, 2023] : years);
  const [verifiedOnly, setVerifiedOnly] = useState(isVariantB);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviews);
  const [readStartTime] = useState(Date.now());

  // Filter reviews
  useEffect(() => {
    let result = reviews;

    if (selectedCategory !== 'All') {
      result = result.filter(r => r.category === selectedCategory);
    }

    result = result.filter(r => selectedYears.includes(r.year));

    if (verifiedOnly) {
      result = result.filter(r => r.verified);
    }

    setFilteredReviews(result);
    
    events.reviewFilterChange({
      category: selectedCategory,
      years: selectedYears,
      verifiedOnly,
    });
  }, [selectedCategory, selectedYears, verifiedOnly]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent % 25 === 0 && scrollPercent > 0) {
        events.reviewScrollDepth(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track read time on unmount
  useEffect(() => {
    return () => {
      const readTime = Math.round((Date.now() - readStartTime) / 1000);
      events.reviewReadTime(readTime);
    };
  }, [readStartTime]);

  const toggleYear = (year: number) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  const averageRating = (filteredReviews.reduce((acc, r) => acc + r.rating, 0) / filteredReviews.length) || 0;

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Family Voices"
            title="Verified Reviews"
            description="Authentic feedback from families currently using our care tracking system. Filter by category, year, and verification status."
          />

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="h-6 w-6 text-warm-gold fill-warm-gold" />
                <span className="text-3xl font-bold text-foreground">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{filteredReviews.length}</p>
              <p className="text-sm text-muted-foreground">Reviews Shown</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                {filteredReviews.filter(r => r.verified).length}
              </p>
              <p className="text-sm text-muted-foreground">Verified Families</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Reviews */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-trust p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Filters</h3>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Filter */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-3">Year</p>
                  <div className="flex flex-wrap gap-2">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => toggleYear(year)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                          selectedYears.includes(year)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified Toggle */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      verifiedOnly ? "bg-primary" : "bg-muted"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-5 h-5 bg-background rounded-full shadow transition-transform",
                        verifiedOnly ? "translate-x-6" : "translate-x-0.5"
                      )} />
                    </div>
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-foreground">Verified Only</span>
                  </label>
                </div>

                {isVariantB && (
                  <p className="text-xs text-muted-foreground border-t border-border pt-4">
                    Reviews shown are from current families using the care-tracking system.
                  </p>
                )}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-3">
              {/* Before/After Panel (Variant B) */}
              {isVariantB && (
                <div className="card-trust p-6 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Improvements Since 2022</h3>
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

              {/* Reviews Grid */}
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No reviews match your filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedYears(years);
                      setVerifiedOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="card-trust p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-semibold text-primary">
                              {review.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{review.author}</p>
                            <p className="text-sm text-muted-foreground">{review.relationship}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {review.verified && isVariantB && (
                            <span className="badge-verified">
                              <BadgeCheck className="h-3 w-3" />
                              Verified Family
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{review.year}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < review.rating
                                ? "text-warm-gold fill-warm-gold"
                                : "text-muted"
                            )}
                          />
                        ))}
                      </div>

                      <p className="text-foreground mb-4">"{review.content}"</p>

                      <span className="inline-block text-xs font-medium px-3 py-1 bg-secondary rounded-full text-muted-foreground">
                        {review.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
