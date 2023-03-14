import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';

//browse/${onView}

function CardTemplate(props) {
    const { title, link, desc, thumbnail, onView, duration, location, dOU } = props
    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Link href={`/browse/${onView}`} style={{ textDecoration: 'none', color: '#000' }}>
                <div className="container" style={{ paddingRight: "1rem", textAlign: "center" }}>
                    <img src={thumbnail} style={{ height: "100%", width: "100%", borderRadius: "5px" }}></img>
                    <h5 style={{ marginTop:"10px"}}>{title}</h5>
                    <small style={{paddingLeft:"10px", float:'left'}}><LocationOnOutlinedIcon fontSize="small" /> {location}</small>
                    <small style={{paddingRight:"10px", float:'right'}}><TimelapseOutlinedIcon fontSize="small"/> {duration}mins</small>

                </div>
            </Link >
        </div >
    )
}

export default CardTemplate
