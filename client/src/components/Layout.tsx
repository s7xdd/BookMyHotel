import { Navbar } from "react-bootstrap"
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <div>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout