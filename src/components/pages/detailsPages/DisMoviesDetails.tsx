"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Импортируйте useParams
import scss from "./DisMoviesDetails.module.scss";
import { useGetMovieDetailsQuery } from "@/redux/api/details";
import { useVideoModalStore } from "@/store/useVideoModalStore";
import { useGetVideosQuery } from "@/redux/api/videos";
import { CiPlay1 } from "react-icons/ci";
import VideoModal from "@/components/ui/videoModal/VideoModal";
import { useGetCreditsQuery } from "@/redux/api/credits";
import { useGetSimilarMoviesQuery } from "@/redux/api/similar";
import Link from "next/link";
import { Progress, ProgressProps } from 'antd';
import Loader from "@/components/ui/loader/Loader";

interface Actor {
  id: number;
  profile_path: string;
  name: string;
  character: string;
}

const DisMoviesDetails = () => {
  const { id } = useParams();

  const { data: itemDetails } = useGetMovieDetailsQuery(Number(id));
  
  const {
    data: movieDetails,
  } = useGetMovieDetailsQuery(Number(id));

  const { data: creditsData } = useGetCreditsQuery(itemDetails?.id! );
  const { data: videosData } = useGetVideosQuery(itemDetails?.id!);
  const { data: similarData } = useGetSimilarMoviesQuery(itemDetails?.id!);

  const openModal = useVideoModalStore((state) => state.openModal);

  const getYearFromDate = (releaseDate: string): string => {
    if (!releaseDate) return "";
    return releaseDate.split("-")[0];
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const roundToOneDecimal = (num: number): number => {
    return Math.round(num * 10) / 10;
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

  function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  const conicColors: ProgressProps['strokeColor'] = {
    '0%': 'red',
    '50%': 'orange',
    '100%': 'green',
  };

  const [isLoadinger, setIsLoadinger] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadinger(false);
    }, 2000);

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
    <section className={scss.DisMoviesDetails}>
      {itemDetails?.backdrop_path && (
        <img
          className={scss.BgImage}
          src={`https://image.tmdb.org/t/p/w500${itemDetails?.backdrop_path}`}
          alt="bg_img"
        />
      )}
      <div className="container">
        <div className={scss.content_for_movies}>
          <div className={scss.content_img}>
            <img
              src={`https://image.tmdb.org/t/p/w500${itemDetails?.backdrop_path}`}
            />
          </div>

          <div className={scss.content_text}>
            <div className="container_for_details">
              <h1>
                {itemDetails?.title} ({" "}
                {getYearFromDate(itemDetails?.release_date!)} )
              </h1>
              <h3>{itemDetails?.tagline}</h3>

              <div className={scss.content_genres}>
                {itemDetails?.genres?.map((genre) => (
                  <div key={genre.id}>
                    <button>{genre.name}</button>
                  </div>
                ))}
              </div>

              <div className={scss.content_player}>
                <div className={scss.content_rank}>
                <Progress size={80} format={(percent) => (<span style={{color: 'white'}}>{percent}</span>)} strokeWidth={10} strokeColor={conicColors}  strokeLinecap="butt" type="circle" percent={roundToOneDecimal(itemDetails?.vote_average!) * 10}  />
                </div>
                {videosData?.results.slice(0, 1).map((item) => (
                  <div key={item.id}>
                    <div
                      onClick={() => openModal(item.key)}
                      className={scss.content_play}
                    >
                      <CiPlay1 />
                    </div>
                  </div>
                ))}
                <h1>Watch Trailer</h1>
              </div>

              <div className={scss.content_overview}>
                <h1>Overview</h1>
                <p>{itemDetails?.overview}</p>
              </div>

              <div className={scss.content_table}>
                <div className={scss.tab}>
                  <div className={scss.tab_item}>
                    <p>
                      Status: <span> {itemDetails?.status}</span>
                    </p>
                  </div>

                  <div className={scss.tab_item}>
                    <p>
                      Release date:{" "}
                      <span>
                        {getFormattedDate(itemDetails?.release_date!)}
                      </span>
                    </p>
                  </div>

                  <div className={scss.tab_item}>
                    <p>
                      Runtime:{" "}
                      <span>{formatDuration(itemDetails?.runtime!)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOP CAST */}
        <div className={scss.cast_content}>
          <h2>Top Cast</h2>
          <div className={scss.top_cast}>
            {creditsData?.cast?.length > 0 ? (
              creditsData.cast.map((actor: Actor) => (
                <div className={scss.top_cast_block} key={actor.id}>
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                    />
                  ) : (
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                      alt="Default profile"
                    />
                  )}
                  <div className={scss.cast_text}>
                    <p>{actor.name}</p>
                    <span>{actor.character}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No cast information available</p>
            )}
          </div>
        </div>

        {/* VIDEOS  */}
        <div className={scss.video_content}>
          <h2>Official videos</h2>
          <div className={scss.top_videos}>
            {videosData?.results.map((item) => (
              <div className={scss.videos_block} key={item.id}>
                <iframe
                  width="290"
                  height="164"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                {/* <h3>{item.name}</h3> */}
              </div>
            ))}
          </div>
        </div>

        {/* SIMILAR MOVIE  */}

        <div className={scss.Main_similar}>
          <h2>Similar Movies</h2>
          <div className={scss.similar_content}>
            {similarData?.results.map((item) => (
              <div className={scss.similarCard} key={item.id}>
                <Link key={item.id} href={`/similarDetails/${item.id}`}>
                {
                  item.poster_path ? ( 
                    <img
                    onClick={scrollToTop}
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

export default DisMoviesDetails;
