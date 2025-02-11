const { response } = require("express")
const adminModel = require ("../model/adminModel")
module.exports = {

    createAdmin : async (req,res) => {
        try {
      const { email } = req.body; 

      const existingAdmin = await adminModel.findOne({ email: email });

      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Admin already exists with this email",
          data: null,
        });
      }
      const admin = await adminModel (req.body)
      await admin.save()
      res.status(200).json ({
          success : true,
          message :"created successfully",
          data: admin
      })
     } 
     catch {
      console.error("Erreur lors de la création de l'administrateur :", error);
      res.status(400).json ({
          success: false,
          message:"creation failed",
          data:null
      })
     }
  },
  
  
  getAllAdmins : async (req,res) => {
      try {
          const admin = await adminModel.find()
          res.status(200).json({
              success:true,
              message:"admins found",
              data:admin
          })
      }
      catch {
          res.status(400).json ({
              success:false,
              message:"failed to find admin",
              data:null 
          })
      }
  },
  
  getAdminById : async (req, res) => {
    try {
      const adminId = req.params.id; 
      const admin = await adminModel.findById(adminId); 

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Admin found",
        data: admin,
      });
    } catch (error) {
      console.error("Erreur lors de la recherche de l'admin :", error);
      res.status(500).json({
        success: false,
        message: "Erreur interne du serveur",
        data: null,
      });
    }
  },
  
  
  deleteAdmin : async (req, res) => {
      try {
      
          const deleteAdmin = req.params.id
          const existingAdmin = await adminModel.findById(deleteAdmin);

          if (!existingAdmin) {
            return res.status(404).json({
              success: false,
              message: "Admin not found", 
              data: null,
            });
          }
          const admin = await adminModel.findByIdAndDelete(deleteAdmin)
          res.status(200).json({
              success: true,
              message: "admin deleted",
              data: admin
          })
      }
      catch {
          res.status(400).json({
              success: false,
              message: "admin not deleted",
              data: null
          })
      }
  },
   
  updateAdmin : async (req,res) => {
      try {
          const adminById = req.params.id
          const admin = await adminModel.findByIdAndUpdate(adminById,req.body,{new:true})
          res.status(200).json({
              success:true,
              message:"update successful",
              data:admin
          })
      
      }
      catch {
          res.status(400).json ({
              success:false,
              message:"failed to update",
              data:null
          })
      }
  },
   

}