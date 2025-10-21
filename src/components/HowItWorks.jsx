import { FaSearchLocation, FaHotel, FaCalendarCheck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearchLocation className="text-4xl text-[#dc2626]" />,
      title: "1. Search Your Dream Venue",
      description:
        "Find the perfect wedding venue, banquet hall, or resort by browsing hundreds of handpicked options across India.",
    },
    {
      icon: <FaHotel className="text-4xl text-[#dc2626]" />,
      title: "2. Explore Details & Packages",
      description:
        "View venue photos, amenities, guest capacity, and curated packages that suit your style and budget.",
    },
    {
      icon: <FaCalendarCheck className="text-4xl text-[#dc2626]" />,
      title: "3. Book Effortlessly",
      description:
        "Connect directly with venue managers or let our team help you finalize your booking — quick and hassle-free.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#fff9f9] to-[#ffffff] py-20 px-6 sm:px-10 md:px-16 lg:px-24 text-center">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#06002e] mb-4">
        How It Works
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-base sm:text-lg">
        Plan your dream wedding effortlessly in just three simple steps — from searching venues to securing your perfect day.
      </p>

      {/* Steps */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-2xl p-8 w-full sm:w-[80%] md:w-[60%] lg:w-[30%] transition-transform duration-300 hover:scale-105"
          >
            <div className="mb-5 flex items-center justify-center w-16 h-16 bg-[#fff2f2] rounded-full">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-[#06002e] mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>


          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
