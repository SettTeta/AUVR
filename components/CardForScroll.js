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
                <div className="container" style={{ paddingRight: "1rem"}} >
                    <img src={thumbnail} style={{ height: "100%", width: "100%", borderRadius: "5px" }}></img>
                    <h5 style={{ paddingLeft: "2px", marginTop: "10px", width:"250px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{title}</h5>
                    <small style={{ float: 'left', opacity:"0.6"}}><LocationOnOutlinedIcon fontSize="small" style={{marginTop:"-7px", marginRight:"-3px"}}/> {location} Campus</small>
                    {/* <small style={{ paddingRight: "10px", float: 'right', opacity:"0.6" }}><TimelapseOutlinedIcon fontSize="small" /> {duration}mins</small> */}
                </div>
            </Link >
        </div >
    )
}

export default CardTemplate
