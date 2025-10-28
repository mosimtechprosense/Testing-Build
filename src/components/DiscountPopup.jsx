import { useState, useEffect, useRef } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const DiscountPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [closeCount, setCloseCount] = useState(0);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState(
    "Fill in your details to unlock your exclusive wedding discount"
  );

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const popupRef = useRef(null);

  useEffect(() => {
    if (warning && popupRef.current) {
      popupRef.current.style.animation = "softShake 0.4s ease-in-out";
      const timer = setTimeout(() => {
        popupRef.current.style.animation = "";
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  // Handle reopen logic
  useEffect(() => {
    if (closeCount === 1) {
      const timer = setTimeout(() => {
        // Only reopen if popup is actually closed
        if (!isOpen && closeCount === 1 && name === "" && phone === "") {
          setMessage("⚠️ Fill your details to avoid this popup");
          setIsOpen(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [closeCount, isOpen, name, phone]);

  // Validation
  const validateForm = () => {
    let valid = true;
    setNameError("");
    setPhoneError("");

    if (name.trim().length < 3) {
      setNameError("Please enter a valid name (min 3 characters)");
      valid = false;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      valid = false;
    }

    return valid;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    Toastify({
      text: "✅ Success! Our team will contact you shortly!",
      duration: 4000,
      gravity: "top",
      position: window.innerWidth <= 768 ? "center" : "right", // ✅ Center on mobile
      className: "custom-toast text-white text-sm rounded-xl shadow-lg",
      style: {
        background: "#141414",
        width: "clamp(260px, 90%, 380px)", // ✅ Responsive width with min & max limit
        whiteSpace: "pre-line", // ✅ Keeps wrapping natural without breaking mid-word
        wordBreak: "keep-all", // ✅ Prevents unwanted word splits
        textAlign: "center",
        borderRadius: "10px",
        margin: "0 auto",
        boxSizing: "border-box",
      },
      close: true,
    }).showToast();

    setTimeout(() => setIsOpen(false), 2500);
  };

  const handleClose = () => {
    if (closeCount === 0) {
      setIsOpen(false);
      setCloseCount(1);
    } else {
      setMessage("❌ You must fill the form to close this popup!");
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        if (closeCount === 0) {
          // ✅ First popup — close normally
          setIsOpen(false);
          setCloseCount(1);
        } else {
          // ⚠️ Second popup — shake, don't close
          setWarning(true);
          setTimeout(() => setWarning(false), 600);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, closeCount]);

  // Warning shake animation
  useEffect(() => {
    if (closeCount === 1 && isOpen) {
      const handleClick = (e) => {
        const popup = document.querySelector(".popup-box");
        if (!popup?.contains(e.target)) {
          setWarning(true);
          setTimeout(() => setWarning(false), 600);
        }
      };
      window.addEventListener("click", handleClick, true);
      return () => window.removeEventListener("click", handleClick, true);
    }
  }, [closeCount, isOpen]);

  useEffect(() => {
    if (warning) {
      const popup = document.querySelector(".popup-box");
      popup?.classList.add("animate-softShake");
      setTimeout(() => popup?.classList.remove("animate-softShake"), 500);
    }
  }, [warning]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[1000] animate-fadeInSmooth select-none">
      <div
        ref={popupRef}
        className="popup-box bg-white w-[85%] sm:w-[400px] rounded-2xl shadow-2xl relative animate-fadeInSmooth p-6"
      >
        <button
          className={`absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl ${
            closeCount >= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleClose}
          disabled={closeCount >= 1}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-[#dc2626] mb-2 text-center">
          Get 50% OFF!
        </h2>

        <p
          className={`mb-5 text-center transition-all duration-200 ${
            warning ? "text-red-600 scale-105" : "text-gray-600"
          }`}
        >
          {message}
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <label
              className="absolute -top-0.5 left-3 bg-white px-1 text-sm text-gray-500 font-semibold"
              htmlFor="name"
            >
              Enter Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => {
                setName(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1).toLowerCase()
                );
                if (nameError) setNameError("");
              }}
              className={`w-full border ${
                nameError ? "border-red-500" : "border-gray-400"
              } rounded-md px-3 py-2 mt-2 text-gray-700 focus:outline-none focus:ring-2 ${
                nameError ? "focus:ring-red-400" : "focus:ring-gray-400"
              }`}
              required
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>

          {/* Phone Input */}
          <div className="relative">
            <label
              className="absolute -top-0.5 left-3 bg-white px-1 text-sm text-gray-500 font-semibold"
              htmlFor="phone"
            >
              Enter your Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder=" "
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError("");
              }}
              className={`w-full border ${
                phoneError ? "border-red-500" : "border-gray-400"
              } rounded-md px-3 py-2 mt-2 text-gray-700 focus:outline-none focus:ring-2 ${
                phoneError ? "focus:ring-red-400" : "focus:ring-gray-400"
              }`}
              required
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#dc2626] text-white font-semibold py-2 rounded-md hover:bg-[#b91c1c] transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscountPopup;
