"use client"

import React from "react";
import { useParams } from "next/navigation";
import { CiPlay1 } from "react-icons/ci";
import { useGetTopRatedQuery } from "@/redux/api/topRated";
import scss from "./TopRatedDetails.module.scss";
import { useGetCreditsQuery } from "@/redux/api/credits";
import { useGetVideosQuery } from "@/redux/api/videos";
import { useGetSimilarMoviesQuery } from "@/redux/api/similar";
import { useVideoModalStore } from "@/store/useVideoModalStore";
import VideoModal from "@/components/ui/videoModal/VideoModal";
import Link from "next/link";
import { Progress, ProgressProps } from 'antd'; 


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

const TopRatedDetails = () => {
  const { id } = useParams();
  const { data: topRatedData } = useGetTopRatedQuery();
  const movieDetails = topRatedData?.results.find(
    (movie: Movie) => movie.id === parseInt(Array.isArray(id) ? id[0] : id)
  );

  const { data: creditsData } = useGetCreditsQuery(movieDetails?.id);
  const { data: videosData } = useGetVideosQuery(movieDetails?.id);
  const { data: similarData } = useGetSimilarMoviesQuery(movieDetails?.id);
  const openModal = useVideoModalStore((state) => state.openModal);

  if (!movieDetails || !creditsData) return <div>Loading...</div>;

  const getYearFromDate = (releaseDate: string): string => {
    return releaseDate ? releaseDate.split("-")[0] : "";
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const getFormattedDate = (dateString: string): string => {
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
    '0%': 'red',
    '50%': 'orange',
    '100%': 'green',
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };


  return (
    <section className={scss.TopRatedDetails}>
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
            <h1>
              {movieDetails.title} ({getYearFromDate(movieDetails.release_date)})
            </h1>

            <div className={scss.watched_block}>
              <div className={scss.movie_rate}>
              <Progress size={80} format={(percent) => (<span style={{color: 'white'}}>{percent}</span>)} strokeWidth={10} strokeColor={conicColors}  strokeLinecap="butt" type="circle" percent={roundToOneDecimal(movieDetails.vote_average) * 10}  />
              </div>
              {videosData?.results.slice(0, 1).map((video) => (
                <div key={video.id} className={scss.play_icon} onClick={() => openModal(video.key)}>
                  <CiPlay1 />
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
              Release Date: <span>{getFormattedDate(movieDetails.release_date)}</span>
            </p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
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

        {/* Videos Section */}
        <div className={scss.video_content}>
          <h2>Official Videos</h2>
          <div className={scss.top_videos}>
            {videosData?.results.map((video) => (
              <div className={scss.videos_block} key={video.id}>
                <iframe
                  width="290"
                  height="164"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  frameBorder="0" 	                                  
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Movies Section */}
        <div className={scss.similar_content}>
          <h2>Similar Movies</h2>
          <div className={scss.similar_content_grid}>
            {similarData?.results.map((similarMovie) => (
              <div className={scss.similarCard} key={similarMovie.id}>
                <Link key={similarMovie.id} href={`/similarDetails/${similarMovie.id}`}>
                {
                  similarMovie.poster_path ? ( 
                    <img
                    onClick={scrollToTop}
                    src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                    alt={similarMovie.title}
                  />
                  ) : (
                    <img src="https://ecomovie.life/assets/no-poster-4xa9LmsT.png" alt="" />
                  )
                }
                </Link>
                <h3>{truncateText(similarMovie.title, 18)}</h3>
                {similarMovie.release_date && (
                  <p>{getFormattedDate(similarMovie.release_date)}</p>
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

export default TopRatedDetails;
