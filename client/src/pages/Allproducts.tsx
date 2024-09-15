import "../styles/allproducts.css";
import Header from "../components/Header";
import { Content } from "../data/Maincontents";
import Contents from "../components/Contents";

const Allproducts = () => {
  return (
    <div className="allproducts">
      <Header />
      <h1>Explore</h1>
      <div className="home_cont">
        {Content &&
          Content.map((item) => (
            <Contents
              id={item.id}
              img={item.img}
              title={item.title}
              amount={item.price}
              description={item.description}
            />
          ))}
      </div>
    </div>
  );
};

export default Allproducts;
