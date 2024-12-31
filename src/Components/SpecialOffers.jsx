import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const SpecialOffers = () => {
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Helmet>
        <title>Home | Hotel Booking</title>
      </Helmet>
      
      <h1>Welcome to Our Hotel Booking Website</h1>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="font-bold text-xl mb-5">Special Offers & Promotions</h3>
            
            <p className="text-lg mb-4">
              Don't miss out on our exclusive offers! Book your stay now and save big on your next adventure.
            </p>

            <img
              src="https://via.placeholder.com/600x300?text=Special+Offer+Banner"
              alt="Special Offer"
              className="w-full rounded-lg mb-5"
            />

            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleCloseModal}>
                Close
              </button>
              <a href="/promotions" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="main-content">
        <p>Explore our amazing rooms and book your next stay at the best prices!</p>
      </div>
    </div>
  );
};

export default SpecialOffers;
