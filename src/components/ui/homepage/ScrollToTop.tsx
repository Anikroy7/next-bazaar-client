"use client";

import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTops = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8  z-30">
      {isVisible && (
        <Button
          className="shadow-lg rounded-full font-bold text-xl"
          color="default"
          variant="faded"
          onClick={scrollToTops}
        >
          ↑
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;
