import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 sm:px-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          We would love to hear from you! Whether you have questions or need
          support, feel free to reach out to us.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Get in Touch
        </h3>

        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                id="email"
                name="email"
                placeholder="johndoe@example.com"
                type="email"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="message"
              name="message"
              placeholder="Your message here..."
              rows={6}
            />
          </div>

          <div className="mt-8 text-center">
            <button
              className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Or Connect with Us on Social Media
        </h2>
        <div className="flex justify-center space-x-6">
          <a
            className="text-gray-600 hover:text-indigo-600"
            href="https://www.facebook.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-facebook-f fa-2x" />
          </a>
          <a
            className="text-gray-600 hover:text-indigo-600"
            href="https://www.twitter.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-twitter fa-2x" />
          </a>
          <a
            className="text-gray-600 hover:text-indigo-600"
            href="https://www.instagram.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-instagram fa-2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
