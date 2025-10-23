import React from 'react'

const WhyUsSection = () => {

      const whyUsContent = [
    { title: "Events Organized", count: "1000+" },
    { title: "Present in Cities", count: "50+" },
    { title: "Wedding Venues", count: "500+" },
    { title: "Wedding Locations", count: "50+" },
  ];

  
  return (
     <section className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-10 px-4 sm:px-8 md:px-16 lg:px-24 py-12 text-center">
        {whyUsContent.map((whyus) => (
          <div
            key={whyus.title}
            className="w-full sm:w-1/2 md:w-auto flex-1 min-w-[140px] sm:min-w-[180px] md:min-w-[220px]"
          >
            <p className="text-base sm:text-lg md:text-xl font-semibold text-[#dc2626]">
              {whyus.title}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#06002e] mt-2">
              {whyus.count}
            </h2>
          </div>
        ))}
      </section>
  )
}

export default WhyUsSection