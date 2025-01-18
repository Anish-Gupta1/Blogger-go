import axios from "axios"
import { Backend_URL } from "../config"
import { useEffect, useState } from "react"

interface Blog {
    
    "title": string
    "content": string
    "date": string
    "author": {
        "name": string
    }

}

export const useBlog = ({ id } : { id: string }) =>{
const [loading,setLoading] = useState(true);
const [blog,setBlog] = useState<Blog>();

useEffect(() => {
    axios.get(`${Backend_URL}/api/v1/blog/${id}`,{
        headers: {
            Authorization: localStorage.getItem("authorization")
        }
    })
        .then(res => {
            setBlog(res.data.blog)
            setLoading(false);
        })
}, [id]);

return {
    loading,
    blog
}
}