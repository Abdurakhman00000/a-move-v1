"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import scss from "./PopularDetails.module.scss";
import { CiPlay1 } from "react-icons/ci";
import { useGetPopularQuery } from "@/redux/api/popular";
import { useGetCreditsQuery } from "@/redux/api/credits";
import { useGetVideosQuery } from "@/redux/api/videos";
import { useGetSimilarMoviesQuery } from "@/redux/api/similar";
import { useVideoModalStore } from "@/store/useVideoModalStore";
import VideoModal from "@/components/ui/videoModal/VideoModal";
import Link from "next/link";
import { Progress, ProgressProps } from 'antd';
import Loader from "@/components/ui/loader/Loader";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface Actor {
  id: number;
  profile_path: string;
  name: string;
  character: string;
}

const PopularDetails = () => {
  const { id } = useParams();

  

  const { data: popularData } = useGetPopularQuery();
  const movieDetails = popularData?.results.find(
    (movie: Movie) => movie.id === parseInt(Array.isArray(id) ? id[0] : id)
  );

  const { data: creditsData } = useGetCreditsQuery(movieDetails?.id);
  const { data: videosData } = useGetVideosQuery(movieDetails?.id);
  const { data: similarData } = useGetSimilarMoviesQuery(movieDetails?.id);

  const openModal = useVideoModalStore((state) => state.openModal);

  if (!movieDetails || !creditsData) return <div>Loading...</div>;

  const getYearFromDate = (releaseDate: string): string => {
    if (!releaseDate) return "";
    return releaseDate.split("-")[0];
  };

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

  const roundToOneDecimal = (num: number): number => {
    return Math.round(num * 10) / 10;
  };

  const conicColors: ProgressProps['strokeColor'] = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };


  // const [isLoadinger, setIsLoadinger] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoadinger(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoadinger) {
  //   return (
  //     <>
  //       <Loader />
  //     </>
  //   );
  // }


  return (
    <section className={scss.PopularDetails}>
      {movieDetails?.backdrop_path && (<img className={scss.BgImage} src={`https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`} alt="bg_img" />)}
      <div className="container">
        <div className={scss.content}>
          <div className={scss.content_img}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>

          <div className={scss.content_text}>
            <div className="container_for_details">
              <h1>
                {movieDetails.title} ({getYearFromDate(movieDetails.release_date)}
                )
              </h1>

              <div className={scss.watched_block}>
                <div className={scss.movie_rate}>
                <Progress size={80} format={(percent) => (<span style={{color: 'white'}}>{percent}</span>)} strokeWidth={10} strokeColor={conicColors}  strokeLinecap="butt" type="circle" percent={roundToOneDecimal(movieDetails.vote_average) * 10}  />
                </div>
                {videosData?.results.slice(0, 1).map((item) => (
                  <div key={item.id}>
                    <div
                      className={scss.play_icon}
                      onClick={() => openModal(item.key)}
                    >
                      <CiPlay1 />
                    </div>
                  </div>
                ))}
                <div className={scss.text}>
                  <h4>Watch Trailer</h4>
                </div>
              </div>

              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
              <div className={scss.tab}>
              <p>
                Release Date:{" "}
                <span>{getFormattedDate(movieDetails.release_date)}</span>
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* TOP CAST */}
        <div className={scss.cast_content}>
          <h2>Top Cast</h2>
          <div className={scss.top_cast}>
            {creditsData.cast.map((actor: Actor) => (
              <div className={scss.top_cast_block} key={actor.id}>
                {
                  actor.profile_path ? (
                    <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                  ) : (
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" alt="" />
                  )
                }
                <div className={scss.cast_text}>
                  <p>{actor.name}</p>
                  <span>{actor.character}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIDEOS */}
        <div className={scss.video_content}>
          <h2>Official Videos</h2>
          <div className={scss.top_videos}>
            {videosData?.results.map((item) => (
              <div
                className={scss.videos_block}
                key={item.id}
                onClick={() => openModal(item.key)}
              >
                <iframe
                  width="290"
                  height="164"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        {/* SIMILAR MOVIES */}
        <div className={scss.Main_similar}>
          <h2>Similar Movies</h2>
          <div className={scss.similar_content}>
            {similarData?.results.map((item) => (
              <div className={scss.similarCard} key={item.id}>
                <Link key={item.id} href={`/similarDetails/${item.id}`}>
                {
                  item.poster_path ? ( 
                    <img onClick={scrollToTop}
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                  />
                  ) : (
                    <img src="https://ecomovie.life/assets/no-poster-4xa9LmsT.png" alt="" />
                  )
                }
                </Link>
                <h3>{truncateText(item.title, 18)}</h3>
                {item.release_date && (
                  <p>{getFormattedDate(item.release_date)}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <VideoModal />
      </div>
    </section>
  );
};

export default PopularDetails;
