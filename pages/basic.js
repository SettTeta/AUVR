import Head from 'next/head';
import { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

const Basic = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/js/host-console-warning.js';
        script.async = true;
        document.body.appendChild(script);

        const loadAframe = async () => {
            await import("aframe");
        };
        loadAframe();

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleHide = () => {
        console.log('Handle hide event');
    };

    return (
        <>
            <Head>
                <title>Vimeo A-Frame Component</title>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <Script src="https://aframe.io/releases/0.8.0/aframe.min.js"></Script>
                <Script src="/aframe-vimeo-component.min.js"></Script>
                {/* <link rel="stylesheet" href="/css/app.css" /> */}
            </Head>

            <a-scene>
                <a-assets>
                    <a-asset-item id="terrain" src="/models/terrain.gltf"></a-asset-item>
                    <Image id="skymap" src="/images/skymap.jpg" alt=""/>
                </a-assets>

                <a-camera position="-0.7 2.7 0.5"></a-camera>

                <a-entity
                    vimeo="id: 812289036"
                    id="sky"
                    geometry="primitive:sphere; radius:10; phiLength:360; phiStart:0; thetaLength:145"
                    material="shader:flat; side:back; height:2048; src:#skymap; width:2048"
                ></a-entity>

                <a-entity
                    id="show"
                    position="0 -6 0"
                    onClick={handleHide}
                    onTouchStart={handleHide}
                    event-set__mouseenter="scale: 1.2 1.2 1.2"
                    event-set__mouseleave="scale: 1 1 1"
                >
                    <a-entity
                        rotation="90 0 0"
                        geometry="primitive: torus; radius: 6; radiusTubular: 0.2"
                        material="color: #ff0000; opacity: 0.8"
                    />
                    <a-entity
                        rotation="90 0 0"
                        geometry="primitive: cylinder; radius: 5.3"
                        material="color: #ffffff; opacity: 1"
                    />
                </a-entity>
            </a-scene>
        </>
    );
};

export default Basic;
