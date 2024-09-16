import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import Uniquepage from "./pages/Uniquepage";
import Layout from "./components/Layout";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Allproducts from "./pages/Allproducts";
import Profilepage from "./pages/Profilepage";
import Listings from "./pages/Listingspage";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Layout>
          <Router>
            <Routes>
              <Route path="/" Component={Homepage} />
              <Route path="/Unique stays" Component={Uniquepage} />
              <Route path="/explore" Component={Allproducts} />
              <Route path="/rooms/:product" Component={Productpage} />
              <Route path="/login" Component={Loginpage} />
              <Route path="/signup" Component={Signuppage} />
              <Route path="/profile" Component={Profilepage} />
              <Route path="/listings" Component={Listings} />
            </Routes>
          </Router>
        </Layout>
      </UserContextProvider>
    </div>
  );
}

export default App;
