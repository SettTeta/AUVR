import { useEffect, useState } from "react";
import { Scene, Entity } from "aframe-react";
import Head from 'next/head'
import Script from "next/script";


export default function ImmersionZone() {
    const [fr, setFr] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [videoPlayer, setVideoPlayer] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const [videoOrderList, setVideoOrderList] = useState(["intro", "sala", "end"]);

    const [currentVideo, setCurrentVideo] = useState(`#${videoOrderList[currentVideoIndex]}`);

    const [videoDisplay, setVideoDisplay] = useState(false);
    const [imageDisplay, setImageDisplay] = useState(false);



    useEffect(() => {
        const loadAframe = async () => {
            const AFRAME = await import("aframe");
            const pauseIcon = await import("components/pauseIcon");
            const playIcon = await import("components/playIcon");
            console.log(AFRAME);
            setFr(true);
        };
        loadAframe();
    }, []);

    const handlePlay = () => {
        if (!playing) {
            const video = document.querySelector(currentVideo);
            video.play();
            setPlaying(true);
            setVideoPlayer(false)
        }
    };

    const handlePause = () => {
        if (playing) {
            const video = document.querySelector(currentVideo);
            video.pause();
            setPlaying(false);
        }
    };

    const handleVideoNext = () => {
        const nextIndex = (currentVideoIndex + 1) % videoOrderList.length;

        // Pause the currently playing video (if any)
        if (playing) {
            const currentVideoRef = document.querySelector(currentVideo);
            currentVideoRef.pause();
            setPlaying(false);
        }

        // Set the new video source and reset the playing state
        setCurrentVideoIndex(nextIndex);
        setCurrentVideo(`#${videoOrderList[nextIndex]}`);
        setPlaying(false);
    };


    const handleHide = () => {
        if (videoPlayer === false) {
            setVideoPlayer(true)
        } else {
            setVideoPlayer(false)
        }
    }

    const handleVideoEnd = () => {
        setPlaying(false);
        const nextVideoIndex = (currentVideoIndex + 1) % videoOrderList.length;
        setCurrentVideoIndex(nextVideoIndex);
        setCurrentVideo(`#${videoOrderList[nextVideoIndex]}`);
        setVideoPlayer(true)
    };

    const handleDisplay = () => {
        const video = document.querySelector("#salad");
        handlePause
        video.play();
        setVideoDisplay(true)
    };

    const handleDisplayOff = () => {
        setVideoDisplay(false)
    };

    const handleImage = () => {
        setImageDisplay(true)
    };

    const handleImageOff = () => {
        setImageDisplay(false)
    };


    return (
        <>
            <Head>
                <title>Woop</title>
            </Head>


            <div>
                {fr && (

                    <div>
                        {/* aframe-gui-component */}
                        <Script src="https://rawgit.com/rdub80/aframe-gui/master/dist/aframe-gui.min.js" />
                        <Script src="https://unpkg.com/aframe-event-set-component@5.x.x/dist/aframe-event-set-component.min.js" />

                        {/* fullscreen and vr mode */}
                        <button onClick={() => document.querySelector('.Scene').requestFullscreen()} style={{ paddingTop: "70px" }}>Request Fullscreen</button>

                        <Scene>

                            <a-assets>
                                <audio
                                    id="click-sound"
                                    src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"
                                ></audio>

                                {/* rendering the videolist */}
                                {videoOrderList.map((videoSrc, index) => (
                                    <video
                                        id={videoSrc}
                                        key={videoSrc + index}
                                        src={`${videoSrc}.mp4`}
                                        onEnded={handleVideoEnd}
                                        playsInline
                                    />
                                ))}

                                {/* video for display */}
                                <video id="salad" autoplay
                                    src="sala.mp4" type="video/mp4"
                                    onEnded={handleDisplayOff}
                                >
                                </video>

                                <img id="map" src="abac-map.jpg" />

                            </a-assets>


                            <a-camera>
                                {/* inner */}
                                <a-cursor
                                    id="cursor"
                                    animation__click="property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 150; startEvents: click"
                                    color="#ff0000"
                                    // animation__clickreset="property: scale; to: 0.1 0.1 0.1; dur: 1; startEvents: animationcomplete__click"
                                    animation__fusing="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: fusing">
                                </a-cursor>

                                {/* outer */}
                                <a-gui-cursor id="cursor"
                                    // raycaster="objects: [HTMLElement]"
                                    fuse-timeout="1500"
                                    color="#ECEFF1"
                                    hover-color="#CFD8DC"
                                    active-color="#607D8B"
                                    design="ring"
                                >
                                </a-gui-cursor>
                            </a-camera>

                            {/* 360 video display */}
                            <a-videosphere
                                id="videosphere"
                                src={currentVideo}
                                rotation="0 -90 0"
                                // autoPlay
                                playsInline
                            ></a-videosphere>

                            {/* show entity */}
                            {!videoPlayer && (<Entity id="show" position="0 -20 0" events={{ click: handleHide, touchStart: handleHide }}
                                event-set__mouseenter="scale: 1.2 1.2 1.2"
                                event-set__mouseleave="scale: 1 1 1"
                            >
                                <Entity
                                    rotation="90 0 0"
                                    geometry="primitive: torus; radius: 8; radiusTubular: 0.2"
                                    material="color: #ff0000; opacity: 0.8"
                                />
                                <Entity
                                    geometry="primitive: cylinder; radius: 7.4"
                                    material="color: #ffffff; opacity: 0.7"
                                />

                            </Entity>)}

                            {/* entire video player */}
                            {videoPlayer && (<Entity id="videoPlayer"
                                position="0 0.5 -1"
                                rotation="-45 0 0"
                                geometry="primitive: plane; width: 2; height: 0.8"
                                material="color: #ff0000; opacity: 0.8"

                            >
                                <Entity
                                    position="0 0 -0.01"
                                    geometry="primitive: box; width: 2.05; height: 0.85; depth: 0.01; segments-height: 2; segments-width: 2"
                                    material="color: #ffffff; opacity: 0.8"
                                ></Entity>

                                <Entity id="title"
                                    position="0 0.3 0"
                                    text="value: Video Player; align: center; color: #ffffff;"
                                />

                                <Entity id="hide"
                                    position="0.8 0.3 0"
                                    geometry="primitive: box; width: 0.2; height: 0.05; depth:0.1;"
                                    material="color: #ffffff"
                                    events={{ click: handleHide, touchStart: handleHide }}

                                    event-set__mouseenter="scale: 1.2 1.2 1"
                                    event-set__mouseleave="scale: 1 1 1"
                                />

                                {playing && (
                                    <Entity id="pause"
                                        // position="0 1 -1"
                                        pause-icon="size: 0.3; color: #ffffff"
                                        events={{ click: handlePause, touchStart: handlePause }}

                                        event-set__mouseenter="scale: 1.2 1.2 1"
                                        event-set__mouseleave="scale: 1 1 1"
                                    ></Entity>
                                )}

                                {!playing && (
                                    <Entity id="play"
                                        // position="0 1 -1"
                                        play-icon="size: 1; color: #ffffff"
                                        events={{ click: handlePlay, touchStart: handlePlay }}
                                        sound="on: click; src: #click-sound"
                                        event-set__mouseenter="scale: 1.2 1.2 1"
                                        event-set__mouseleave="scale: 1 1 1"
                                    ></Entity>
                                )}

                                <Entity id="next" events={{ click: handleVideoNext }} sound="on: click; src: #click-sound"
                                    event-set__mouseenter="scale: 1.2 1.2 1"
                                    event-set__mouseleave="scale: 1 1 1">
                                    <Entity
                                        position="0.5 0 0"
                                        play-icon="size: 1; color: white"
                                    />
                                    <Entity
                                        position="0.7 0 0"
                                        play-icon="size: 1; color: white"
                                    />
                                </Entity>

                            </Entity>
                            )}

                            {/* display video entity */}
                            {currentVideo === "#intro" && (
                                <Entity
                                    id="display"
                                    events={{ click: handleDisplay }}
                                    sound="on: click; src: #click-sound"
                                    position="-3 30 -50"
                                    rotation="25 5 0"
                                    event-set__mouseenter="scale: 1.5 1.5 1.5"
                                    event-set__mouseleave="scale: 1 1 1">
                                    <Entity
                                        position="0 0 0"
                                        play-icon="size: 10; color: white"
                                    />
                                    <Entity
                                        position="0 0 -0.5"
                                        geometry="primitive: circle; radius: 3"
                                        material="color: #ff0000; opacity: 0.8"
                                    />
                                </Entity>
                            )}

                            {/* display video entity */}
                            {currentVideo === "#intro" && (
                                <Entity
                                    id="display"
                                    events={{ click: handleDisplay }}
                                    sound="on: click; src: #click-sound"
                                    position="-3 30 -50"
                                    rotation="25 5 0"
                                    event-set__mouseenter="scale: 1.5 1.5 1.5"
                                    event-set__mouseleave="scale: 1 1 1">
                                    <Entity
                                        position="0 0 0"
                                        play-icon="size: 10; color: white"
                                    />
                                    <Entity
                                        position="0 0 -0.5"
                                        geometry="primitive: circle; radius: 3"
                                        material="color: #ff0000; opacity: 0.8"
                                    />
                                </Entity>
                            )}

                            {videoDisplay && (

                                <a-curvedimage
                                    src="#salad"
                                    height="20"
                                    radius="50"
                                    position="0 10 -5"
                                    theta-length="90"
                                    theta-start="135"
                                ></a-curvedimage>
                            )}


                            {/* display image entity */}
                            {currentVideo === "#intro" && (
                                <Entity
                                    id="displayImage"
                                    events={{ click: handleImage }}
                                    sound="on: click; src: #click-sound"
                                    position="-5 1 0"
                                    rotation="0 90 0"
                                    event-set__mouseenter="scale: 1.5 1.5 1.5"
                                    event-set__mouseleave="scale: 1 1 1">
                                    <Entity
                                        position="0 0.1 0"
                                        play-icon="size: 1; color: white"
                                    />
                                    <Entity
                                        position="0 0.06 -0.5"
                                        geometry="primitive: circle; radius: 0.3"
                                        material="color: #ff0000; opacity: 0.8"
                                    />
                                </Entity>
                            )}

                            {imageDisplay && (
                                <Entity
                                    position="-2 1 0"
                                    rotation="0 90 0"
                                    events={{ click: handleImageOff}}
                                >
                                    <Entity
                                        geometry="primitive: plane; height: 2; width: 1"
                                        material="src: #map; color:#ffffff"
                                    /><Entity
                                        position="0 -0.03 -0.1"
                                        geometry="primitive: plane; height: 2.2; width: 1.1"
                                        material="color:#ff0000"
                                    />
                                </Entity>

                            )}



                        </Scene>
                    </div>

                )}
            </div>
        </>
    );
}
