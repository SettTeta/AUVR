import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import Footer from '../components/footer'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Banner from '../public/banner1.webp'

function HomePage({ videos }) {
    const [activePanel, setActivePanel] = useState(null);
    const [shuffledVideos, setShuffledVideos] = useState([]);

    useEffect(() => {
        // Shuffle the videos array when the component mounts
        const shuffled = [...videos].sort(() => Math.random() - 0.5);
        setShuffledVideos(shuffled);
    }, [videos]);

    function renderExpandCards() {
        const videosPerRow = 4;
        const rows = Math.ceil(shuffledVideos.length / videosPerRow);

        const renderRow = (startIndex) => {
            const rowVideos = shuffledVideos.slice(startIndex, startIndex + videosPerRow);

            return (
                <div key={startIndex} className="row mb-4">
                    <div className="expand-container-card" style={{ position: "relative", width: "100%", height: "auto", marginBottom: "10px", borderRadius: "20px" }}>
                        {rowVideos.map((src, index) => (
                            <div key={index} className={`panel ${activePanel === startIndex + index ? 'active' : ''}`} style={src.player === "vimeo" ? { backgroundImage: `url('https://vumbnail.com/${src.urlID}.jpg')` } : { backgroundImage: `url('http://i2.ytimg.com/vi/${src.urlID}/mqdefault.jpg')` }} onClick={() => handlePanelClick(startIndex + index, src._id)}>
                                <Link href={`/browse/${src._id}`}>
                                    <h3 style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, -50%)", color: "white", textShadow: "2px 2px 0px black" }}>
                                        <Button className="" variant="contained" color='error'>{src.title}</Button>
                                    </h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        const handlePanelClick = (panelIndex, id) => {
            // setActivePanel(panelIndex === activePanel ? window.location.href = `/browse/${id}` : panelIndex);
            setActivePanel(panelIndex === activePanel ? null : panelIndex);

        };

        return (
            <>
                <div className='container'>
                    {Array.from({ length: rows }, (_, index) => renderRow(index * videosPerRow))}
                </div>
            </>
        )
    }

    return (
        <main role="main" className='main'>

            <Head>
                <title>VR Tours - Home</title>
                <meta name="description" content="A VR Video Hosting platform" />
            </Head>

            <Header></Header>

            <div style={{
                position: 'fixed',
                height: "100vh",
                width: "100vw",
                marginTop: "10vh",
                backgroundImage: `url(${Banner.src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}>

                <div className="content p-0 text-center bg-image" style={{ height: "100vh", top: "0", position: "relative", background: "rgba(0, 0, 0, 0.4)", width: "100%" }}>
                </div>
            </div>

            <div className="content p-0 text-center bg-image" style={{ height: "100vh", top: "0", position: "relative", width: "100%" }}>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div >
                        <h1 className="mb-3" style={{ color: "white", textShadow: "2px 2px 0px black" }}>Welcome to AUVR</h1>
                        <h4 className="mb-3" style={{ color: "white", textShadow: "2px 2px 0px black" }}>Start searching through our collection of VR Videos in Assumption University</h4>
                        <br></br>
                        <Link href="/browse" style={{textDecoration:"none"}}> <Button variant='contained' size='large'> Search <SearchIcon fontSize='large' style={{paddingLeft:"10px"}}/></Button> </Link>
                    </div>
                </div>
            </div>

            <div className="content p-0 text-center bg-image" style={{ height: "auto", top: "0", position: "relative", width: "100%" }}>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div >
                        <h4 className="mb-3" style={{ color: "white", textShadow: "2px 2px 0px black" }}>Or watch them now...</h4>
                        <br></br>
                    </div>
                </div>
                {renderExpandCards()}

            </div>


            <Footer />

        </main>
    )
}

export default HomePage

export async function getServerSideProps() {
    const vid = await fetch(`https://auvr.vercel.app/api/browse/videos`)
    const videos = await vid.json()
    return { props: { videos } }
}



// import * as React from 'react'
// import Head from 'next/head'
// import Link from 'next/link'
// import Header from '../components/header'
// import Footer from '../components/footer'

// function HomePage() {
//   const [isHoveringLeft, setIsHoveringLeft] = React.useState(false);

//   const handleMouseOverLeft = () => {
//     setIsHoveringLeft(true);
//   };

//   const handleMouseOutLeft = () => {
//     setIsHoveringLeft(false);
//   };

//   return (
//     <main role="main">
//       <Head>
//         <title>VR Tours - Home</title>
//         <meta name="description" content="A VR Video Hosting platform" />
//       </Head>

//       <Header />

//       <div>
//         <h1>Split handling page</h1>
//         <div
//           className={isHoveringLeft ? "hover-left" : "hover-right"}
//           style={{ position: "relative", width: "100vw", height: "100vh", background: "black" }}
//         >
//           <div
//             className="split left"
//             onMouseOver={handleMouseOverLeft}
//             onMouseOut={handleMouseOutLeft}
//           >
//             <h1
//               style={{ position: "absolute", color: "white", left: "50%", top: "20%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
//             >
//               IMMERSE
//             </h1>
//             <Link
//               className="btn btn-outline-light btn-lg"
//               href="/story"
//               role="button"
//               style={{position:'absolute', left:"50%", top:"30%", transform:"translateX(-50%)", width:"15rem", fontWeight:"bold", textTransform:"uppercase"}}
//             >
//               Immerse
//             </Link>
//           </div>
//           <div className="split right">
//             <h1
//               style={{ position: "absolute", color: "white", left: "50%", top: "20%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
//             >
//               BROWSE
//             </h1>
//             <Link
//               className="btn btn-outline-light btn-lg"
//               href="/browse"
//               role="button"
//               style={{position:'absolute', left:"50%", top:"30%", transform:"translateX(-50%)", width:"15rem", fontWeight:"bold", textTransform:"uppercase"}}
//             >
//               Browse
//             </Link>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </main>
//   )
// }

// export default HomePage





{/* <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" >

                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div className="carousel-inner">

                        <div className="carousel-item active" >
                            <video autoPlay loop muted style={{ position: "absolute", right: "0", bottom: "0", minWidth: "100%", minHeight: "100%" }}>
                                <source src="https://mdbcdn.b-cdn.net/img/video/Tropical.mp4" type="video/mp4" />
                            </video>

                            <div className="content p-0 text-center bg-image" style={{ height: "100vh", position: "relative", right: "0", bottom: "0", background: "rgba(0, 0, 0, 0.6)", color: "#f1f1f1", width: "100%" }}>
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <div className="text-white">
                                        <h1 className="mb-3">Welcome to our VR Hosting Platform</h1>
                                        <h4 className="mb-3">Here is a collection of VR Videos that are tailored to your liking</h4>
                                        <br></br>
                                        <Link className="btn btn-outline-light btn-lg" href="/browse" role="button">Click here to Start Browsing</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <video autoPlay loop muted style={{ position: "absolute", right: "0", bottom: "0", minWidth: "100%", minHeight: "100%" }}>
                                <source src="https://mdbcdn.b-cdn.net/img/video/forest.mp4" type="video/mp4" />
                            </video>

                            <div className="content p-0 text-center bg-image" style={{ height: "100vh", position: "relative", bottom: "0", background: "rgba(0, 0, 0, 0.6)", color: "#f1f1f1", width: "100%" }}>
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <div className="text-white">
                                        <h1 className="mb-3">Have not visted Before?</h1>
                                        <h4 className="mb-3">Then just go to our Getting Started Page to learn how to use</h4>
                                        <br></br>
                                        <Link className="btn btn-outline-light btn-lg" href="/gettingStarted" role="button">How To Use</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <video autoPlay loop muted style={{ position: "absolute", right: "0", bottom: "0", minWidth: "100%", minHeight: "100%" }}>
                                <source src="https://mdbcdn.b-cdn.net/img/video/Agua-natural.mp4" type="video/mp4" />
                            </video>

                            <div className="content p-0 text-center bg-image" style={{ height: "100vh", position: "relative", bottom: "0", background: "rgba(0, 0, 0, 0.6)", color: "#f1f1f1", width: "100%", paddingTop: "56.25%" }}>
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <div className='container'>
                                        <div className="text-white" style={{ paddingBottom: "50px" }}>
                                            <h4 className="mb-3">Here is a Teaser of What to Expect</h4>
                                        </div>
                                        <div className="container" style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%" }}>
                                            <iframe width="921" height="518" src="https://www.youtube.com/embed/wnrHCMI1FNs" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>*/}