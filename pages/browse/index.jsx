import Header from 'components/header'
import * as React from 'react'
import VideoCard from 'components/Card.js'
import ScrollCard from 'components/CardForScroll.js'
import Head from 'next/head'
import { useState } from "react";
import Link from 'next/link'

export default function BrowsePage({ videos }) {

  const [videosToShow, setVideosToShow] = useState(6);
  const [showOnlyTrue, setShowOnlyTrue] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");


  function loadMoreVideos() {
    setVideosToShow(videosToShow + 3);
  }

  function renderVideoCard(video) {
    return (
      <VideoCard
        key={video._id}
        title={video.title}
        link={video.youtube}
        thumbnail={video.thumbnail}
        desc={video.desc}
        onView={video._id}
        duration={video.duration}
        location={video.location}
        dOU={video.dateOfUpload}
      />
    );
  }

  function search() {
    setSearchValue("");
    setVideosToShow(6);
  }


  function renderVideoCards() {
    const videosToDisplay = videos
      .filter(video => {
        if (showOnlyTrue) {
          return video.type === true;
        } else {
          return video.type === false;
        }
      })
      .filter(video => {
        return video.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      .slice(0, videosToShow);
    return videosToDisplay.map(renderVideoCard);
  }

  function handleShowAllClick() {
    setShowOnlyTrue(false);
    setActiveTab("all");
  }

  function handleShowOnlyTrueClick() {
    setShowOnlyTrue(true);
    setActiveTab("true");
  }


  if (!videos) return (
    <div>
      <p>Videos not found</p>
      <Link href="/browse">Back</Link>
    </div>
  );

  return (
    <main role="main">
      <div>
        <Head>
          <title>VR Tours</title>
          <meta name="description" content="A VR Video Hosting platform" />
        </Head>
      </div>

      <Header />

      <section className="jumbotron text-center">
        <div className="container">
          <br></br>
          <h1 className="jumbotron-heading">VR Videos just for you</h1>
          <p className="lead text-muted">
            Browse our collection of VR videos and view them with your full entertainment
          </p>
        </div>
      </section>

      <br />

      <div className="input-group rounded" style={{ padding: "0 15% 0 15%" }}>
        <input type="search" className="form-control rounded" placeholder="Thailand" aria-label="Search" aria-describedby="search-addon" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <span className="input-group-text border-0" id="search-addon">
          <i className="fas fa-search" onClick={search}>Clear</i>
        </span>
      </div>

      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className={`nav-link ${activeTab === "all" ? "active" : ""}`} href="" onClick={handleShowAllClick} >360 VR Tour</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${activeTab === "true" ? "active" : ""}`} href="" onClick={handleShowOnlyTrueClick} >Interactive Tour</Link>
          </li>
        </ul>
      </div>

      {/* <div className="album py-5 bg-light">
        <div className="container-xxl content-row">
          <div className="row">
            {renderVideoCards()}
            {videosToShow < videos.length && (
              <button className="btn btn-secondary" onClick={loadMoreVideos}>Load more</button>
            )}
          </div>
        </div>
      </div> */}

      <div className='container' style={{paddingBottom:"1rem"}} >
        <h1 style={{paddingLeft:"3rem", paddingBottom:"1rem"}}>Leisure</h1>
        <div className="container" style={{ display: "flex", overflowX: "scroll", width: "100%", height: "520px" }}>
          {videos.map(src => (
            <div
              key={src}
              className="scroll"
            >
              <ScrollCard
                title={src.title}
                link={src.youtube}
                thumbnail={src.thumbnail}
                desc={src.desc}
                onView={src._id}
                duration={src.duration}
                location={src.location}
                dOU={src.dateOfUpload}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='container' style={{paddingBottom:"1rem"}} >
        <h1 style={{paddingLeft:"3rem", paddingBottom:"1rem"}}>Facilities</h1>
        <div className="container" style={{ display: "flex", overflowX: "scroll", width: "100%", height: "520px" }}>
          {videos.map(src => (
            <div
              key={src}
              className="scroll"
            >
              <ScrollCard
                title={src.title}
                link={src.youtube}
                thumbnail={src.thumbnail}
                desc={src.desc}
                onView={src._id}
                duration={src.duration}
                location={src.location}
                dOU={src.dateOfUpload}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='container' style={{paddingBottom:"1rem"}} >
        <h1 style={{paddingLeft:"3rem", paddingBottom:"1rem"}}>Monuments</h1>
        <div className="container" style={{ display: "flex", overflowX: "scroll", width: "100%", height: "520px" }}>
          {videos.map(src => (
            <div
              key={src}
              className="scroll"
            >
              <ScrollCard
                title={src.title}
                link={src.youtube}
                thumbnail={src.thumbnail}
                desc={src.desc}
                onView={src._id}
                duration={src.duration}
                location={src.location}
                dOU={src.dateOfUpload}
              />
            </div>
          ))}
        </div>
      </div>


    </main>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://sp-2-eta.vercel.app/api/browse/videos`)
  const videos = await res.json()
  console.debug('blog 1', videos)
  return { props: { videos } }
}

