const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema({
        name:{
            type:String,
            required:[true,"Please add a name!"]
        },
        email:
        {
            type:String,
            required:[true,"Please add a email!"],
            unique:true,
            trim:true,
            match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter a valid email!"]
        },
        password:
        {
            type:String,
            required:[true,"Please add a password!"],
            minLength:[6,"Password must be upto 6 characters!"],
            //maxLength:[24,"Password length too long!"]
        },
        photo:
        {
            type:String,
            required:[true,"Please enter a photo!"],
            default:"https://i.ibb.co/4pDNDk1/avatar.png"
        },
        phone:
        {
            type:String,
            default:"+91"
        },
        bio:
        {
            type:String,
            default:"Bio",
            maxLength:[250,"Bio must not be more than 250 characters!"]
        }
    },
    {
        timestamps:true
    }
)


// now we want that before saving the data in database, our password get hashed
userSchema.pre("save",async function(next)
{
    // if password is not modified, then go on next piece of code
    if(!this.isModified("password"))
    {
        next();
    }

    // if password is modified execute this code
    const salt=await bcrypt.genSalt(10);

    const hashedPassword=await bcrypt.hash(this.password,salt);

    this.password=hashedPassword;
})

const User=mongoose.model("User",userSchema)
module.exports=User