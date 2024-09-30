import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import '../styles/SearchProducts.css'

const SearchProducts = () => {
    const {search} = useParams()
    useEffect(() => {

    })
  return (
    <div>
        <Header/>
        <div>
            <div>
                {search}
            </div>
        </div>
    </div>
  )
}

export default SearchProducts