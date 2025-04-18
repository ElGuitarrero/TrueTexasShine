export default function ServicesSection() {
    return (
      <section className="py-12 bg-[#FFFAFA] text-[#4A2C2A]" id="services">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
  
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Service 1 */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-all">
              <div className="text-4xl mb-3">🧹</div>
              <h3 className="text-xl font-semibold mb-2">General Cleaning</h3>
              <p className="text-sm text-gray-600">
                Regular cleaning to keep your home fresh and spotless week after week.
              </p>
            </div>
  
            {/* Service 2 */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-all">
              <div className="text-4xl mb-3">🧼</div>
              <h3 className="text-xl font-semibold mb-2">Deep Cleaning</h3>
              <p className="text-sm text-gray-600">
                Perfect for seasonal refreshes or after events that need extra care.
              </p>
            </div>
  
            {/* Service 3 */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-all">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="text-xl font-semibold mb-2">Office Cleaning</h3>
              <p className="text-sm text-gray-600">
                Clean workspaces that boost productivity and employee well-being.
              </p>
            </div>
  
            {/* Service 4 */}
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-all">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="text-xl font-semibold mb-2">Consultations</h3>
              <p className="text-sm text-gray-600">
                Not sure what service is right for you? We&apos;ll help you figure it out.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }