import * as React from 'react'
import Head from 'next/head'
import Header from '../../components/header'
import Image from 'next/image'

import iosIcon from '../../public/phoneIcon.jpg';
import andIcon from '../../public/androidIcon.jpg';
import cardIcon from '../../public/cardboardIcon.jpg';
import desktopIcon from '../../public/desktopIcon.jpg';
import vrIcon from '../../public/vrIcon.jpg';


function GettingStartedPage() {
    return (
        <main role="main">

            <Head>
                <title>Getting Started</title>
            </Head>

            <Header />


            <section className="jumbotron text-center">
                <div className="container">
                    <br></br>
                    <h1 className="jumbotron-heading">Choose your Device</h1>
                    <p className="lead text-muted">
                        The device that you will use will determine what kind of experience you will have. There are different ways to experience the same video.
                    </p>
                </div>
            </section>


            <div className="album py-5 bg-light">
                <div className='container'>

                    <div className="card mb-3">
                        <div className="row g-0 ">
                            <div className="col-md-2 align-self-center ">
                                <br></br>
                                <Image className="rounded mx-auto d-block"
                                    src={iosIcon}
                                    alt=""
                                    width="130"
                                    height="130" />


                                <br></br>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="card-title">Mobile Devices</h3>
                                    <p className="card-text">Any mobile phones and devices.</p>
                                </div>
                            </div>
                            <div className="col-md-2" style={{ verticalAlign: "middle" }}>
                                <div className="card-body">
                                    <a className="btn btn-outline-primary" data-bs-toggle="collapse" href="#collapseExample1" aria-controls="collapseExample1" aria-expanded="false">More Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="row g-0 ">
                            <div className="collapse" id="collapseExample1" style={{ padding: "20px" }}>
                                <div className="card card-body">
                                    <h5>Experience:</h5>
                                    <p>1. Go to our browsing page <br />
                                        2. Click on a video you want to watch <br />
                                        3. This will transfer you to Youtube where you view.</p>
                                    <br></br>

                                    <h5>Limitations:</h5>
                                    <p>1. iOS cannot be view the videos with Cardboard VR goggles or stereoscopic view. <br />
                                        2. However Android can (more instruction on how to view below). <br />
                                    </p>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="row g-0 ">
                            <div className="col-md-2 align-self-center ">
                                <br></br>
                                <Image className="rounded mx-auto d-block"
                                    src={desktopIcon}
                                    alt=""
                                    width="130"
                                    height="130" />
                                <br></br>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="card-title">Desktop</h3>
                                    <p className="card-text">Any kind of computer or laptops.</p>
                                </div>
                            </div>
                            <div className="col-md-2" style={{ verticalAlign: "middle" }}>
                                <div className="card-body">
                                    <a className="btn btn-outline-primary" data-bs-toggle="collapse" href="#collapseExample2" aria-controls="collapseExample2" aria-expanded="false">More Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="row g-0 ">
                            <div className="collapse" id="collapseExample2" style={{ padding: "20px" }}>
                                <div className="card card-body">
                                    <h5>Experience:</h5>
                                    <p>1. Go to our browsing page <br />
                                        2. Click on a video you want to watch <br />
                                        3. This will transfer you to Youtube where you view.
                                    </p>
                                    <br></br>

                                    <h5>Limitations:</h5>
                                    <p>1. There is no mode where you can immerse yourself in the video <br />
                                        2. Use your mouse or trackpad to navigate in the video
                                    </p>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="row g-0 ">
                            <div className="col-md-2 align-self-center ">
                                <br></br>
                                <Image className="rounded mx-auto d-block"
                                    src={vrIcon}
                                    alt=""
                                    width="130"
                                    height="130" />
                                <br></br>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="card-title">VR Headset</h3>
                                    <p className="card-text">A Virtual Reality Headset.</p>
                                </div>
                            </div>
                            <div className="col-md-2" style={{ verticalAlign: "middle" }}>
                                <div className="card-body">
                                    <a className="btn btn-outline-primary" data-bs-toggle="collapse" href="#collapseExample3" aria-controls="collapseExample3" aria-expanded="false">More Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="row g-0 ">
                            <div className="collapse" id="collapseExample3" style={{ padding: "20px" }}>
                                <div className="card card-body">
                                    <h5>Experience:</h5>
                                    <p>1. Download GizmoVR on Steam <br />
                                        2. Run the application <br />
                                        3. On the browser tab, visit our website and choose a video. <br />
                                        4. Once in Youtube, press -PLAY in fullscreen- <br />
                                        5. Go to settings and change angle to 360
                                    </p>
                                    <br></br>

                                    <h5>Limitations:</h5>
                                    <p>1. Requires time to set up and to be able to view <br />
                                        2. But you will get the full experience that was intended for you
                                    </p>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="row g-0 ">
                            <div className="col-md-2 align-self-center ">
                                <br></br>
                                <Image className="rounded mx-auto d-block"
                                    src={cardIcon}
                                    alt=""
                                    width="130"
                                    height="100" />
                                <br></br>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="card-title">Cardboard Headset</h3>
                                    <p className="card-text">A device where you can put your mobile phone in to view in Virtual Reality</p>
                                </div>
                            </div>
                            <div className="col-md-2" style={{ verticalAlign: "middle" }}>
                                <div className="card-body">
                                    <a className="btn btn-outline-primary" data-bs-toggle="collapse" href="#collapseExample4" aria-controls="collapseExample4" aria-expanded="false">More Details</a>
                                </div>
                            </div>
                        </div>
                        <div className="row g-0 ">
                            <div className="collapse" id="collapseExample4" style={{ padding: "20px" }}>
                                <div className="card card-body">
                                    <h5>Experience:</h5>
                                    <p>1. Go to our browsing page <br />
                                        2. Click on a video you want to watch <br />
                                        3. Press the goggle icon to enter cardboard mode on the Youtube link. <br />
                                        4. Put your phone in the headset and enjoy.
                                    </p>
                                    <br></br>

                                    <h5>Limitations:</h5>
                                    <p>1. iOS Devices cannot use this mode. <br />
                                        2. There is no way to control video once it is in the headset without purchasing a bluetooth remote.
                                    </p>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>

        </main>
    )
}

export default GettingStartedPage