import React from 'react'
import Welcome from './homeSection/Welcome'
import Popular from './homeSection/Popular'
import Trending from './homeSection/Trending'
import TopRated from './homeSection/TopRated'

const HomePage = () => {
  return (
    <>
    <Welcome/>
    <Trending/>
    <Popular/>
    <TopRated/>
    </>
  )
}

export default HomePage