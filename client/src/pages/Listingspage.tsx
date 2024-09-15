import React, { useState } from 'react'
import '../styles/listingspage.css'
import Header from '../components/Header';
import Listings from '../components/Listings';
import { Content } from '../data/Maincontents'


const Listingspage = () => {
const [listings, setListings] = useState(Content);

  const handleEdit = (id) => {
    alert(`Edit listing ${id}`);
  };

  const handleDelete = (id) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <div>
      <Header/>
      <div className='top_bar_main'>
      <h1>Your listings</h1>
          <div className="top_bar">
            <input type="text" placeholder="search by Ad title" name="" id="" />
            <span>Filter By</span>
            <button>View all(35)</button>
            <button>Active Ads</button>
          </div>
      </div>
      {listings && listings.map((item) => (
        <Listings title={item.title} price={item.price} img={item.img} location={item.location}/>
      ))}
    </div>
  );
}

export default Listingspage