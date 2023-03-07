import { useEffect, useRef, useState } from "react";
import { Scene, Entity } from "aframe-react";
import Head from 'next/head'

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
                <title>Woop</title>
            </Head>
            <div>
                {fr && (
                    <SceneOne />
                )}
            </div>
        </>
    );
}



function SceneOne() {
    const [currentScene, setCurrentScene] = useState("scene1");
    const [currentImage, setCurrentImage] = useState("#img1");

    const handleImage = () => {
        setCurrentImage(currentImage === "#img1" ? "#img2" : "#img1");
    }

    const handleSwitchScene = () => {
        setCurrentScene(currentScene === "scene1" ? "scene2" : "scene1");
        console.log("scene 1 button works")
    };
    
    return (
        <div>
            {currentScene === "scene1" && (
                <Scene>
                    <a-assets>
                        <img
                            id="img1"
                            src="img1.jpg"
                        ></img>
                        <img
                            id="img2"
                            src="img2.jpg"
                        ></img>
                    </a-assets>

                    <a-camera>
                        <a-cursor ></a-cursor>
                    </a-camera>

                    <a-sky id="image-360" radius="10" src={currentImage}></a-sky>

                    <Entity
                        geometry={{ primitive: "box" }}
                        position="2 2 -3"
                        events={{ click: handleSwitchScene }}
                    ></Entity>

                    <Entity
                        geometry={{ primitive: "circle" }}
                        position="-2 2 -3"
                        events={{ click: handleImage }}
                    ></Entity>
                </Scene>
            )}
            {currentScene === "scene2" && <SceneTwo />}
        </div>
    );
}



function SceneTwo() {
    const [currentScene, setCurrentScene] = useState("scene2");
    const handleSwitchScene = () => {
        setCurrentScene(currentScene === "scene2" ? "scene1" : "scene2");
        console.log("scene 2 button works")
    };
    return (
        <div>
            {currentScene === "scene2" && (
                <Scene>
                    <a-assets>
                        <img
                            id="img2"
                            src="img2.jpg"
                        ></img>
                    </a-assets>

                    <a-camera>
                        <a-cursor ></a-cursor>
                    </a-camera>

                    <a-sky id="image-360" radius="10" src="#img2"></a-sky>

                    <Entity
                        geometry={{ primitive: "cone" }}
                        position="0 2 -3"
                        events={{ click: handleSwitchScene }}
                    ></Entity>
                </Scene>
            )}
            {currentScene === "scene1" && <SceneOne />}
        </div>
    );
}