import { Link, Navigate } from 'react-router-dom'
import '../styles/signuppage.css'
import Header from '../components/Header'
import { useState } from 'react';
import axios from 'axios';

const Signuppage = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

    async function register(e){
        e.preventDefault();

        const data = {
            email: email,
            username: username,
            password: password 
        }

        axios.post(`${import.meta.env.VITE_URL}/register`, data).then(response => {
            alert('Registration success')
            setRedirect(true);
        }).catch((err) => {
            alert('User already exists')
        })
    }

    if(redirect){
        return <Navigate to={'/profile'}/>
    }

  return (
    <div className='nav'>
        <Header/>
    <div className='signup_main container'>
        <form onSubmit={register}>

        <div className='signup_inner'>
            <h1>Sign up</h1>
            <div style={{display: 'flex', flexDirection: 'column', width: '290px', gap: '20px'}}>
                <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder='username'  onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder='password'  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <button>Sign Up</button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '25px',alignItems: 'center', gap:'10px'}}>
                <span>Have an account?</span>
                <Link to={'/login'} style={{fontWeight: 'bold'}}>LOGIN</Link>
            </div>
        </div>
        </form>
    </div>
    </div>
  )
}

export default Signuppage