import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/profilepage.css";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

const Profilepage = () => {
  const {userInfo} = useContext(UserContext)
  const [firstName, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [postcode, setPostcode] = useState('')
  const [state, setState] = useState('')
  const [area, setArea] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/user/profile`, {
      credentials: "include"
    }).then((response) => {
      response.json().then(userInfo => {
        setFirstName(userInfo.firstname)
        setSurname(userInfo.surname);
        setPhone(userInfo.phone);
        setAddress1(userInfo.address1);
        setPostcode(userInfo.postcode);
        setState(userInfo.state);
        setArea(userInfo.area);
        setCountry(userInfo.country);
        setEmail(userInfo.email);
        console.log(email)
      })
    }).catch((error) => {
      alert(error)
    })
  
  },[])  

  function handleUpdate(e){
    e.preventDefault();

        const data = {
            firstname: firstName,
            surname: surname,
            phone: phone,
            address1: address1,
            address2: address2,
            postcode: postcode,
            state: state,
            area: area,
            country: country,
        }

        axios.put(`${import.meta.env.VITE_URL}/user/profile`, data, {withCredentials: true}).then(response => {
            alert('Profile saved')
        }).catch((err) => {
            alert("Error saving profile")
        })
  }

  if(!userInfo.username){
    return <Navigate to={'/login'}/>
  }

  return (
    <div className="profilepage_main">
        <div className="nav">
            <Header/>
        </div>
      <div className="profilepage container rounded bg-white mt-5 mb-5">
        <div className="row d-flex justify-content-center align-align-items-center">
          <div className="col-md-3 border-right d-flex gap-5">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span className="font-weight-bold">{userInfo.username}</span>
              <span className="text-black-50">{email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right fw-bold">Profile Settings</h4>
              </div>
              <form onSubmit={handleUpdate}>

              <div className="row mt-2 gap-2 d-flex ">
                <div className="col-md-5">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={surname}
                    placeholder="surname"
                    onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
              </div>
              <div className="row mt-3 gap-2">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                  <label className="labels">Postcode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter post code"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                  <label className="labels">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                  <label className="labels">Area</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    value={email}
                    />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                  >
                  Save Profile
                </button>
              </div>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
