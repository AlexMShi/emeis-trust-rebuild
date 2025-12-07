# A/B Testing Documentation

## Overview

The Emeis website includes a lightweight A/B testing framework that:
- Assigns visitors to experiment variants
- Persists assignments in localStorage
- Allows URL param overrides for testing
- Tracks variant assignments in analytics

## Current Experiments

### 1. Transparency Experience (`exp_transparency`)

**Hypothesis**: Interactive previews with micro-surveys and multiple CTAs will increase engagement and trust compared to static information blocks.

| Variant | Description |
|---------|-------------|
| **A** (Control) | Static information blocks about transparency features |
| **B** (Treatment) | Interactive previews + micro-survey + additional CTAs |

**Implementation Locations**:
- Homepage: `TransparencyPreviewSection.tsx`
- Transparency page: `Transparency.tsx`

**Differences in Variant B**:
- Additional "Book Your Visit Today" CTA after preview cards
- Micro-survey modal asking "Did this page increase your trust?" (1-5 scale)
- More prominent interactive elements

**KPIs to Track**:
- `book_visit_click` rate per variant
- `trust_survey_submit` responses (Variant B only)
- `tour_open` and `demo_tab_click` engagement
- Time on page

---

### 2. Reviews Credibility (`exp_reviews`)

**Hypothesis**: Verified badges, date filters defaulting to recent years, and before/after improvement panels will increase perceived credibility.

| Variant | Description |
|---------|-------------|
| **A** (Control) | Simple review list, all years shown, no badges |
| **B** (Treatment) | Verified badges, 2023-2025 default filter, categories, before/after panel |

**Implementation Locations**:
- Homepage: `ReviewsPreviewSection.tsx`
- Reviews page: `Reviews.tsx`

**Differences in Variant B**:
- "Verified Family" badges on reviews from verified users
- Year filter defaults to 2023-2025 (post-transformation)
- Category filter chips for Staff/Hygiene/Daily tracking/Communication
- "Before & After Improvements" panel showing metrics
- Verified-only toggle defaults to ON

**KPIs to Track**:
- `review_filter_change` interactions
- `review_scroll_depth` (engagement depth)
- `review_read_time` (time spent reading)
- Downstream `book_visit_click` conversion

---

## Technical Implementation

### URL Parameters

Force specific variants by adding URL parameters:

```
https://emeis.care/?exp_transparency=B&exp_reviews=B
```

### localStorage Persistence

Assignments are stored in:
```javascript
localStorage.getItem('emeis_experiment_variants')
// Returns: { "transparency": "A", "reviews": "B" }
```

### Debug Panel

Enable the debug panel by adding `?debug=1` to any URL:

```
https://emeis.care/?debug=1
```

Features:
- View current variant assignments
- Switch variants in real-time
- Reset all experiments
- Link to analytics debug page

### Using Experiments in Code

```typescript
import { useExperiment } from '@/lib/experiments';

function MyComponent() {
  const variant = useExperiment('transparency');
  
  if (variant === 'B') {
    return <InteractiveVersion />;
  }
  return <StaticVersion />;
}
```

### Analytics Integration

Experiment assignments are automatically included in all tracked events:

```javascript
{
  event: "book_visit_click",
  experimentVariants: {
    "transparency": "A",
    "reviews": "B"
  },
  // ...other properties
}
```

---

## Analysis Guidelines

### Sample Size Calculation

For 95% confidence with 80% power:
- Baseline conversion: ~5% book_visit_click
- Minimum detectable effect: 20% relative lift
- Required sample: ~3,000 visitors per variant

### Statistical Significance

Use chi-squared test for conversion rates:

```python
from scipy.stats import chi2_contingency

# Example: comparing book_visit_click rates
contingency = [[clicks_A, non_clicks_A], [clicks_B, non_clicks_B]]
chi2, p_value, dof, expected = chi2_contingency(contingency)

if p_value < 0.05:
    print("Statistically significant difference")
```

### Segmentation

Consider analyzing by:
- Device type (mobile vs desktop)
- Traffic source
- Time of day / day of week
- Geographic region (if applicable)

---

## Adding New Experiments

1. Define the experiment in `src/lib/experiments.ts`:

```typescript
export const experiments: Record<string, Experiment> = {
  // ... existing experiments
  newExperiment: {
    name: 'newExperiment',
    variants: ['A', 'B'],
    defaultVariant: 'A',
    description: 'Description of what this tests',
  },
};
```

2. Use the hook in components:

```typescript
const variant = useExperiment('newExperiment');
```

3. Document the experiment in this file.

4. Add relevant analytics events.

---

## Ending Experiments

When an experiment concludes:

1. Analyze results and determine winner
2. Remove experiment code, keeping winning variant
3. Update this documentation
4. Consider running follow-up experiments

---

## Current Status

| Experiment | Status | Start Date | End Date | Winner |
|------------|--------|------------|----------|--------|
| transparency | Active | - | - | TBD |
| reviews | Active | - | - | TBD |
