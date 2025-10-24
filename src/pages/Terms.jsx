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
    </div>
  )
}

export default Terms