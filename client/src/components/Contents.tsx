import { Link } from 'react-router-dom'
import '../styles/contents.css'

const Contents = ({img, title, description, amount, big, id}) => {
  return (
    <div className='contents'>
        <div className={big ? "bigcontents_list" : "contents_list"} key={id}>
            <Link to={`/rooms/${title}`}>
            <img src={img}  width={'100%'} alt="contents" />
            <div className="content_des">
                <h3>{title}</h3>
                <h6>{description}</h6>
                <h3>{amount}</h3>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Contents