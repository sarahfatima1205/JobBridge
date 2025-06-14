// import { User } from "../models/user.model";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//     try{
//     const {fullname,email,phoneNumber,password,role} = req.body;
//     if(!fullname || !email || !phoneNumber || !password || !role) {
//         return res.status(400).json({message:"All fields are required, please fill!",
//             success:false
//         });
//     };
//     const user = await User.findOne({email});
//     if(user){
//         return res.status(400).json({message:"User already exists with this email, please login!",
//             success:false
//         })
//     }
//     const hashedPassword = await bcrypt.hash(password,10);
//     await User.create({
//         fullname,
//         email,
//         phoneNumber,
//         password:hashedPassword,
//         role,
//     })
//     return res.status(201).json({
//         message:"User registered successfully, please login!",
//         success:true
//     })
// }
//  catch (error){

// }
// }
// export const login=async(req,res)=>{
//     try{
//         const {email,password,role}=req.body;
//         if(!email||!password||!role){
//             return res.status(400).json({message:"All fields are required, please fill!",
//                 success:false
//             });
//         };
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(400).json({message:"User does not exist with this email, please register!",
//                 success:false
//             });
//         }
//         const isPasswordMatch = await bcrypt.compare(password,user.password);
//         if(!isPasswordMatch){
//             return res.status(400).json({message:"Invalid credentials, please try again!",
//                 success:false
//             });
//         };
//         //check role is correcr or not
//         if(role!==user.role){
//             return res.status(400).json({message:"acc doesn't exist with this role, please try again!",
//                 success:false
//             });
//         };
//         const tokenData={
//             userId:user._id,
//         }
//         const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
//             expiresIn: '7d' // Token will expire in 7 days
//         });

//         user={
//             _id:user._id,
//             fullname:user.fullname,
//             email:user.email,
//             phoneNumber:user.phoneNumber,
//             role:user.role,
//             profile:user.profile,
//         }

//         return res.status(200).cookie("token", token, {maxAge:7*24*60*60*1000, httpOnly:true, sameSite:"strict"}).json({
//             message:"Welcome back ${user.fullname}, you have successfully logged in!",
//             success:true,
//         })
//     }catch(error){
//         return res.status(500).json({message:"Internal server error, please try again later!",
//             success:false
//         });
//     }
// }

// export const logout = async (req, res) => {
//     try {
//         return res.status(200).json({
//             message: "You have successfully logged out!",
//             success: true,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal server error, please try again later!",
//             success: false,
//         });
//     }
// }

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
//         const file=req.file;
//         if(!fullname||!email||!phoneNumber||!bio||!skills){
//             return res.status(400).json({
//                 message: "All fields are required, please fill!",
//                 success: false,
//             });
//         };

//         //cloudinary section

//         const skillsArray = skills.split(',').map(skill => skill.trim());
//         const userId = req.id;
//         let user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found, please try again!",
//                 success: false,
//             });
//         }
//         user.fullname = fullname;
//         user.phoneNumber = phoneNumber;
//         user.profile.bio = bio;
//         user.profile.skills = skillsArray;
//         //updating data^

//         await user.save();
//         //resume section
//         user={
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile,
//         }
//         return res.status(200).json({
//             message: "Profile updated successfully!",
//             success: true,
//             user,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal server error, please try again later!",
//             success: false,
//         });
//     }
// }

import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async (req,res) =>{
    try{
        const{fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname||!email||!phoneNumber||!password||!role){
            return res.status(400).json({
                message:"All fields are required, please fill!",
                success:false,
            });
        }

        const userExists=await User.findOne({email});
        if (userExists){
            return res.status(400).json({
                message: "User already exists with this email, please login!",
                success: false,
            });
        }

        const hashedPassword=await bcrypt.hash(password,10); //10 is sttrength of hashing
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "User registered successfully, please login!",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error, please try again later!",
            success: false,
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required, please fill!",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist with this email, please register!",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid credentials, please try again!",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with this role, please try again!",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: `Welcome back ${user.fullname}, you have successfully logged in!`,
                success: true,
                user: userData,
                token,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error, please try again later!",
            success: false,
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.clearCookie("token").status(200).json({
            message: "You have successfully logged out!",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error, please try again later!",
            success: false,
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        

        //cloudinary section
        let skillsArray;
        if(skills){
            skillsArray = skills.split(',');
        }

        const userId=req.id; 
        let user=await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found, please try again!",
                success:false,
            });
        }

        if(fullname) user.fullname=fullname;
        if(email) user.email=email;
        if(phoneNumber) user.phoneNumber=phoneNumber;
        if(bio) user.profile.bio=bio;
        if(skills) user.profile.skills=skillsArray;


        await user.save();

        const updatedUser={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        };
        return res.status(200).json({
            message:"Profile updated successfully!",
            success:true,
            user:updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error, please try again later!",
            success:false,
        });
    }
};
