import React from "react";

const Listings = ({date, title, location, price, img}) => {
  return (
    <div>
      <div className="listing_outer">
        <div>
          <div className="ad">
            <div className="date">
              <span>September 9</span>
            </div>
            <div className="ad_inner">
              <img src={img} height={100} alt="image" />
              <div>
                <h6>{title}</h6>
                <span>{location}</span>
              </div>
              <h6>{price}</h6>
              <a>ACTIVE</a>
              <div className="buttons">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
