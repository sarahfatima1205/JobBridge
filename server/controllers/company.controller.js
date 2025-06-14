import Company from '../models/company.model.js';

export const registerCompany = async (req, res) => {
    try{
        const {companyName}=req.body;
        if(!companyName || companyName.trim() === ""){
            return res.status(400).json({
                message: "Company name is required",
                success:false
            });
        }
        let company= await Company.findOne({
            companyName: companyName});
        if(company){
            return res.status(400).json({
                message:"you already have a company registered with this name",
                success:false
            });
        }
        company = await Company.create({
            companyName: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message:"Company registered successfully",
            success:true,
            company,
        });
    } catch(error){
        console.error("Error registering company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    try{
        const userId=req.id; //logged in user id
        const company = await Company.find({userId});
        if(!company || company.length === 0){
            return res.status(404).json({
                message: "No company found for this user",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company found",
            success: true,
            company
        });
    } catch(error){
        console.log(error);
    }
};

export const getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company found",
            success: true,
            company
        });
    }
    catch(error){
        console.error("Error fetching company by ID:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const updateCompany = async(req,res)=>{
    try{
        const {name,description,website,location}=req.body;
        const file=req.file;
        //cloudinary stuff

        const updateData={name,description,website,location};
        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new :true});

        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            company
        });
    }catch(error){
        console.error("Error updating company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
