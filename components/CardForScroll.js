import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import locationIcon from 'public/locationIcon.jpg';
import durationIcon from 'public/durationIcon2.jpg';
import calenderIcon from 'public/calenderIcon.jpg';

//browse/${onView}

function CardTemplate(props) {
    const { title, link, desc, thumbnail, onView, duration, location, dOU } = props
    return (
        <div >
            <Link href={`/browse/${onView}`} style={{ textDecoration: 'none', color: '#000' }}>
                <div className="container" style={{ borderRight: "1px solid #ccc", paddingRight: "1rem" }}>
                    <div className="card mb-4 box-shadow" >
                        <div style={{ background: "#ffffff" }}>
                            <img src={thumbnail} style={{ height: "100%", width: "100%"}}></img>
                        </div>
                    </div>
                    <h5 style={{marginLeft:"10px"}}>{title}</h5>
                </div>
            </Link >
        </div >
    )
}

export default CardTemplate