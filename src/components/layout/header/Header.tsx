"use client";

import React, { useEffect, useState } from 'react'
import scss from "./Header.module.scss"
import { links } from '@/constants/links'
import Link from 'next/link'
import { IoMdSearch } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/useAuthStore';
import { FaUserCircle } from "react-icons/fa";
import AuthModal from '@/components/pages/auth/AuthModal';
import BurgerButton from '@/components/ui/burgerButton/BurgerButton';
import BurgerMenu from '@/components/ui/burgerMenu/BurgerMenu';
import SearchModal from '@/components/shared/SearchModal';
import { useSearchModalStore } from '@/store/useSearchModalStore';

const Header = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const {data: session} = useSession()
  const { openModal } = useAuthStore(); 
  const { openModals } = useSearchModalStore();  



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <header className={scss.Header}>
        <div className="container">
            <div className={scss.content}>
                <div className={scss.left}>
                  <Link href="/">
                  <div className={scss.logo}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnsSYN97mgmGOteZPaoh3z-OzCT9mU01uec75tPQZzO-LiS_b" alt="" />
                    <h1>A movie</h1>
                  </div>
                  </Link>
                </div>
                <div className={scss.right}> 
                  {
                    isMobile ? (
                      <div className={scss.layoutForMob}>
                        {/* <h1>mobile</h1> */}
                        <div style={{marginTop: "5px", marginRight: "5px"}} onClick={openModals}> <IoMdSearch/> </div>
                        <BurgerButton/>
                        <BurgerMenu/>
                      </div>
                    ) : (
                      <nav className={scss.nav}>
                    <ul>
                      {
                        links.map((item, index) => (
                          <li key={index}>
                            <Link className={
                              pathname === item.href ? `${scss.link} ${scss.active}` : `${scss.link}`
                            } href={item.links}>{item.name}</Link>
                          </li>
                        ))
                      }
                      <IoMdSearch onClick={openModals}/>
                    </ul> 
                  </nav>
                    )
                  }
                  <div className={scss.auth}>
                    {
                      session ? (
                        <div className={scss.trueAuth} onClick={openModal}>
                          <img src={session.user?.image!} alt="" />
                        </div>
                      ) : (
                        <div className={scss.falseAuth} onClick={openModal}>
                          <FaUserCircle/>
                        </div>
                      )
                    }
                  </div>
                </div>
            </div> 
        </div>
        <AuthModal/>
        <SearchModal/>
    </header>
  )
}

export default Header