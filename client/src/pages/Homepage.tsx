import Banner from "../components/Banner";
import Contents from "../components/Contents";
import Footer from "../components/Footer";
import { Content, Maincontents, Bigcontents } from "../data/Maincontents";
import "../styles/contents.css";
import { Link } from "react-router-dom";

const Homepage = () => {
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
 
      <div className="home_cont">
        {Content &&
          Content.map((item) => (
            <Link to={`/rooms/${item.title}`} target="_parent">
              <div key={item.id}>
                  <Contents
                    id={item.id}
                    img={item.img}
                    title={item.title}
                    amount={item.price}
                    description={item.description}
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
