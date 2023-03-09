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

                </div>
            </Link >
        </div >
    )
}

export default CardTemplate