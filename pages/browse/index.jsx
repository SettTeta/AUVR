import Header from '../../components/header'
import Footer from '../../components/footer'
import * as React from 'react'
import VideoCard from '../../components/Card.js'
import ScrollCard from '../../components/CardForScroll.js'
import Head from 'next/head'
import { useState } from "react";
import Link from 'next/link'

export default function BrowsePage({ videos }) {

  const [videosToShow, setVideosToShow] = useState(6);
  const [searchValue, setSearchValue] = useState("");


  function loadMoreVideos() {
    setVideosToShow(videosToShow + 3);
  }

  function renderVideoCard(video) {
    return (
      <ScrollCard
        key={video._id}
        title={video.title}
        link={video.youtube}
        type={video.type}
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


  function renderVideoRow(vidType) {
    const videosToDisplay = videos
      .filter(video => {
        return (
          video.title.toLowerCase().includes(searchValue.toLowerCase()) &&
          video.type === vidType
        );
      })
      .slice(0, videosToShow);
    return (
      <div className='container' style={{ paddingBottom: "1rem" }} key={vidType}>
        <h1 style={{ paddingLeft: "3rem", paddingBottom: "0.2rem", background: "#aa1e2d", color: "white", borderRadius: "10px", paddingTop: "5px" }}>{vidType}</h1>
        <div className="container" style={{ display: "flex", overflowX: "scroll", width: "100%", height: "270px" }}>
          {videosToDisplay.map(src => (
            <div
              className="scroll"
              key={src._id}
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
    );
  }



  if (!videos) return (
    <div style={{ marginTop: "10vh" }}>
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

      <section className="jumbotron text-center" style={{
        marginTop: "5vh",
        position: 'relative',
        height: "50vh",
        // backgroundImage: "url('https://media.istockphoto.com/id/1379108916/vector/metaverse-technology-background.jpg?s=612x612&w=0&k=20&c=BhoTlueNSWAXnanIpiZ6PlXO5ZXOD_eOquQ_NIEuZQk=')",
        backgroundImage: "url('https://t3.ftcdn.net/jpg/05/16/23/48/360_F_516234867_emyTMrlCbP8UWGXJmVHfPpEGmbMbkXXh.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <div className="content p-0 text-center bg-image" style={{ height: "50vh", top: "0", position: "absolute", background: "rgba(0, 0, 0, 0.4)", width: "100%" }}>

          <div className="container">
            <br />
            <br />
            <br />
            <br />
            <br />

            <h1 className="jumbotron-heading" style={{ color: "white", textShadow: "2px 2px 0px black" }}>VR Videos just for you</h1>
            <p className="lead" style={{ color: "white", textShadow: "2px 2px 0px black" }}>
              Browse our collection of VR videos and view them with your full entertainment
            </p>

          </div>

          <br />
          <br />

          <div className="input-group rounded" style={{ padding: "0 15% 0 15%" }}>
            <input type="search" className="form-control rounded" placeholder="Thailand" aria-label="Search" aria-describedby="search-addon" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search" onClick={search}>Clear</i>
            </span>
          </div>
        </div>
      </section>


      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className={`nav-link ${activeTab === "all" ? "active" : ""}`} href="" onClick={handleShowAllClick} >360 VR Tour</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${activeTab === "true" ? "active" : ""}`} href="" onClick={handleShowOnlyTrueClick} >Interactive Tour</Link>
          </li>
        </ul>
      </div> */}

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

      <div className="album py-5 bg-light">
        {/* <div className='container' style={{ paddingBottom: "1rem" }} >
          <h1 style={{ paddingLeft: "3rem", paddingBottom: "0.2rem", background: "#aa1e2d", color: "white", borderRadius: "10px" }}>All</h1>
          <div className="container" style={{ display: "flex", overflowX: "scroll", width: "100%", height: "270px" }}>
            {videos.map(src => (
              <div
                className="scroll"
                key={src._id}
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
        </div> */}

        {renderVideoRow("Leisure")}
        {renderVideoRow("Facilities")}
        {renderVideoRow("Monuments")}


      </div>

      <Footer />
    </main>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://auvr.vercel.app/api/browse/videos`)
  const videos = await res.json()
  console.debug('blog 1', videos)
  return { props: { videos } }
}

