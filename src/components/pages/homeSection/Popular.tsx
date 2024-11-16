"use client";

import React from "react";
import scss from "./Popular.module.scss";
import { useGetPopularQuery } from "@/redux/api/popular";
import Link from "next/link";

interface Popular {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
}

const Popular = () => {
  const { data } = useGetPopularQuery();

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const getFormattedDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className={scss.Popular}>
      <div className="container">
        <div className={scss.content}>
          <h2>What's Popular</h2>
          <div className={scss.main_popular_list}>
            {data?.results.map((item: Popular) => (
              <div key={item.id} className={scss.popularCard}>
                <Link href={`/popular/${item.id}`}>
                  {item.backdrop_path ? (
                    <img
                      onClick={scrollToTop}
                      src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                      alt={item.title}
                      className={scss.poster}
                    />
                  ) : (
                    <img
                      src="https://ecomovie.life/assets/no-poster-4xa9LmsT.png"
                      alt=""
                    />
                  )}
                  <h3>{truncateText(item.title, 18)}</h3>
                </Link>
                {item.release_date && (
                  <p>{getFormattedDate(item.release_date)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
