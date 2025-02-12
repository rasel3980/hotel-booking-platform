import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-blue-100 w-full mx-auto my-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-10">Why Choose Us?</h2>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold text-gray-800">Exceptional Service</h3>
              <p className="text-gray-600 mt-4">Our staff is dedicated to providing the best possible service to make your stay unforgettable.</p>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold text-gray-800">Prime Location</h3>
              <p className="text-gray-600 mt-4">Our hotel is located in the heart of the city, giving you easy access to the best restaurants, shops, and attractions.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold text-gray-800">Luxurious Rooms</h3>
              <p className="text-gray-600 mt-4">Our rooms are designed with your comfort and relaxation in mind. Enjoy spacious and beautifully decorated accommodations.</p>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold text-gray-800">Unforgettable Experiences</h3>
              <p className="text-gray-600 mt-4">From curated local tours to in-house spa treatments, we offer experiences that will make your stay truly special.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
