import React from 'react';
import '../styles/navbar.css'
import Header from './Header'

class Navbar extends React.Component {
    listener = null;
    state = {
      nav: false,
    };
    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }
  
    handleScroll = () => {
      if (window.scrollY > 70) {
        if (!this.state.nav) {
          this.setState({ nav: true });
        }
      } else {
        if (this.state.nav) {
          this.setState({ nav: false });
        }
      }
    };
  
    render() {
      return (
        <div>
          <div className={`Nav ${this.state.nav && "Nav__black"}`}>
            <Header />
          </div>
        </div>
      );
    }
  }
export default Navbar