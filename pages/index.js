import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from 'components/header'

function HomePage() {
    return (
        <main role="main">

            <div>
                <Head>
                    <title>VR Tours - Home</title>
                    <meta name="description" content="A VR Video Hosting platform" />
                </Head>
            </div>

            <Header></Header>

            <div className="Container">
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" >

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

                            <div className="content p-0 text-center bg-image" style={{ height: "100vh", position: "relative", bottom: "0", background: "rgba(0, 0, 0, 0.6)", color: "#f1f1f1", width: "100%",  paddingTop: "56.25%" }}>
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <div className='container'>
                                        <div className="text-white" style={{ paddingBottom: "50px" }}>
                                            <h4 className="mb-3">Here is a Teaser of What to Expect</h4>
                                        </div>
                                        <div className="container" style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%"}}>
                                            <iframe width="921" height="518"  src="https://www.youtube.com/embed/wnrHCMI1FNs" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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
                </div>
            </div>

            {/* <div className="container">
                <div className="content p-0 text-center bg-image">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className='container'>
                            <div className="text-black" style={{ paddingBottom: "50px" }}>
                                <h4 className="mb-3">Here is a Teaser of What to Expect</h4>
                            </div>
                            <div>
                                <iframe width="80%"
                                    src="https://www.youtube.com/embed/wnrHCMI1FNs" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </main>
    )
}

export default HomePage