import "../styles/Newlistingpage.css";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Header from "../components/Header";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [amenities, setAmenities] = useState("");
  const [price, setPrice] = useState("");
  const [smalldescription, setSmalldescription] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);

  async function createNewPost(ev) {
    ev.preventDefault();

    if ((title.length < 1) || (content.length < 1) || (location.length < 1) || (amenities.length < 1) || (price.length < 1) || (smalldescription.length < 1) || (description.length < 1) || (files.length < 1)) {
      alert("All fields are necessary");
    } else {
      const data = new FormData();
      data.set("title", title);
      data.set("content", content);
      data.set("location", location);
      data.set("amenities", amenities);
      data.set("price", price);
      data.set("smalldescription", smalldescription);
      data.set("description", description);
      data.set("file", files[0]);

      const response = await fetch(`${import.meta.env.VITE_URL}/post`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        alert("Post created successfully");
        setRedirect(true);
      } else {
        alert("Missing fields");
      }
    }
  }

  if(redirect){
    return <Navigate to={'/listings'}/>
  }

  if (!userInfo.username) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
        <Header/>
    <div className="create-post-cont">
        
      <div className="create-post-inner">
        <h1>Create New Listing</h1>
        <form onSubmit={createNewPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          <input
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />

          <input
            type="text"
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />

          <input
            type="text"
            placeholder="amenities"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            />

          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />

          <input
            type="text"
            placeholder="Small description"
            value={smalldescription}
            onChange={(e) => setSmalldescription(e.target.value)}
            />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

          <input type="file" onChange={(e) => setFiles(e.target.files)} />

          <button className="create-btn btn btn-primary">Create Post</button>
        </form>
      </div>
    </div>
            </div>
  );
};

export default CreateListing;
