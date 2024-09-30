import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/loginpage.css";
import Header from "../components/Header";
import { UserContext } from "../UserContext";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        alert("Login Successful");
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong credentials");
    }
  };

  if (userInfo.username || redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="nav">
      <Header />
      <div className="login_main container">
        <form onSubmit={handleSubmit}>
          <div className="login_inner">
            <h1>Login</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "290px",
                gap: "20px",
              }}
            >
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link>
              <span style={{ fontWeight: "bolder" }}>Forgot password?</span>
            </Link>
            <div>
              <button type="submit">Login</button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>Have no account yet?</span>
              <Link to={"/signup"} style={{ fontWeight: "bold" }}>
                SIGN UP
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
