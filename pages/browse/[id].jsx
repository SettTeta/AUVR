import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

import dynamic from "next/dynamic";
const YouTube = dynamic(() => import("../../node_modules/react-player/youtube"), { ssr: false });
const Vimeo = dynamic(() => import("../../node_modules/react-player/vimeo"), { ssr: false });

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function Video({ video }) {

    if (!video)
        return (
            <div style={{ marginTop: "10vh" }}>
                <p>Video not found</p>
                <Link href="/browse">Back</Link>
            </div>
        );

    const PlayerComponent = video.player === "vimeo" ? Vimeo : YouTube;

    return (
        <>
            <Head>
                <title>{video.title}</title>
            </Head>

            <Header />

            {/* <section className="jumbotron" style={{ marginTop: "10vh" }}>
                <div className="container">
                    <br />
                </div>
            </section> */}

            <div className="album py-5 bg-light" style={{ marginTop: "10vh" }}>
                <div>
                    <div className="row g-0">
                        <div className="card mb-3 player-container" style={{ padding: "1%" }}>
                            <h2 className="jumbotron-heading" style={{paddingBottom: "20px", justifyContent: "left", display: "flex", borderBottom: "solid 0.5pt" }}>{video.title}</h2>

                            <div className="player-wrapper">
                                <PlayerComponent
                                    url={(video.player === "vimeo") ? `https://vimeo.com/${video.urlID}` : `https://www.youtube.com/embed/${video.urlID}`}
                                    className="react-player"
                                    playing
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                            </div>

                            <h1 className="jumbotron-heading" style={{ borderTop: "solid 0.5pt", paddingBottom: "10px" }}></h1>

                            <div >
                                <h6><DescriptionOutlinedIcon />  Description:</h6>
                                <p className="card-text" style={{ fontSize: "1rem" }}>{video.desc}</p>
                            </div>

                            <h1 className="jumbotron-heading" style={{ borderTop: "solid 0.5pt", paddingBottom: "0px", marginTop: "20px" }}></h1>


                            <div className="jumbotron-heading" style={{ justifyContent: "left", display: "flex", opacity: "0.5", fontSize: "1rem" }}>{video.location} | {video.type} | {video.dateOfUpload} </div>



                            {/* <p className="card-text" style={{}}></p>

                            <div className="row">


                                <div className="col-md-1 d-flex justify-content-center">
                                    <p className="card-text"><LocationOnOutlinedIcon /> <br />{video.location}</p>
                                </div>
                                <div className="col-md-1">
                                    <p className="card-text"><TimelapseOutlinedIcon /> <br />{video.duration}</p>
                                </div>
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-1">
                                    <h5 className="card-title"><CalendarMonthOutlinedIcon />:</h5>
                                    <p className="card-text">{video.type}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* <div className="row g-0 player-container" style={{ display: "flex", left:"50%" }}>
                        <div style={{ padding: "20px" }}>
                            <div className="card card-body">
                                <div className="row g-200">
                                    <div className="col-md-12">
                                        <h1 className="jumbotron-heading" style={{ paddingBottom: "50px", justifyContent: "center", display: "flex" }}>{video.title}</h1>

                                        <div className="row">
                                            <div className="col-md-8">
                                                <h5><DescriptionOutlinedIcon />  Description:</h5>
                                                <p className="card-text">{video.desc}</p>
                                            </div>

                                            <div className="col-md-1 d-flex justify-content-center">
                                                <p className="card-text"><LocationOnOutlinedIcon /> <br />{video.location}</p>
                                            </div>
                                            <div className="col-md-1">
                                                <p className="card-text"><TimelapseOutlinedIcon /> <br />{video.duration}</p>
                                            </div>
                                            <div className="col-md-1">
                                                <p className="card-text"><CalendarMonthOutlinedIcon /> <br />{video.dateOfUpload}</p>
                                            </div>
                                            <div className="col-md-1">
                                                <h5 className="card-title"><CalendarMonthOutlinedIcon />:</h5>
                                                <p className="card-text">{video.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `https://auvr.vercel.app/api/browse/videos/${params.id}`
    );
    const video = await res.json();
    return { props: { video } };
}
