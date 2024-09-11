import '../styles/footer.css'
import { FaGithub, FaLinkedin  } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer_container">
        <div className="footer_inner">
            <div>Copyright BookMyHotel 2024</div>
            <div className='socials'>
                <FaGithub size={25} />
                <FaLinkedin size={25}/>
            </div> 
        </div>
    </div>
  )
}

export default Footer