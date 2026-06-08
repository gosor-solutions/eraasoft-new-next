import EmptyState from "@/components/shared/EmptyState";
import Faqs from "./Faqs";

export default function FaqsSection({ faqs = [] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="my-8 sm:my-10 lg:my-5 px-5 sm:px-8 lg:px-13">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col gap-4">
          {faqs.map((faq) => (
            <Faqs key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
