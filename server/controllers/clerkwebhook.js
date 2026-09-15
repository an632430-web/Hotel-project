const User = require("../models/user.js");

const {webhook} = import("svix");

const clerkWebhooks= async (req,res)=>{
    try {
        const whook= new webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers={
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]

        };

        await whook.verify(req.body,headers);

        const {data,type}=req.body;

        const userData={
            _id:data.id,
            username:data.first_name+" "+data.last_name,
            email:data.email_addresses[0].email_address,
            image:data.image_url,
        }

        switch(type){
            case "user.created":{
                await User.create(userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(data.id,userData); 
                break;
            }
             case "user.deleted":{
                await User.findByIdAndDelete(data.id); 
                break;
            }
            default:
                break;

        }

        res.status(200).json({message:"Webhook verified and processed successfully"})
    } catch (error) {
        console.error("Error verifying webhook:", error);
        res.status(400).json({ error: "Invalid webhook signature" });
    }
}


 module.exports = clerkWebhooks;