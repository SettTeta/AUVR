import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import locationIcon from '../public/locationIcon.jpg';
import durationIcon from '../public/durationIcon2.jpg';
import calenderIcon from '../public/calenderIcon.jpg';

function CardTemplate(props) {
    const { title, link, desc, thumbnail, onView, duration, location, dOU, onEdit, type, urlID, player } = props

    return (
        // <div className="card mb-3" data-bs-toggle="collapse" href={`#collapseExample-${onView}`} aria-controls={`collapseExample-${onView}`} aria-expanded="false">
        <div className="card mb-3" onClick={onEdit}>
            <div className="card-header bg-white" style={{ verticalAlign: "middle" }}>
                <div>
                    {/* <img className="hover"
                        src="https://cdn-icons-png.flaticon.com/512/1827/1827951.png"
                        width="30"
                        height="30"
                        style={{ float: "right", marginTop: "2px" }}
                        onClick={onEdit}
                    /> */}
                    <h5 style={{ paddingTop: "8px" }}>{title}</h5>
                </div>
            </div>
            <div className="row g-0 " style={{ textAlign: "center" }}>
                <div className="col-md-2 align-self-center ">
                    <img className="rounded mx-auto d-block"
                        // src={thumbnail} style={{ height: "90%", width: "90%", padding: "5px" }}>
                        src={(player === "vimeo") ? `https://vumbnail.com/${urlID}.jpg` : `http://i2.ytimg.com/vi/${urlID}/mqdefault.jpg`} style={{ height: "90%", width: "90%", padding: "1%" }}>
                    </img>
                </div>

                <div className="col-md-2 align-self-center" style={{ minWidth: '60px', width: "24%" }}>
                    <div className="card-body">
                        <Image className="rounded mx-auto d-block"
                            src={locationIcon}
                            alt=""
                            width="30"
                            height="30" />
                        <small className="text-muted">{location}</small>
                    </div>
                </div>

                <div className="col-md-2 align-self-center" style={{ minWidth: '50px', width: "20%" }}>
                    <div className="card-body">
                        <img className="rounded mx-auto d-block"
                            src="https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png"
                            alt=""
                            width="40"
                            height="40" />
                        <small className="text-muted">{type}</small>
                    </div>
                </div>

                <div className="col-md-2 align-self-center" style={{ minWidth: '50px', width: "19%" }}>
                    <div className="card-body">
                        <Image className="rounded mx-auto d-block"
                            src={durationIcon}
                            alt=""
                            width="40"
                            height="40" />
                        <small className="text-muted">{duration}</small>
                    </div>
                </div>

                <div className="col-md-2 align-self-center" style={{ minWidth: '50px', width: "20%" }}>
                    <div className="card-body">
                        <Image className="rounded mx-auto d-block"
                            src={calenderIcon}
                            alt=""
                            width="30"
                            height="30" />
                        <small className="text-muted">{dOU}</small>
                    </div>
                </div>
            </div>
            {/* <div className="row g-0 ">
                <div className="collapse" id={`collapseExample-${onView}`} style={{ padding: "20px" }}>
                    <div className="card card-body">
                        <h5>Description:</h5>
                        <p>{desc}</p>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default CardTemplate
