"use client";

import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import DisMoviesDetails from '@/components/pages/detailsPages/DisMoviesDetails';
import { useParams } from 'next/navigation'; // Импортируйте useParams
import React from 'react';

const Page = () => {
  const { id } = useParams(); 

  if (!id) {
    return <p>Invalid movie ID</p>;
  }

  return (
    <div>
      <Header/>
      <DisMoviesDetails movieId={id} />
      <Footer/>
    </div>
  );
};

export default Page;
