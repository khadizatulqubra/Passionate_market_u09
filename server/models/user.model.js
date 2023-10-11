import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true,
       
    },
  
    
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
       
    },
    avatar:
    {
    type:String,
    default:"https://static.vecteezy.com/system/resources/previews/006/735/770/original/beautiful-woman-avatar-profile-icon-vector.jpg",
    },

} , 

    {timestamps:true});

    const User = mongoose.model('User', userSchema);

    export default User;
