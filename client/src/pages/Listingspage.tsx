import React, { useContext, useEffect, useState } from 'react'
import '../styles/listingspage.css'
import Header from '../components/Header';
import Listings from '../components/Listings';
import { Content } from '../data/Maincontents'
import { UserContext } from '../UserContext';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';


const Listingspage = () => {
  const [listings, setListings] = useState([]);
  const {userInfo} = useContext(UserContext);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/mylistings`, {withCredentials: true}).then((response) => {
      setListings(response.data)
      console.log(listings)
    })
  },[])

  const handleEdit = (id) => {
    alert(`Edit listing ${id}`);
  };

  const handleDelete = (id) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  if(!userInfo.username){
    return <Navigate to={'/login'}/>
  }

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
            <Link to={'/newlisting'}>
              <button>Create new listing</button>
            </Link>
          </div>
      </div>
      {listings && listings.map((item) => (
        <Listings title={item.title} price={item.price} img={item.img} location={item.location} date={item.createdAt}/>
      ))}
    </div>
  );
}

export default Listingspage