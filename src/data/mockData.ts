// Mock data for the Emeis website

export interface Review {
  id: string;
  author: string;
  relationship: string;
  year: number;
  category: 'Staff' | 'Hygiene' | 'Daily tracking' | 'Communication';
  rating: number;
  content: string;
  verified: boolean;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChecklistItem {
  id: string;
  category: 'identity' | 'medical' | 'financial' | 'additional';
  title: string;
  description: string;
  estimatedTime: string;
  required: boolean;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'acknowledgment' | 'change' | 'voices';
}

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Marie D.',
    relationship: 'Daughter of resident',
    year: 2024,
    category: 'Daily tracking',
    rating: 5,
    content: 'The daily care tracking app has transformed how we stay connected with my mother\'s care. We receive updates on meals, activities, and health checks every day.',
    verified: true,
  },
  {
    id: '2',
    author: 'Pierre L.',
    relationship: 'Son of resident',
    year: 2024,
    category: 'Communication',
    rating: 5,
    content: 'The weekly summaries and proactive nurse check-ins have given our family peace of mind. We feel truly informed and involved in my father\'s care.',
    verified: true,
  },
  {
    id: '3',
    author: 'Sophie M.',
    relationship: 'Granddaughter of resident',
    year: 2023,
    category: 'Staff',
    rating: 4,
    content: 'The staff training improvements since 2022 are noticeable. Caregivers are more attentive and communicative than ever before.',
    verified: true,
  },
  {
    id: '4',
    author: 'Jean-Paul R.',
    relationship: 'Son of resident',
    year: 2024,
    category: 'Hygiene',
    rating: 5,
    content: 'Cleanliness standards have dramatically improved. Regular hygiene audits and transparent reporting give us confidence in the facility.',
    verified: true,
  },
  {
    id: '5',
    author: 'Catherine B.',
    relationship: 'Daughter of resident',
    year: 2023,
    category: 'Daily tracking',
    rating: 4,
    content: 'Being able to see my mother\'s daily activities and meals in real-time has been invaluable for our family\'s peace of mind.',
    verified: true,
  },
  {
    id: '6',
    author: 'Michel T.',
    relationship: 'Husband of resident',
    year: 2024,
    category: 'Communication',
    rating: 5,
    content: 'The 1-click Q&A feature is fantastic. I always receive responses within the promised timeframe, usually within hours.',
    verified: true,
  },
  {
    id: '7',
    author: 'Anne-Marie G.',
    relationship: 'Daughter of resident',
    year: 2022,
    category: 'Staff',
    rating: 3,
    content: 'The transition period was challenging, but I appreciate the honest acknowledgment of past issues and commitment to improvement.',
    verified: true,
  },
  {
    id: '8',
    author: 'François H.',
    relationship: 'Son of resident',
    year: 2024,
    category: 'Hygiene',
    rating: 5,
    content: 'The 360° virtual tours and regular facility updates show a genuine commitment to transparency that wasn\'t there before.',
    verified: true,
  },
  {
    id: '9',
    author: 'Isabelle C.',
    relationship: 'Daughter of resident',
    year: 2023,
    category: 'Staff',
    rating: 4,
    content: 'New management has brought a culture of accountability. Staff members are now properly trained and genuinely caring.',
    verified: true,
  },
  {
    id: '10',
    author: 'Robert V.',
    relationship: 'Son of resident',
    year: 2024,
    category: 'Daily tracking',
    rating: 5,
    content: 'The medication tracking feature gives us real-time visibility into my father\'s care. No more wondering if he received his treatments.',
    verified: true,
  },
];

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'What changed since 2022?',
    answer: 'Since 2022, Emeis has undergone a complete transformation under new management. We\'ve implemented transparent care tracking, enhanced staff training programs, independent quality audits, and created direct communication channels between families and caregivers. Every facility now undergoes regular third-party inspections with publicly available results.',
  },
  {
    id: '2',
    question: 'How do you verify reviews?',
    answer: 'All reviews displaying the "Verified Family" badge come from families currently using our care-tracking system. We verify their identity through our Family Portal login and confirm their loved one is an active resident. This ensures authentic feedback from real families.',
  },
  {
    id: '3',
    question: 'How does care tracking work?',
    answer: 'Our digital care tracking system records all daily activities including meals, medication administration, hygiene care, and social activities. Families receive real-time updates through the Family Portal app, plus weekly comprehensive summaries. All data is securely stored and accessible 24/7.',
  },
  {
    id: '4',
    question: 'How do I book a visit?',
    answer: 'You can book a visit directly through our website by clicking "Book a Visit" or calling our dedicated family services line. We offer guided tours, 360° virtual tours, and the option to meet with care staff and current families. Same-week appointments are typically available.',
  },
  {
    id: '5',
    question: 'What documents do I need for admission?',
    answer: 'The admission process requires identity documents (ID, birth certificate), medical information (recent assessments, medication lists, physician contacts), financial paperwork (income documentation, insurance details), and additional forms we provide. Our guided checklist helps you prepare everything step by step.',
  },
  {
    id: '6',
    question: 'How is payment secured?',
    answer: 'All payments are processed through bank-level encrypted systems. We partner with certified payment processors and never store sensitive financial data on our servers. You\'ll receive detailed invoices and can set up secure automatic payments through your bank.',
  },
  {
    id: '7',
    question: 'How can families communicate with staff?',
    answer: 'Families have multiple communication channels: direct messaging through the Family Portal, scheduled video calls with caregivers, proactive nurse check-ins, and a 1-click Q&A feature with guaranteed response times. You can also request additional check-ins anytime.',
  },
  {
    id: '8',
    question: 'How do you handle complaints?',
    answer: 'We take every concern seriously. Complaints can be submitted through the Family Portal, email, or phone. Each is assigned to a dedicated case manager with response within 24 hours. We track resolution times and satisfaction publicly as part of our transparency commitment.',
  },
];

