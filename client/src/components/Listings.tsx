import { useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Listings = ({ id, date, title, location, price, img }) => {
  const newDate = format(date, "dd-MM-yyyy");
  const toast = useToast();
  const [refresh, setRefresh] = useState(false)
  const deleteListing = () => {
    const deletelist = new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.delete(`${import.meta.env.VITE_URL}/post/${id}`, { withCredentials: true })
          .then((response) => {
            console.log('deleted');
            resolve(response); // Resolve the promise here
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            reject(err); // Reject the promise here
          });
      }, 2000); // 2-second delay
    });
  
  
    toast.promise(deletelist, {
      success: {
        title: "Listing deleted",
        description: "Listing has been successfully deleted",
      },
      error: {
        title: "Error",
        description: "Something wrong",
      },
      loading: {
        title: "Deleting listing",
        description: "Please wait",
      },
    });
  }


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
                <button
                  onClick={deleteListing}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
