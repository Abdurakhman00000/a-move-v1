"use client"

import React, { FC, ReactNode } from 'react'
import scss from "./Layout.module.scss"
import Header from './header/Header'
import Footer from './footer/Footer'
import { Snowfall } from 'react-snowfall';

interface ILayout {
    children: ReactNode;
}

const Layout: FC<ILayout> = ({children}) => {
  return (
    <div className={scss.Layout}>
      <Snowfall style={{position: "fixed", zIndex: "999"}} snowflakeCount={50}/>
        <Header/>
        <main>{children}</main>
        <Footer/>
    </div>
  )
}

export default Layout