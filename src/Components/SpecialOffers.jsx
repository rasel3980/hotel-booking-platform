import React from 'react';

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Special Offers</h2>
          <p className="text-lg text-gray-500 mb-6">
            Don't miss out on our exclusive offers! Plan your dream vacation with unbeatable discounts. Limited time only.
          </p>
          <a
            href="/offers"
            className="btn btn-primary text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-full px-8 py-3"
          >
            See Offers
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
