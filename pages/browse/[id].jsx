import Head from "next/head"
import Link from "next/link"
import * as React from 'react'
import Header from 'components/header'
import { useState } from "react"
import { Button } from "react-bootstrap"
import Image from "next/image"
// import ReactPlayer from 'react-player/youtube'

import iosIcon from 'public/iosIcon.jpg';
import andIcon from 'public/androidIcon.jpg';
import deskIcon from 'public/desktopIcon.jpg';
import cardIcon from 'public/cardboardIcon.jpg';
import vrIcon from 'public/vrIcon.jpg';
import backArrow from 'public/backArrow2.jpg';

import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });


const url = process.env.BRANCH_URL;
// const url = "https://sp-2-eta.vercel.app"
// const url = "http://localhost:3000"

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Video({ video }) {

    const [activeTab, setActiveTab] = useState("");

    function handleTab(i) {
        setActiveTab(i)
    }


    if (!video) return (
        <div style={{marginTop: "10vh"}}>
            <p>Video not found</p>
            <Link href="/browse">Back</Link>
        </div>
    );

    return (
        <>
            <Head>
                <title>{video.title}</title>
            </Head>

            <Header />

            <section className="jumbotron" style={{marginTop: "10vh"}}>
                <div className="container">
                    <br />
                    <h1 className="jumbotron-heading">{video.title}</h1>
                </div>
            </section>

            <div className="album py-5 bg-light">
                


                <div className="collapse" id="collapseExample1" style={{ padding: "20px" }}>
                    <div className="card card-body">
                        <h6>1. iOS Mobile Devices must be viewed on Youtube for the full experience.</h6>
                        <h6>2. Proceed by clicking this <Link href={video.link}>link</Link>.</h6>
                    </div>
                </div>

                <div className="collapse" id="collapseExample2" style={{ padding: "20px" }}>
                    <div className="card card-body">
                        <h6>1. iOS Mobile Devices must be viewed on Youtube for the full experience.</h6>
                        <h6>2. Proceed by clicking this <Link href={video.link}>link</Link>.</h6>
                    </div>
                </div>

                <div className="container-xxl content-row">

                    <div className="player-wrapper">
                        <ReactPlayer
                            url={video.link}
                            className="react-player"
                            playing
                            width="100%"
                            height="100%"
                            controls
                        />
                    </div>

                    <br />


                    <div className="card mb-3" style={{ fontSize: "80%" }}>
                        <div className="row g-0 ">
                            <div className="col-md-4" >
                                <div className="card-body">
                                    <h6 className="card-title">Description:</h6>
                                    <p className="card-text">{video.desc}</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="card-body">
                                    <h5 className="card-title">Location:</h5>
                                    <p className="card-text">{video.location}</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="card-body">
                                    <h5 className="card-title">Duration:</h5>
                                    <p className="card-text">{video.duration}</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="card-body">
                                    <h5 className="card-title">Uploaded:</h5>
                                    <p className="card-text">{video.dateOfUpload}</p>
                                </div>
                            </div>
                        </div>
                        <Link href={video.link} className="btn btn-primary my-2" style={{ margin: "50px" }}>View on Youtube</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
    console.debug('params', params)
    const res = await fetch(`https://auvr.vercel.app/api/browse/videos/${params.id}`)
    // const res = await fetch(`http://localhost:3000/api/browse/videos/${params.id}`)
    const video = await res.json()
    console.debug('blog 1', video)
    return { props: { video } }
}