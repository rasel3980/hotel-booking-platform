
const features = [
  {
    icon: "⭐",
    title: "Exceptional Service",
    description:
      "Our staff is dedicated to providing the best possible service to make your stay unforgettable.",
  },
  {
    icon: "📍",
    title: "Prime Location",
    description:
      "Located in the heart of the city, giving you easy access to the best restaurants, shops, and attractions.",
  },
  {
    icon: "🛏️",
    title: "Luxurious Rooms",
    description:
      "Our rooms are designed with your comfort and relaxation in mind. Enjoy spacious, beautifully decorated accommodations.",
  },
  {
    icon: "✨",
    title: "Unforgettable Experiences",
    description:
      "From curated local tours to in-house spa treatments, we offer experiences that make your stay truly special.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-900 py-24 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-teal-400 bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 rounded-full">
            Why Us
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Choose <span className="text-teal-400">Us?</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            We go beyond accommodation — delivering an experience you'll remember long after you leave.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-2xl group-hover:bg-teal-500/20 group-hover:border-teal-400/40 transition-all duration-300">
                  {feature.icon}
                </div>
                <span className="text-4xl font-black text-white/10 group-hover:text-teal-500/20 transition-colors duration-300 select-none">
                  0{i + 1}
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent mb-6" />
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <button className="px-10 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold tracking-wide shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-200">
            Explore More
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;