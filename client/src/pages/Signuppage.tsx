import { Link } from 'react-router-dom'
import '../styles/signuppage.css'
import Header from '../components/Header'

const Signuppage = () => {
  return (
    <div className='nav'>
        <Header/>
    <div className='signup_main container'>
        <div className='signup_inner'>
            <h1>Sign up</h1>
            <div style={{display: 'flex', flexDirection: 'column', width: '290px', gap: '20px'}}>
                <input type="text" placeholder='email'/>
                <input type="text" placeholder='username' />
                <input type="text" placeholder='password' />
            </div>
            <div>
                <button>Sign Up</button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '25px',alignItems: 'center', gap:'10px'}}>
                <span>Have an account?</span>
                <Link to={'/login'} style={{fontWeight: 'bold'}}>LOGIN</Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Signuppage