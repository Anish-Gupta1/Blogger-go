import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@anish.che/medium-common";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      Jwt_token: string;
    };
  }>();

//SIGN-UP
userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }
  
    const user = await prisma.user.create({
      data: {
        username: body.username,
        name: body.name,
        password: body.password,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.Jwt_token);
    return c.json({ jwt: token });
  });


  //SIGN-IN
  userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username : body.username,
        password : body.password
      }
    })
    if (!user){
      c.status(404);
      return c.json({ error:"user doesnt exist"});
    }
  
    const jwt = await sign({ id: user.id }, c.env.Jwt_token);
      return c.json({ jwt });
  });