import { useEffect, useState } from "react";
import { Scene, Entity } from "aframe-react";
import Head from 'next/head'
import Script from "next/script";


export default function ImmersionZone() {
    const [fr, setFr] = useState(false);


    useEffect(() => {
        const loadAframe = async () => {
            const AFRAME = await import("aframe");
            console.log(AFRAME);
            setFr(true);
        };
        loadAframe();
    }, []);

    return (
        <>
            <Head>
                <title>Test 2</title>
            </Head>

            <div>
                {fr && (
                    <div>
                        <Script src="https://unpkg.com/aframe-layout-component@4.x.x/dist/aframe-layout-component.min.js"></Script>
                        <Script src="https://unpkg.com/aframe-event-set-component@5.x.x/dist/aframe-event-set-component.min.js"></Script>
                        {/* <Script src="https://unpkg.com/aframe-proxy-event-component@2.1.0/dist/aframe-proxy-event-component.min.jss"></Script> */}



                        <Scene>
                            <a-assets>
                                <audio
                                    id="click-sound"
                                    src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"
                                ></audio>

                                <img id="city" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg" />
                                <img id="city-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg" />
                                <img id="cubes" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg" />
                                <img id="cubes-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
                                <img id="sechelt" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg" />
                                <img id="sechelt-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg" />
                            </a-assets>

                            <a-sky id="image-360" radius="10" src="#city"></a-sky>

                            <a-entity class="link"
                                geometry="primitive: plane; height: 1; width: 1"
                                material="shader: flat; src: #cubes-thumb"
                                sound="on: click; src: #click-sound"
                                position="-2 1 -4"
                                event-set__mouseenter="scale: 1.2 1.2 1"
                                event-set__mouseleave="scale: 1 1 1"
                                event-set__click="_target: #image-360; _delay: 300; material.src: #cube"
                            ></a-entity>

                            <a-entity class="link"
                                geometry="primitive: plane; height: 1; width: 1"
                                material="shader: flat; src: #city-thumb"
                                sound="on: click; src: #click-sound"
                                position="0 1 -4"
                                event-set__mouseenter="scale: 1.2 1.2 1"
                                event-set__mouseleave="scale: 1 1 1"
                                event-set__click="_target: #image-360; _delay: 300; material.src: #city"
                            ></a-entity>

                            <a-entity class="link"
                                geometry="primitive: plane; height: 1; width: 1"
                                material="shader: flat; src: #sechelt-thumb"
                                sound="on: click; src: #click-sound"
                                position="2 1 -4"
                                event-set__mouseenter="scale: 1.2 1.2 1"
                                event-set__mouseleave="scale: 1 1 1"
                                event-set__click="_target: #image-360; _delay: 300; material.src: #sechelt"
                            ></a-entity>

                            <a-camera>
                                <a-cursor
                                    id="cursor"
                                    animation__click="property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 150; startEvents: click"
                                    animation__clickreset="property: scale; to: 0.1 0.1 0.1; dur: 1; startEvents: animationcomplete__click"
                                    animation__fusing="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: fusing"></a-cursor>
                            </a-camera>


                        </Scene>
                    </div>

                )}
            </div>
        </>
    );
}
