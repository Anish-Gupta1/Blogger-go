import { Avatar } from "./blog-card"

export const Appbar = () =>{
    return <div className="border-b flex justify-between py-3 px-10 ">
        <div>
            Blogger-Go
        </div>
        <div>
            <Avatar name={""}/>
        </div>

    </div>
}