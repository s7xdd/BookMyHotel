import "../styles/Newlistingpage.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Header from "../components/Header";
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Text,
} from "@chakra-ui/react";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [price, setPrice] = useState("");
  const [smalldescription, setSmalldescription] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);

  async function createNewPost(ev) {
    ev.preventDefault();

    if (
      title.length < 1 ||
      content.length < 1 ||
      location.length < 1 ||
      amenities.length < 1 ||
      price.length < 1 ||
      smalldescription.length < 1 ||
      description.length < 1 ||
      type.length < 1 ||
      files.length < 1
    ) {
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
      data.set("type", type);
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

  const handleChange = (e) => {
    const { value, checked } = e.target;

    setAmenities((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((option) => option !== value);
      }
    });
    console.log(amenities);
  };

  if (redirect) {
    return <Navigate to={"/listings"} />;
  }

  if (!userInfo.username) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Header />
      <div className="create-post-cont">
        <div className="create-post-inner">
          <h1>Create New Listing</h1>
          <form onSubmit={createNewPost}>
            <Input
              type="text"
              placeholder="Title"
              maxLength={45}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="md"
            />
            <Input
              type="text"
              placeholder="Content"
              maxLength={35}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Input
              type="text"
              placeholder="location"
              maxLength={30}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <h5>Select Amenities</h5>
            <div className="amenities">
              <CheckboxGroup>
                <div className="multiselect">
                  <Checkbox
                    type="checkbox"
                    value="wifi"
                    checked={amenities.includes("wifi")}
                    onChange={handleChange}
                  >
                    Wifi
                  </Checkbox>
                </div>

                <div className="multiselect">
                  <Checkbox
                    type="checkbox"
                    value="kitchen"
                    checked={amenities.includes("kitchen")}
                    onChange={handleChange}
                  >
                    Kitchen
                  </Checkbox>
                </div>
                <div className="multiselect">
                  <Checkbox
                    type="checkbox"
                    value="parking"
                    checked={amenities.includes("parking")}
                    onChange={handleChange}
                  >
                    Parking
                  </Checkbox>
                </div>
                <div className="multiselect">
                  <Checkbox
                    type="checkbox"
                    value="hottub"
                    checked={amenities.includes("hottub")}
                    onChange={handleChange}
                  >
                    Hot Tub
                  </Checkbox>
                </div>
                <div className="multiselect">
                  <Checkbox
                    type="checkbox"
                    value="aircondtioning"
                    checked={amenities.includes("aircondtioning")}
                    onChange={handleChange}
                  >
                    Air Conditioning
                  </Checkbox>
                </div>
              </CheckboxGroup>
            </div>

            <Input
              type="text"
              placeholder="price"
              maxLength={8}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Small description"
              value={smalldescription}
              maxLength={50}
              style={{ height: "80px" }}
              onChange={(e) => setSmalldescription(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Description"
              value={description}
              maxLength={700}
              style={{ height: "150px" }}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input type="file" onChange={(e) => setFiles(e.target.files)} />
            <div className="select">
              <label>Property type:</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="" disabled hidden>
                  Select an option
                </option>
                <option value="unique">Unique</option>
                <option value="experience">Experience</option>
                <option value="entirehome">Entire Home</option>
              </select>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <ButtonGroup variant="outline" spacing="6">
                <Button colorScheme="blue" type="submit">
                  Save
                </Button>
                <Link to={'/listings'}>
                  <Button>Cancel</Button>
                </Link>
              </ButtonGroup>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
