"use client";

import React, { useEffect, useState } from "react";
import styles from "./DisTV.module.scss";
import { useGetDiscoverTVQuery } from "@/redux/api/discoverTV";
import Link from "next/link";
import Loader from "@/components/ui/loader/Loader";

interface TVShow {
  id: number;
  name: string;
  backdrop_path: string | null;
}

const DisTV = () => {
  const { data } = useGetDiscoverTVQuery();
  const [isLoadinger, setIsLoadinger] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadinger(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoadinger) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.DisTvs}>
      <div className="container">
        <div className={styles.content}>
          <h2>Explore movies</h2>
          <div className={styles.main_disTV_list}>
            {data?.results.map((item: TVShow) => (
              <Link key={item.id} href={`/exTv/${item.id}`}>
                <div className={styles.disTVCard}>
                  {item.backdrop_path ? (
                    <img
                      onClick={scrollToTop}
                      src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                      alt=""
                    />
                  ) : (
                    <img
                      src="https://ecomovie.life/assets/no-poster-4xa9LmsT.png"
                      alt=""
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisTV;
