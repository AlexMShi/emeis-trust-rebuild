import { HeroSection } from '@/components/home/HeroSection';
import { TransformationSection } from '@/components/home/TransformationSection';
import { TransparencyPreviewSection } from '@/components/home/TransparencyPreviewSection';
import { ReviewsPreviewSection } from '@/components/home/ReviewsPreviewSection';
import { AdmissionPreviewSection } from '@/components/home/AdmissionPreviewSection';
import { PaymentSecuritySection } from '@/components/home/PaymentSecuritySection';
import { LoyaltySection } from '@/components/home/LoyaltySection';
import { FAQSection } from '@/components/home/FAQSection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <TransformationSection />
      <TransparencyPreviewSection />
      <ReviewsPreviewSection />
      <AdmissionPreviewSection />
      <PaymentSecuritySection />
      <LoyaltySection />
      <FAQSection />
    </>
  );
};

export default Index;
