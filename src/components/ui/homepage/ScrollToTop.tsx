'use client';  // Mark the component as a Client Component

import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to top
    const scrollToTops = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);  // Show button when scrolled down 300px
            } else {
                setIsVisible(false);  // Hide button when at the top
            }
        };

        // Add event listener for scroll
        window.addEventListener("scroll", handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8  z-30">
            {isVisible && (
                <Button

                    color="warning"
                    variant="faded"
                    onClick={scrollToTops}
                    className="shadow-lg rounded-full font-bold text-xl"

                >
                    ↑
                </Button>
            )}
        </div>
    );
};

export default ScrollToTop;
