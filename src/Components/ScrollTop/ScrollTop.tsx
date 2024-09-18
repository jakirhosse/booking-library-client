import { useEffect, useState } from "react";
import './ScrollTop.css'; // Assuming you meant to import 'ScrollTop.css'
import { RxDoubleArrowUp } from "react-icons/rx";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle the scrolling
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // Function to handle scroll events
  const listenToScroll = () => {
    const heightToHide = 250; // Change this value to adjust the scroll threshold
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHide) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="flex items-center justify-center">
          <button
            className={`scroll-to-top ${isVisible ? "visible" : ""}`}
            onClick={scrollTop}
          >
            <p>
              <RxDoubleArrowUp className="text-6xl animate-bounce" />
            </p>
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollTop;
