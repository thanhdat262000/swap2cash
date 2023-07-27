import React from 'react';
import Introduction from './Introduction';
import ListBlog from './ListBlog';
import ListBanner from './ListBanner';

function HomePage() {
  return (
    <>
      <div className="home-container">
        <ListBanner />
        <Introduction />
        <ListBlog />
      </div>
    </>
  );
}

export default HomePage;
