import React from 'react'
import ImageHeader from '../../../../assets/images/home-avatar.svg'
import Header from '../Header/Header'
import RecipeHeader from '../RecipeHeader/RecipeHeader'

function Home() {
    
    return (
        <>
        <Header  Bold={'Welcome'} title={' Upskilling'}  description={'This is a welcoming screen for the entry of the application , you can now see the options'} imgUrl ={ImageHeader}/>
    <RecipeHeader/>
    </>
    )
}

export default Home
