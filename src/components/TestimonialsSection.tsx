export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-[#FFFAFA] text-[#4A2C2A]" id="testimonials">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
            <p className="text-sm text-gray-700 mb-4 italic">
            &quot;True Texas Shine transformed my apartment. Everything smells fresh and looks spotless! Highly recommended.&quot;
            </p>
            <div className="font-semibold">— Sarah R., Houston</div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
            <p className="text-sm text-gray-700 mb-4 italic">
            &quot;They showed up on time and did a fantastic job with our deep cleaning before guests arrived. Life saver!&quot;
            </p>
            <div className="font-semibold">— Jason M., Katy</div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
            <p className="text-sm text-gray-700 mb-4 italic">
            &quot;The team was so professional and friendly. I love how easy it is to book with them online!&quot;
            </p>
            <div className="font-semibold">— Laura G., Richmond</div>
          </div>
        </div>
      </div>
    </section>
  );
}

