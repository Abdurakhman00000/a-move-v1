import React from "react";
import scss from "./BurgerMenu.module.scss";
import { links } from "@/constants/links";
import Link from "next/link";
import { useHeaderStore } from "@/store/useHeaderStore";


const BurgerMenu = () => {
  const { isOpen, closeMenu } = useHeaderStore();

  return (
    <section
      className={
        isOpen ? `${scss.BurgerMenu} ${scss.active}` : `${scss.BurgerMenu}`
      }
    >
      <div className={scss.content}>
        <nav className={scss.nav}>
          <ul>
            {links.map((item, index) => (
              <li key={index}>
                <Link onClick={closeMenu} href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default BurgerMenu;
