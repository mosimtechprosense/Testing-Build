import { useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { TbMailFilled } from "react-icons/tb";
import { ImLocation2 } from "react-icons/im";

const ContactUs = () => {
  const navigate = useNavigate();

  const contactDetails = [
    {
      icon: <IoCall className="text-xl text-white" />,
      title: "Phone",
      des: "+91-8920597474",
    },
    {
      icon: <TbMailFilled className="text-xl text-white" />,
      title: "Email",
      des: "info@bookmybanquets.in",
    },
    {
      icon: <ImLocation2 className="text-xl text-white" />,
      title: "Address",
      des: "Unit No. 1369, Second floor,ILD Trade Centre, Sector 47,Sohna Road, Gurgaon Haryana",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[#ffffff] to-[#f9f9f9] py-8 px-6 md:px-16 lg:px-24">

      {/* Breadcrumb */}
      <div className="flex items-center gap-x-1 mb-10 text-sm md:text-base">
        <h3
          className="text-[#dc2626] font-normal cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </h3>
        <span>/</span>
        <span className="text-gray-500 font-normal">Contact Us</span>
      </div>

      {/* Contact Header */}
      <div className="w-full text-center mx-auto px-4 md:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
          Contact Us
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
          Planning a wedding, reception, or corporate event? Our team is here to help you create a flawless celebration.
          Fill out the form below or reach us directly — we’ll get back to you within 24 hours to discuss your event details and customize a package that fits your vision.
        </p>
      </div>

      {/* Contact Details & Form Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16">

        {/* Left - Contact Details */}
        <div className="w-full md:w-1/3 space-y-8">
          {contactDetails.map((data, index) => (
            <div key={index} className="flex items-start gap-5">
              <div className="bg-[#dc2626] p-3 rounded-full flex items-center justify-center">
                {data.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#dc2626] mb-1">
                  {data.title}
                </h3>
                <p className="text-gray-700">{data.des}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Contact Form */}
        <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Message</h3>
          <form className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-[#dc2626] transition"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-[#dc2626] transition"
              />
            </div>
            <div>
              <textarea
                placeholder="Type your Message..."
                className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-[#dc2626] transition"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#dc2626] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#b91c1c] transition"
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
