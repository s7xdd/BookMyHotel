import { Link } from "react-router-dom";
import '../styles/banner.css'
import Navbar from "./Navbar";

const Banner = () => {
  return (
    <div className="banner">
        <Navbar/>
        <div className="banner_content">
            <h2>Go Near</h2>
            <h5>
                Settle in somewhere new. Discover new places to live, work, have fun
                or relax.
            </h5>
            <Link to={'/explore'}>
                <button>Explore Nearby</button>
            </Link>
        </div>
    </div>
  )
}

export default Banner