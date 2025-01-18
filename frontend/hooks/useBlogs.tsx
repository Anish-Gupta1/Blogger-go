import axios from "axios";
import { useEffect, useState } from "react"
import { Backend_URL } from "../config";

interface Blog {
    
        "title": string
        "content": string
        "date": string
        "author": {
            "name": string
        }

}

export const useBlogs = () =>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${Backend_URL}/api/v1/blog/all`,{
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        })
            .then(res => {
                setBlogs(res.data.blogs)
                setLoading(false);
            })
    }, []);
    
    return {
        loading,
        blogs
    }
}