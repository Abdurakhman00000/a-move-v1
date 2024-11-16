"use client";

import React, { useEffect, useState } from "react";
import scss from "./Welcome.module.scss";
import { ReactTyped } from "react-typed";
import { useGetUpcomingQuery } from "@/redux/api/upcoming";
import SearchByKeyword from "@/components/shared/SearchByKeyword";

const Welcome = () => {
  const { data, isLoading } = useGetUpcomingQuery();
  const [bgImageUrl, setBgImageUrl] = useState<string>("");

  const bgRandomImage = () => {
    const randomImage = Math.floor(Math.random() * data?.results.length!);
    const backdropImage = data?.results[randomImage].backdrop_path;
    if(backdropImage) {
      setBgImageUrl(`https://image.tmdb.org/t/p/original${backdropImage}`)
    }
  };

  // console.log(bgImageUrl) 

  useEffect(() => {
    if(!isLoading) {
      bgRandomImage();
    }
  }, [data]);

  

  return (
    <section className={scss.Welcome}>
      {bgImageUrl && (<img className={scss.BgImage} src={bgImageUrl} alt="bg_img" />)}
      <div className="container">
        <div className={scss.content}>
          <div className={scss.WelcomeContent}>
            <h1>
              <ReactTyped
                strings={[
                  "Welcome to EcoMovie <br/> - Enjoy the Show!",
                  "Discover Movie Magic <br/> at EcoMovie!",
                  "Get Ready for <br/> Cinematic Bliss|"
                ]}
                typeSpeed={50}
                backSpeed={30}
                loop
                smartBackspace={false}
              />
            </h1>
            <div className={scss.welcomeInput}>
              <p>
                Millions of movies, TV shows and people to discover. Explore
                now.
              </p>
              <SearchByKeyword/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
