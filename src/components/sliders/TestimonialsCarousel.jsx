import TestimonialCard from "./TestimonialCard";
import CarsoulComponent from "./CarsoulComponent";

export default function TestimonialsCarousel({ testimonials = [] }) {
  return (
    <CarsoulComponent>
      {testimonials.map((item) => (
        <TestimonialCard key={item.id} item={item} />
      ))}
    </CarsoulComponent>
  );
}
