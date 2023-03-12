import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import locationIcon from 'public/locationIcon.jpg';
import durationIcon from 'public/durationIcon2.jpg';
import calenderIcon from 'public/calenderIcon.jpg';

function CardTemplate(props) {
    const { title, link, desc, thumbnail, onView, duration, location, dOU, onDel, onEdit, onSave, onCancel } = props

    return (
        <div className="card mb-3">
            <div className="card-header bg-white" style={{ verticalAlign: "middle" }}>
                <div>
                    <img className="hover"
                        src="https://cdn-icons-png.flaticon.com/512/1827/1827951.png"
                        width="30"
                        height="30"
                        style={{ float: "right", marginTop: "2px" }}
                        onClick={onEdit}
                    />
                    <img className="hover"
                        src="https://www.pngitem.com/pimgs/m/195-1951784_info-icon-svg-transparent-background-information-icon-hd.png"
                        width="30"
                        height="30"
                        style={{ float: "right", marginTop: "4px", marginRight:"10px" }}
                        data-bs-toggle="collapse" href={`#collapseExample-${onView}`} aria-controls={`collapseExample-${onView}`} aria-expanded="false"
                    />
                    <h5 style={{ paddingTop: "8px" }}>{title}</h5>
                </div>
            </div>
            <div className="row g-0 " style={{ textAlign: "center" }}>
                <div className="col-md-2 align-self-center ">
                    <img className="rounded mx-auto d-block"
                        src={thumbnail} style={{ height: "90%", width: "90%", padding: "5px" }}></img>
                </div>

                <div className="col-md-2 align-self-center">
                    <div className="card-body">
                        <Image className="rounded mx-auto d-block"
                            src={locationIcon}
                            alt=""
                            width="30"
                            height="30" />
                        <small className="text-muted">{location}</small>
                    </div>
                </div>

                <div className="col-md-2 align-self-center">
                    <div className="card-body">
                        <Image className="rounded mx-auto d-block"
                            src={durationIcon}
                            alt=""
                            width="40"
                            height="40" />
                        <small className="text-muted">{duration} mins</small>
                    </div>
                </div>

                <div className="col-md-2 align-self-center">
                    <div className="card-body">
                        <Image className="rounded mx-auto d-block"
                            src={calenderIcon}
                            alt=""
                            width="30"
                            height="30" />
                        <small className="text-muted">{dOU}</small>
                    </div>
                </div>

                <div className="col-md-2 align-self-center">
                    <div className="card-body">
                        <img className="rounded mx-auto d-block"
                            src="https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png"
                            alt=""
                            width="40"
                            height="40" />
                        <small className="text-muted">{duration} mins</small>
                    </div>
                </div>

                <div className="col-md-2 align-self-center">
                    <div className="card-body">
                        <img className="rounded mx-auto d-block"
                            src="https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png"
                            alt=""
                            width="40"
                            height="40" />
                        <small className="text-muted">{duration} mins</small>
                    </div>
                </div>
            </div>

            <div className="row g-0 ">
                <div className="collapse" id={`collapseExample-${onView}`} style={{ padding: "20px" }}>
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
    )
}

export default CardTemplate
