import { useEffect, useState } from "react";
import { Scene, Entity } from "aframe-react";
import Head from 'next/head'

export default function ImmersionZone() {
  const [fr, setFr] = useState(false);

  useEffect(() => {
    const loadAframe = async () => {
      await import("aframe");
      setFr(true);
    };
    loadAframe();
  }, []);

  return (
    <>
      <Head>
        <title>A-Frame Component</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script type="text/javascript" src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
        <script type="text/javascript" src="/aframe-vimeo-component.min.js"></script>
        <script type="text/javascript" src="/js/host-console-warning.js"></script>
      </Head>

      <div>
        {fr && (
          <Scene>
            <a-assets>
              <a-asset-item id="terrain" src="/models/terrain.gltf"></a-asset-item>
              <img id="skymap" src="/images/skymap.jpg" />
            </a-assets>

            <a-entity
              renderer="antialias: true"
              vimeo="id: 812372432"
            >
              <a-videosphere></a-videosphere>
              <a-plane color="#000000" scale="3.2 1.8" position="0.0 3.4 -2.0"></a-plane>
            </a-entity>

            <Entity
              vimeo="id: 812289036"
              id="sky"
              geometry="primitive:sphere; radius:10; phiLength:360; phiStart:0; thetaLength:145"
              material="shader:flat; side:back; height:2048; src:#skymap; width:2048"
            />

            <Entity
              id="show"
              position="0 -6 0"
              event-set__mouseenter="scale: 1.2 1.2 1.2"
              event-set__mouseleave="scale: 1 1 1"
            >
              <Entity
                rotation="90 0 0"
                geometry="primitive: torus; radius: 6; radiusTubular: 0.2"
                material="color: #ff0000; opacity: 0.8"
              />
              <Entity
                rotation="90 0 0"
                geometry="primitive: cylinder; radius: 5.3"
                material="color: #ffffff; opacity: 1"
              />
            </Entity>
          </Scene>
        )}
      </div>
    </>
  );
}
