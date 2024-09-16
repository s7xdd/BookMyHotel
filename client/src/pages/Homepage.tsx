import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Contents from "../components/Contents";
import { Maincontents, Bigcontents } from "../data/Maincontents";
import "../styles/contents.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const[listings, setListings] = useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/home/rooms`).then((response) => {
      setListings(response.data)
      console.log(response.data)
    })
}, []);
  return (
    <div>
      <Banner />
      <div className="home_cont">
        {Maincontents &&
          Maincontents.map((item) => (
            <Link to={`/${item.title}`} target="_parent">
            <div key={item.id}>
              <Contents
                id={item.id}
                img={item.img}
                title={item.title}
                description={item.description}
              />
            </div>
            </Link>
          ))}
      </div>
      <div className="bighome">
        <h2>Broadway Online Experiences</h2>
        <p>
          Join live, interactive performances and conversations with people from
          Broadway and beyond. Without leaving home.
        </p>
        <div className="home_cont">
          {Bigcontents &&
            Bigcontents.map((item) => (
              <div key={item.id}>
                <Contents
                  big={true}
                  id={item.id}
                  img={item.img}
                  styles={item.styles}
                  description={item.description}
                />
              </div>
            ))}
        </div>
        <button className="E_btn">Explore all</button>
      </div>
      <div className="homepage_experiences">
 
      <div className="home_cont rooms">
        {listings &&
          listings.map((item) => (
            <Link to={`/rooms/${item.title}`} target="_parent">
              <div key={item.id}>
                  <Contents
                    id={item.id}
                    img={`${import.meta.env.VITE_URL}/${item.img}`}
                    title={item.title}
                    amount={item.price}
                    description={item.smalldescription}
                  />
              </div>
            </Link>
          ))}
      </div>
      </div>
    </div>
  );
};

export default Homepage;
