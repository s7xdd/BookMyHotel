import {format} from 'date-fns'
import { Link } from 'react-router-dom';

const Listings = ({date, title, location, price, img}) => {
 
  const newDate = format(date, 'dd-MM-yyyy')

  return (
    <div>
      <div className="listing_outer">
        <div>
          <div className="ad">
            <div className="date">
              <span>{newDate}</span>
            </div>
            <div className="ad_inner">
              <Link to={`/rooms/${title}`}>
              <img src={`${import.meta.env.VITE_URL}/${img}`} alt="image" />
              </Link>
              <div>
                <Link to={`/rooms/${title}`}>
                  <h6>{title}</h6>
                  <span>{location}</span>
                </Link>
              </div>
              <h6>${price}</h6>
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
