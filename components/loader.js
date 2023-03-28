import loadIcon from '../public/loadingIcon.svg'
import Image from 'next/image'

export default function Loader() {
    return (
        <div style={{display:"flex", position:"absolute", top:"-57px", left:"6.5px", height:"0", zIndex:"10000000000"}}>
            <Image src={loadIcon} alt="asd" style={{display:"inline-block", margin:"auto", width:"80px"}}/>
        </div>
    )
}