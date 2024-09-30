import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children}) => {
  return (
    <div>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout