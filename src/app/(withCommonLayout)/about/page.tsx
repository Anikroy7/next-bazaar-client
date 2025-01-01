import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 sm:px-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          We are a multi-vendor platform that connects talented vendors with
          customers seeking the best products. We aim to provide a seamless and
          trustworthy shopping experience for both vendors and customers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              Our mission is to create a marketplace where vendors can thrive
              and customers can find high-quality products with ease.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600">
              We envision a world where entrepreneurs and small businesses can
              reach their full potential by leveraging the power of technology
              and our platform.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          With a user-friendly interface, secure payment methods, and a variety
          of products, we guarantee an exceptional experience. Whether
          you&apos;re a vendor or a customer, we&apos;ve got you covered.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
