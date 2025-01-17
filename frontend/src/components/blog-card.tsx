interface BlogCardprops {
    authorname: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({
    authorname, 
    title,  
    content,  
    publishedDate
} : BlogCardprops ) =>{
    return <div>
        <div> {authorname} . {publishedDate} </div>
        <div>{title}</div>
        <div>{content.slice(0,100)+"..."}</div>
        <div>{content.length/100 + "min read"}</div>
    </div>
}