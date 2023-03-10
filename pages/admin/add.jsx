import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddBlogPage() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const addVideo = async (data) => {
        const response = await fetch('/api/browse/videos', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // serialisation
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
        const result = await response.json();   // deserialise
        if (result.error) {
            alert("Error: " + result.error)
        } else {
            alert("Blog saved")
            window.location.href = "/admin"
        }
        console.log(result)
        setData(JSON.stringify(data))
    }

    return (
        <div style={{ margin: '1rem' }}>
            <form onSubmit={handleSubmit(addVideo)}>
                <h1>New Blog</h1>
                <label htmlFor="title">Title</label><br />
                <input id="title" {...register("title", { required: false })} placeholder="Blog Title" /><br />

                <label htmlFor="link">link</label><br />
                <input id="link" {...register("link", { required: false })} placeholder="Blog link" /><br />
                
                <label htmlFor="desc">Title</label><br />
                <input id="desc" {...register("desc", { required: false })} placeholder="Blog desc" /><br />

                <label htmlFor="thumbnail">Title</label><br />
                <input id="thumbnail" {...register("thumbnail", { required: false })} placeholder="Blog thumbnail" /><br />

                <label htmlFor="location">Title</label><br />
                <input id="location" {...register("location", { required: false })} placeholder="Blog location" /><br />

                <label htmlFor="duration">Title</label><br />
                <input id="duration" {...register("duration", { required: false })} placeholder="Blog duration" /><br />
                
                <label htmlFor="dateOfUpload">Title</label><br />
                <input id="dateOfUpload" {...register("dateOfUpload", { required: false })} placeholder="Blog TidateOfUploadtle" /><br />

                <label htmlFor="type">Category</label>
                <select id="type" {...register("type", { required: false })}>
                    <option value="">Select...</option>
                    <option value="news">News</option>
                    <option value="life">Life</option>
                </select><br />

                <input type="submit" />
                <p>{data}</p><br />
            </form>
            
        </div>
    );
}