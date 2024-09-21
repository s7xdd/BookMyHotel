import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

const SearchProducts = () => {
    const {search} = useParams()
  return (
    <div>
        <Header/>
        <div>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default SearchProducts