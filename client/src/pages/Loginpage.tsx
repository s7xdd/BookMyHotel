import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/loginpage.css'
import Header from '../components/Header'

const Loginpage = () => {
  return (
    <div className='nav'>
        <Header/>
    <div className='login_main container'>
        <div className='login_inner'>
            <h1>Login</h1>
            <div style={{display: 'flex', flexDirection: 'column', width: '290px', gap: '20px'}}>
                <input type="text" placeholder='username' />
                <input type="text" placeholder='password' />
            </div>
            <Link><span style={{fontWeight: 'bolder'}}>Forgot password?</span></Link>
            <div>
                <button>Login</button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '30px',alignItems: 'center', gap:'10px'}}>
                <span>Have no account yet?</span>
                <Link to={'/signup'} style={{fontWeight: 'bold'}}>SIGN UP</Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Loginpage