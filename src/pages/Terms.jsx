import { useNavigate } from "react-router-dom";


const Terms = () => {

  const navigate = useNavigate();

  return (
    <div className='w-full bg-gradient-to-b from-[#ffffff] to-[#f9f9f9] py-8 px-6 md:px-16 lg:px-24'>
       {/* Breadcrumb */}
      <div className="flex items-center gap-x-1 mb-10 text-sm md:text-base">
        <h3
          className="text-[#dc2626] font-normal cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </h3>
        <span>/</span>
        <span className="text-gray-500 font-normal">Terms & Conditions</span>
      </div>

      {/* Heading */}
      <div className="w-full text-center mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">Terms & Conditions</h2>
        
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-6xl mx-auto">
          Welcome to <span className="font-semibold text-[#dc2626]">BookMyBanquet’s</span>Through visiting or utilizing our site, www.bookmybanquets.in It is the expectation of the Terms and Conditions (herein referred to as “Terms”) that you will follow, that you will be bound by the subsequent Terms and Conditions once you agree to (the “Website”) and related services (collectively, the “BookMyBanquet Services”), and that you will accept the Terms and be bound by the Terms. Before using our platform, please read them carefully.
        </p>
      </div>
      
    </div>
  )
}

export default Terms