export const checklistItems: ChecklistItem[] = [
  // Identity Documents
  {
    id: 'id-1',
    category: 'identity',
    title: 'Valid Government ID',
    description: 'Passport or national identity card of the future resident',
    estimatedTime: '5 min',
    required: true,
  },
  {
    id: 'id-2',
    category: 'identity',
    title: 'Birth Certificate',
    description: 'Official birth certificate or certified copy',
    estimatedTime: '5 min',
    required: true,
  },
  {
    id: 'id-3',
    category: 'identity',
    title: 'Family Contact Information',
    description: 'Primary contact details and emergency contacts',
    estimatedTime: '10 min',
    required: true,
  },
  // Medical Information
  {
    id: 'med-1',
    category: 'medical',
    title: 'Recent Medical Assessment',
    description: 'Medical evaluation from the past 3 months',
    estimatedTime: '15 min',
    required: true,
  },
  {
    id: 'med-2',
    category: 'medical',
    title: 'Current Medication List',
    description: 'Complete list of medications with dosages',
    estimatedTime: '10 min',
    required: true,
  },
  {
    id: 'med-3',
    category: 'medical',
    title: 'Physician Contact',
    description: 'Primary care physician contact information',
    estimatedTime: '5 min',
    required: true,
  },
  {
    id: 'med-4',
    category: 'medical',
    title: 'Medical History Summary',
    description: 'Key health conditions and allergies',
    estimatedTime: '15 min',
    required: true,
  },
  // Financial Paperwork
  {
    id: 'fin-1',
    category: 'financial',
    title: 'Income Documentation',
    description: 'Pension statements or income verification',
    estimatedTime: '10 min',
    required: true,
  },
  {
    id: 'fin-2',
    category: 'financial',
    title: 'Insurance Information',
    description: 'Health insurance and supplemental coverage details',
    estimatedTime: '10 min',
    required: true,
  },
  {
    id: 'fin-3',
    category: 'financial',
    title: 'Bank Details',
    description: 'For direct debit payment setup (optional)',
    estimatedTime: '5 min',
    required: false,
  },
  // Additional Forms
  {
    id: 'add-1',
    category: 'additional',
    title: 'Care Preferences Form',
    description: 'Daily routine, dietary requirements, preferences',
    estimatedTime: '20 min',
    required: true,
  },
  {
    id: 'add-2',
    category: 'additional',
    title: 'Emergency Directives',
    description: 'Advanced care directives if available',
    estimatedTime: '15 min',
    required: false,
  },
  {
    id: 'add-3',
    category: 'additional',
    title: 'Photo for Identification',
    description: 'Recent photo for staff recognition',
    estimatedTime: '5 min',
    required: true,
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2022',
    title: 'Honest Acknowledgment',
    description: 'New leadership openly addressed past failures and committed to transparent transformation. We accepted responsibility and outlined our comprehensive improvement plan.',
    type: 'acknowledgment',
  },
  {
    year: '2023',
    title: 'Evidence of Change',
    description: 'Implemented real-time care tracking, enhanced staff training programs, third-party quality audits, and established the Family Trust Loop communication system.',
    type: 'change',
  },
  {
    year: '2024',
    title: 'Family & Staff Voices',
    description: 'Over 2,000 families now use our verified feedback system. Staff retention improved by 40%. Independent audits confirm sustained quality improvements across all facilities.',
    type: 'voices',
  },
];

