import React from "react";

const Contact = () => {
  return (
    <div
      id="contact"
      className="bg-gradient-to-r from-purple-500 to-yellow-300 animate-fadeIn"
    >
      <section className="text-gray-600 body-font relative border-2">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          {/* Map Section */}
          <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative transform hover:scale-105 transition-all duration-700 ease-in-out">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder={0}
              title="map"
              marginHeight={0}
              marginWidth={0}
              scrolling="no"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7238.950792916944!2d67.06411529017358!3d24.88176084466013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ec1ef53e5c7%3A0x14849036f9416ef6!2sBahadurabad%20Gulshan-e-Iqbal%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1732467477354!5m2!1sen!2s"
              style={{
                filter: "contrast(1.2) opacity(0.5)",
                transition: "all 0.3s ease",
              }}
            />
            <div className="bg-purple-200 relative flex flex-wrap py-6 rounded shadow-2xl border-2 opacity-90 transform hover:scale-105 transition-all duration-500 ease-in-out">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1 text-sm">ABC area, Karachi.</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <a className="text-indigo-500 leading-relaxed">abc@email.com</a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed text-sm">03-XXX-XXXX</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:w-1/3 md:w-1/2 bg-slate-200 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 rounded-md shadow-2xl transform hover:scale-105 transition-all duration-500 ease-in-out">
            <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 animate-fadeIn">
              Contact
            </h2>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-300 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="flex items-center bg-slate-100 rounded-full px-3 py-1 w-full "
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="lex items-center bg-slate-100 rounded-full px-3 py-1 w-full focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700  resize-none leading-6 transition-colors duration-300 ease-in-out"
                defaultValue={""}
              />
            </div>
            <button className="flex items-center bg-slate-100 rounded-full px-3 py-1 w-full text-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
              Send Message..
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
