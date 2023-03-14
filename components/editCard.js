import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import locationIcon from '../public/locationIcon.jpg';
import durationIcon from '../public/durationIcon2.jpg';
import calenderIcon from '../public/calenderIcon.jpg';

import Button from '@mui/material/Button';
import SaveAltIcon from '../node_modules/@mui/icons-material/SaveAltSharp';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloseIcon from '@mui/icons-material/Close';

function CardTemplate(props) {
    const { title, link, desc, thumbnail, onView, duration, location, dOU, onDel, onSave, onCancel, type, thTitle } = props
    
    return (
        <div className="card mb-3">
            <div className="card-header bg-white" style={{ verticalAlign: "middle" }}>
                <div>
                    <CloseIcon className="hover"
                        src="https://cdn-icons-png.flaticon.com/512/70/70091.png"
                        style={{ float: "right", marginTop: "3px" }}
                        onClick={onCancel}
                        fontSize="large"
                    />

                    <DeleteForeverOutlinedIcon className="hover"
                        style={{ float: "left", marginTop: "3px" }}
                        onClick={onDel}
                        fontSize="large" />
                    <h5 style={{ paddingTop: "8px"}}>{thTitle}</h5>
                </div>
            </div>

            <div className="row g-0 " style={{ display: "flex" }}>
                <div style={{ padding: "20px" }}>
                    <div className="card card-body">
                        <h5>Title:</h5>
                        <p>{title}</p>
                        <h5>Description:</h5>
                        <p>{desc}</p>
                        <h5>Type:</h5>
                        <p>{type}</p>
                        <h5>Link:</h5>
                        <p>{link}</p>
                        <h5>Thumbnail:</h5>
                        <p>{thumbnail}</p>
                        <h5>Location:</h5>
                        <p>{location}</p>
                        <h5>Duration:</h5>
                        <p>{duration}</p>
                        <h5>Date of Upload:</h5>
                        <p>{dOU}</p>

                        <div className="justify-content" >

                            <Button variant="text" onClick={onSave} style={{ float: "right" }}>
                                <SaveAltIcon className="hover"
                                    fontSize="large" /> Save
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTemplate
