"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

import { useCreateNewsLetter } from "@/src/hooks/newLettter.hook";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { mutateAsync: create, isPending } = useCreateNewsLetter();

  const handleNewsLetter = () => {
    if (email) {
      create({
        email: email,
      });
    } else {
      alert("invalid email");
    }
    setEmail("");
  };

  return (
    <section className="bg-gray-900 text-white py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Stay Updated with Our Latest News
        </h2>
        <p className="text-lg mb-8">
          Sign up for our newsletter to receive the latest updates and offers
          directly to your inbox.
        </p>

        {/* Newsletter Form */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-3xl mx-auto">
          <input
            required
            className="w-full sm:w-72 p-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isPending ? (
            <Button isLoading color="primary">
              Loading..
            </Button>
          ) : (
            <Button
              className="w-full sm:w-auto px-8 py-3 mt-4 sm:mt-0 bg-black text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition duration-300"
              onClick={() => handleNewsLetter()}
            >
              <FaPaperPlane size={20} /> {/* React Icon Send Icon */}
              Subscribe
            </Button>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-400">
          We value your privacy. Your email will never be shared.
        </p>
      </div>
    </section>
  );
}
