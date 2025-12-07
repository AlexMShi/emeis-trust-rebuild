import { SectionHeader } from '@/components/common/SectionHeader';
import { faqItems } from '@/data/mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  return (
    <section id="faq" className="section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          description="Get answers to the most common questions about Emeis care, our transformation, and how we support families."
        />

        <div className="mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="bg-card border border-border rounded-2xl px-6 data-[state=open]:shadow-soft transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
