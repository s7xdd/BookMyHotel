import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react'
import Homepage from "./pages/Homepage";
const Productpage = lazy(() => import("./pages/Productpage"));
const Uniquepage = lazy(() => import("./pages/Uniquepage"));
import Layout from "./components/Layout";
const Loginpage = lazy(() => import("./pages/Loginpage"));
const Signuppage = lazy(() => import("./pages/Signuppage"));
const Allproducts = lazy(() => import("./pages/Allproducts"));
const Profilepage = lazy(() => import("./pages/Profilepage"));
const Listingspage = lazy(() => import("./pages/Listingspage"));
import { UserContextProvider } from "./UserContext";
const CreateListing = lazy(() => import("./pages/Newlistingpage"));

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Layout>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" Component={Homepage} />
              <Route path="/Unique stays" Component={Uniquepage} />
              <Route path="/explore" Component={Allproducts} />
              <Route path="/rooms/:product" Component={Productpage} />
              <Route path="/login" Component={Loginpage} />
              <Route path="/signup" Component={Signuppage} />
              <Route path="/profile" Component={Profilepage} />
              <Route path="/listings" Component={Listingspage} />
              <Route path="newlisting" Component={CreateListing}/>
            </Routes>
            </Suspense>
          </Router>
        </Layout>
      </UserContextProvider>
    </div>
  );
}

export default App;
