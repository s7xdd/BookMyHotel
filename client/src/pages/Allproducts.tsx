import "../styles/allproducts.css";
import Header from "../components/Header";
import { Content } from "../data/Maincontents";
import Contents from "../components/Contents";
import { useEffect, useState } from "react";
import axios from "axios";

const Allproducts = () => {
  const[listings, setListings] = useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/rooms`).then((response) => {
      setListings(response.data)
    })
}, []);
  return (
    <div className="allproducts">
      <Header />
      <h1>Explore</h1>
      <div className="home_cont show_all">
        {listings &&
          listings.map((item) => (
            <Contents
              id={item.id}
              img={`${import.meta.env.VITE_URL}/${item.img}`}
              title={item.title}
              amount={item.price}
              description={item.smalldescription}
            />
          ))}
      </div>
    </div>
  );
};

export default Allproducts;
