import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob= async (req, res) => {
    try{
        const userId= req.id;
        const jobId= req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job ID is required",
                success:false
            });
        }
        
        const existingApplication= await Application.findOne({job:jobId,applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            });
        }

        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        }

        const newApplication=await Application.create({
            job:jobId,
            applicant:userId
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            success: true,
            application: newApplication
        });

    } catch(error){
        console.log("Error in applyJob:",error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getApplicationsByJobId=async(req,res)=>{
    try{
        const userId= req.id;
        const applications= await Application.find({applicant:userId })
            .sort({createdAt:-1}) // like latest's first
            .populate({
                path:'job',
                populate:{
                    path:'company'
                }
            });

        if(!applications||applications.length===0){
            return res.status(404).json({
                message:"No applications found for this user",
                success:false
            });
        }

        return res.status(200).json({
            message:"Applications retrieved successfully",
            success:true,
            applications
        });
    } catch(error){
        console.log("Error in getApplicationsByJobId:", error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
};

export const getApplicants= async (req, res) => {
    try{
        const { jobId }= req.params;
        const job= await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt: -1 } },
            populate:{
                path:'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message:'Job not found',
                success:false
            });
        }

        return res.status(200).json({
            message:'Applicants retrieved successfully',
            success:true,
            applicants:job.applications
        });
    }catch(error){
        console.log("Error in getApplicants:", error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
};

export const updateStatus= async (req, res) => {
    try{
        const {status}=req.body;
        const applicationId= req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            });
        }

        const application= await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            });
        }

        application.status= status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Application status updated successfully",
            success:true,
            application
        });

    } catch (error) {
        console.log("Error in updateStatus:", error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
};
