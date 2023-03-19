import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

import dynamic from "next/dynamic";
const YouTube = dynamic(() => import("../../node_modules/react-player/youtube"), { ssr: false });
const Vimeo = dynamic(() => import("../../node_modules/react-player/vimeo"), { ssr: false });

import Button from '@mui/material/Button';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function Video({ video }) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


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

            <section className="jumbotron" style={{ marginTop: "10vh" }}>
                <div className="container">
                    <br />
                    <h1 className="jumbotron-heading" style={{ paddingBottom: "10px", justifyContent: "center", display: "flex", textDecoration: "underline" }}>{video.title}</h1>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div>
                    <div className="row g-0">
                        <div className="card mb-3 col-md-9" style={{ padding: "10px" }}>
                            <div className="player-wrapper">
                                <PlayerComponent
                                    url={video.link}
                                    className="react-player"
                                    playing
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                            </div>
                        </div>


                        <div className="card mb-3 col-md-3" style={{ marginLeft: "10px", padding: "5px", display: "flex", flexDirection: "column" }}>
                            <div >
                                <div className="row g-0" style={{ justifyContent: "end" }}>
                                    <Button href={video.link} style={{ width: "5px" }}>
                                        <LinkIcon />
                                    </Button>
                                    <Button onClick={handleExpandClick} style={{ width: "1px" }}>
                                        <InfoIcon />
                                    </Button>
                                </div>
                                <div className="card-body">
                                    <h5><DescriptionOutlinedIcon />:</h5>
                                    <p className="card-text">{video.desc}</p>
                                </div>
                            </div>
                            <div>
                                <div className="card-body">
                                    <h5 className="card-title"><LocationOnOutlinedIcon />:</h5>
                                    <p className="card-text">{video.location}</p>
                                </div>
                            </div>
                            <div >
                                <div className="card-body">
                                    <h5 className="card-title"><TimelapseOutlinedIcon />:</h5>
                                    <p className="card-text">{video.duration}</p>
                                </div>
                            </div>
                            <div>
                                <div className="card-body">
                                    <h5 className="card-title"><CalendarMonthOutlinedIcon />:</h5>
                                    <p className="card-text">{video.dateOfUpload}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps({ params }) {
    console.debug("params", params);
    const res = await fetch(
        `https://auvr.vercel.app/api/browse/videos/${params.id}`
    );
    const video = await res.json();
    console.debug("blog 1", video);
    return { props: { video } };
}
