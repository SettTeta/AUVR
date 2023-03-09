import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import locationIcon from 'public/locationIcon.jpg';
import durationIcon from 'public/durationIcon2.jpg';
import calenderIcon from 'public/calenderIcon.jpg';

//browse/${onView}

function CardTemplate(props) {
    const { title, link, desc,thumbnail, onView, duration, location, dOU } = props
    return (
        <div >
            <Link href={`/browse/${onView}`} style={{ textDecoration: 'none', color: '#000' }}>
                <div className="card mb-4 box-shadow" >
                    <div className="card-header bg-light" style={{ verticalAlign: "middle" }}>
                        <h5>{title}</h5>
                    </div>

                    <div style={{ background: "#eee" }}>
                        <img src={thumbnail} style={{ height: "100%", width: "100%", borderRadius: "1%", padding: "5px" }}></img>
                    </div>

                    <div className="card-body">
                        <p className="card-text" style={{ borderBottom: "3px solid #eee", paddingBottom: "10px" }}>{desc}</p>

                        <table className="table table-borderless" style={{tableLayout: "fixed"}}>
                            <thead>
                                <tr>
                                    <td className="col-md-4">
                                        <Image className="rounded mx-auto d-block"
                                            src={locationIcon}
                                            alt=""
                                            width="30"
                                            height="30" />
                                    </td>
                                    <td className="col-md-4">
                                        <Image className="rounded mx-auto d-block"
                                            src={durationIcon}
                                            alt=""
                                            width="40"
                                            height="40" />
                                    </td>
                                    <td className="col-md-4">
                                        <Image className="rounded mx-auto d-block"
                                            src={calenderIcon}
                                            alt=""
                                            width="30"
                                            height="30" />
                                    </td>
                                </tr>
                                <tr style={{textAlign: "center", verticalAlign: "top"}}>
                                    <td className="col-md-4">
                                        <small className="text-muted">{location}</small>
                                    </td>
                                    <td className="col-md-4">
                                        <small className="text-muted">{duration} mins</small>
                                    </td>
                                    <td className="col-md-4">
                                        <small className="text-muted">{dOU}</small>
                                    </td>
                                </tr>
                            </thead>
                        </table>

                    </div>
                </div>
            </Link >
        </div >
    )
}

export default CardTemplate