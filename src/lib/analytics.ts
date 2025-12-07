// Simple analytics event logger for Emeis website
// Logs to console and localStorage for debugging

export interface AnalyticsEvent {
  id: string;
  event: string;
  properties?: Record<string, unknown>;
  timestamp: string;
  page: string;
  experimentVariants?: Record<string, string>;
}

const STORAGE_KEY = 'emeis_analytics_events';
const MAX_EVENTS = 1000;

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Get current experiment variants
function getExperimentVariants(): Record<string, string> {
  const variants: Record<string, string> = {};
  
  // Get from localStorage
  const storedVariants = localStorage.getItem('emeis_experiment_variants');
  if (storedVariants) {
    try {
      Object.assign(variants, JSON.parse(storedVariants));
    } catch (e) {
      console.error('Error parsing experiment variants:', e);
    }
  }
  
  return variants;
}

// Track an event
export function trackEvent(event: string, properties?: Record<string, unknown>): void {
  const analyticsEvent: AnalyticsEvent = {
    id: generateId(),
    event,
    properties,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    experimentVariants: getExperimentVariants(),
  };

  // Log to console
  console.log('[Analytics]', analyticsEvent);

  // Store in localStorage
  try {
    const storedEvents = localStorage.getItem(STORAGE_KEY);
    const events: AnalyticsEvent[] = storedEvents ? JSON.parse(storedEvents) : [];
    
    // Add new event
    events.push(analyticsEvent);
    
    // Keep only last MAX_EVENTS
    const trimmedEvents = events.slice(-MAX_EVENTS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedEvents));
  } catch (e) {
    console.error('Error storing analytics event:', e);
  }
}

// Get all stored events
export function getStoredEvents(): AnalyticsEvent[] {
  try {
    const storedEvents = localStorage.getItem(STORAGE_KEY);
    return storedEvents ? JSON.parse(storedEvents) : [];
  } catch (e) {
    console.error('Error reading analytics events:', e);
    return [];
  }
}

// Clear all stored events
export function clearStoredEvents(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Export events as JSON string
export function exportEventsAsJson(): string {
  return JSON.stringify(getStoredEvents(), null, 2);
}

// Common event helpers
export const events = {
  // Navigation
  pageView: (page: string) => trackEvent('page_view', { page }),
  ctaClick: (ctaName: string, location: string) => trackEvent('cta_click', { ctaName, location }),
  
  // Book a Visit
  bookVisitClick: (location: string) => trackEvent('book_visit_click', { location }),
  bookVisitSubmit: () => trackEvent('book_visit_submit'),
  
  // Transparency & Visits
  tourOpen: () => trackEvent('tour_open'),
  demoTabClick: (tab: string) => trackEvent('demo_tab_click', { tab }),
  testimonialPlay: (testimonialId: string) => trackEvent('testimonial_play', { testimonialId }),
  trustSurveySubmit: (rating: number) => trackEvent('trust_survey_submit', { rating }),
  
  // Reviews
  reviewFilterChange: (filters: Record<string, unknown>) => trackEvent('review_filter_change', { filters }),
  reviewScrollDepth: (depth: number) => trackEvent('review_scroll_depth', { depth }),
  reviewReadTime: (seconds: number) => trackEvent('review_read_time', { seconds }),
  
  // Admission
  checklistProgress: (progress: number, category?: string) => trackEvent('checklist_progress', { progress, category }),
  admissionStart: () => trackEvent('admission_start'),
  paymentView: () => trackEvent('payment_view'),
  paymentTrustPromptSubmit: (response: string) => trackEvent('payment_trust_prompt_submit', { response }),
  
  // Family Portal
  portalWeeklySummaryView: () => trackEvent('portal_weekly_summary_view'),
  checkinRequestSubmit: () => trackEvent('checkin_request_submit'),
  qaSubmit: () => trackEvent('qa_submit'),
  referralSubmit: () => trackEvent('referral_submit'),
  reviewIntentClick: () => trackEvent('review_intent_click'),
  
  // A/B Testing
  experimentAssigned: (experimentName: string, variant: string) => 
    trackEvent('experiment_assigned', { experimentName, variant }),
};
