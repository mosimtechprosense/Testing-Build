import { useState, useEffect } from "react";

const DiscountPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [closeCount, setCloseCount] = useState(0);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState(
    "Fill in your details to unlock your exclusive wedding discount"
  );

  // Reopen logic after first close
  useEffect(() => {
    if (closeCount === 1) {
      const timer = setTimeout(() => {
        setMessage("⚠️ Fill your details to avoid this popup");
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [closeCount]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert(" Please enter a valid 10-digit phone number!");
      return;
    }
    alert(` Thanks ${name}! You’ve unlocked 50% OFF!`);
    setIsOpen(false);
  };

  // Handle close button
  const handleClose = () => {
    if (closeCount === 0) {
      setIsOpen(false);
      setCloseCount(1);
    } else if (closeCount === 1) {
      alert("❌ You must fill the form to close this popup!");
    }
  };

  // Handle outside click for warning
  useEffect(() => {
    if (closeCount === 1 && isOpen) {
      const handleClick = (e) => {
        const popup = document.querySelector(".popup-box");
        const isInsidePopup = popup?.contains(e.target);
        const isInputOrButton =
          e.target.tagName === "INPUT" || e.target.tagName === "BUTTON";

        // Trigger warning only if click is outside popup,
        // or inside but not on input/button
        if (!isInsidePopup && !isInputOrButton) {
          setWarning(true);
          setTimeout(() => setWarning(false), 1000);
        }
      };

      window.addEventListener("click", handleClick, true);
      return () => window.removeEventListener("click", handleClick, true);
    }
  }, [closeCount, isOpen]);

  // Smooth shake animation when warning is active
  useEffect(() => {
    if (warning) {
      const popup = document.querySelector(".popup-box");
      popup?.classList.add("animate-softShake");
      setTimeout(() => popup?.classList.remove("animate-softShake"), 600);
    }
  }, [warning]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-150 animate-overlayFadeIn">
      <div className="popup-box bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-2xl relative animate-fadeInSmooth p-6 transition-transform duration-300 ease-in-out">
        {/* Close button */}
        <button
          className={`absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl ${
            closeCount >= 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleClose}
          disabled={closeCount >= 1}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#dc2626] mb-2">Get 50% OFF!</h2>

        {/* Message */}
        <p
          className={`mb-4 transition-all duration-500 ease-in-out transform ${
            warning
              ? "text-red-600 font-semibold scale-[1.05]"
              : "text-gray-600 scale-100"
          }`}
        >
          {message}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              const formatted =
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
              setName(formatted);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition-all duration-300"
            required
          />
          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition-all duration-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#dc2626] text-white font-semibold py-2 rounded-md hover:bg-[#b91c1c] transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscountPopup;
