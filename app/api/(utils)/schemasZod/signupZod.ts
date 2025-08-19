import z from "zod";

export const bodyZodSignUp = z.object({
    email:z.email("Enter a valid email address!"),
    password:z.string().min(8,"Password must be at least 8 characters!").max(14,"Password must be less than 14 characters!"),
    confirmPassword:z.string().min(8).max(14)
}).refine((data)=> data.password === data.confirmPassword,{
    message:"Passwords must match!",
    path:["confirmPassword"]
});

