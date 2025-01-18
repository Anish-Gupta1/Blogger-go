import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@anish.che/medium-common";


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      Jwt_token: string,
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c,next)=>{
    const header = c.req.header("authorization") || "" ;
    const token = header?.split(" ")[1];
    const response = await verify(token, c.env.Jwt_token);
    if (response){
        //@ts-ignore
        c.set("userId", response.id);
        await next()
    } else{
      c.status(403)
      return c.json({error : "unauthorized"});
    }
})

//POST  
blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success){
        c.status(411);
        return c.json({
          message: "Inputs not correct"
        });
    };
    const authorId = c.get("userId");

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })
});

//PUT
blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success){
        c.status(411);
        return c.json({
          message: "Inputs not correct"
        });
    };

    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
});

// get all
blogRouter.get("/all", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const blogs = await prisma.blog.findMany({
        select : {
            title : true,
            content : true,
            date : true,
            author : {select : {
                name: true
            }}
        }
    });

    return c.json({
        blogs
    });
});

//GET
blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = await c.req.param("id");

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id
            }
        });
    
        return c.json({
            blog
        });
    } catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching"
        })
    }

});