export const trustBadges = [
  {
    id: 'audit',
    label: 'Independent Audits',
    icon: 'ClipboardCheck',
  },
  {
    id: 'compliance',
    label: 'Regulatory Compliant',
    icon: 'Shield',
  },
  {
    id: 'secure',
    label: 'Secure Payments',
    icon: 'Lock',
  },
  {
    id: 'verified',
    label: 'Verified Families',
    icon: 'BadgeCheck',
  },
];

export const proofPillars = [
  {
    id: 'transparency',
    title: 'Full Transparency',
    description: '360° virtual tours, real-time updates, and open-door visit policy',
    icon: 'Eye',
  },
  {
    id: 'tracking',
    title: 'Daily Care Tracking',
    description: 'Real-time visibility into meals, medication, and activities',
    icon: 'Activity',
  },
  {
    id: 'voices',
    title: 'Verified Family Voices',
    description: 'Authentic reviews from families using our care system',
    icon: 'Users',
  },
];

export const careTrackingTabs = [
  {
    id: 'meals',
    label: 'Meals',
    icon: 'UtensilsCrossed',
    content: {
      title: 'Daily Nutrition Tracking',
      description: 'See exactly what your loved one ate today, including portion sizes and dietary preferences honored.',
      items: [
        { time: '08:00', item: 'Breakfast: Oatmeal with fruit, orange juice', status: 'completed' },
        { time: '12:30', item: 'Lunch: Grilled fish, vegetables, soup', status: 'completed' },
        { time: '15:00', item: 'Snack: Tea and biscuits', status: 'completed' },
        { time: '18:30', item: 'Dinner: Chicken, mashed potatoes, salad', status: 'upcoming' },
      ],
    },
  },
  {
    id: 'medication',
    label: 'Medication',
    icon: 'Pill',
    content: {
      title: 'Medication Administration',
      description: 'Real-time confirmation when medications are administered by our certified nursing staff.',
      items: [
        { time: '07:30', item: 'Morning medications (4 items)', status: 'completed' },
        { time: '12:00', item: 'Midday vitamin supplement', status: 'completed' },
        { time: '19:00', item: 'Evening medications (2 items)', status: 'upcoming' },
        { time: '21:00', item: 'Night medication', status: 'upcoming' },
      ],
    },
  },
  {
    id: 'hygiene',
    label: 'Hygiene',
    icon: 'Droplets',
    content: {
      title: 'Personal Care & Hygiene',
      description: 'Dignified personal care with detailed but respectful tracking.',
      items: [
        { time: '07:00', item: 'Morning personal care routine', status: 'completed' },
        { time: '10:00', item: 'Mobility assistance and stretching', status: 'completed' },
        { time: '14:00', item: 'Afternoon rest and comfort check', status: 'completed' },
        { time: '20:00', item: 'Evening care routine', status: 'upcoming' },
      ],
    },
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: 'MessageCircle',
    content: {
      title: 'Daily Notes & Updates',
      description: 'Personal notes from caregivers about your loved one\'s day.',
      items: [
        { time: '09:30', item: 'Enjoyed morning activity: painting class', status: 'completed' },
        { time: '11:00', item: 'Video call with family - in great spirits', status: 'completed' },
        { time: '15:30', item: 'Walked in the garden, chatted with friends', status: 'completed' },
        { time: '17:00', item: 'Watching favorite TV program', status: 'in-progress' },
      ],
    },
  },
];

export const loyaltyFeatures = [
  {
    id: 'weekly-summary',
    title: 'Weekly Personalized Summary',
    description: 'Comprehensive care report delivered every Sunday with photos and caregiver notes.',
    icon: 'FileText',
  },
  {
    id: 'nurse-checkin',
    title: 'Proactive Nurse Check-in',
    description: 'Scheduled calls from our nursing team to discuss your loved one\'s wellbeing.',
    icon: 'Phone',
  },
  {
    id: 'qa-feature',
    title: '1-Click Q&A',
    description: 'Ask any question and receive a response within our guaranteed SLA (typically under 4 hours).',
    icon: 'MessageSquare',
  },
  {
    id: 'safety-banner',
    title: 'Weekly Safety Checks',
    description: 'Visual confirmation that all safety protocols have been completed.',
    icon: 'ShieldCheck',
  },
];

export const beforeAfterImprovements = [
  {
    area: 'Staff Training',
    before: 'Minimal orientation',
    after: '200+ hour certification program',
    improvement: '+300%',
  },
  {
    area: 'Family Communication',
    before: 'Monthly updates',
    after: 'Daily tracking + weekly summaries',
    improvement: '+700%',
  },
  {
    area: 'Quality Audits',
    before: 'Annual internal review',
    after: 'Quarterly independent audits',
    improvement: '+400%',
  },
  {
    area: 'Response Time',
    before: '48-72 hours',
    after: 'Under 4 hours',
    improvement: '+1100%',
  },
];
