import React, { useEffect, useState } from 'react';
import offerBanner from '../assets/images/special-offer.jpg'

const SpecialOffers = () => {
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true); 
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  const handleCloseModal = () =>{
    setShowModal(false);
  };

  return (
    <div>
    
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="font-bold text-xl mb-5">Special Offers & Promotions</h3>
            
            <p className="text-lg mb-4">
              Don't miss out on our exclusive offers! Book your stay now and save big on your next adventure.
            </p>

            <img
              src={offerBanner}
              alt="Special Offer"
              className="w-full rounded-lg mb-5"
            />

            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleCloseModal}>
                Close
              </button>
              <a href="/rooms" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialOffers;
