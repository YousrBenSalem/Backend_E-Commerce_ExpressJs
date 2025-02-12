const {response} = require ("express")
const providerModel = require ("../model/providerModel")
const {randomBytes} = require("crypto");
const code = randomBytes(6).toString("hex");
const nodemailer = require("nodemailer");
module.exports = {
    
    
    createProvider : async (req,res) => {
        try {
          const { email } = req.body; 
          const existingProvider = await providerModel.findOne({ email: email });
          
          if (existingProvider) {
          return res.status(400).json({
            success: false,
            message: "Provider already exists with this email",
            data: null,
                  });
                }

          const provider = await providerModel ({...req.body , code :code})
          const savedProvider = await provider.save()
          res.status(200).json ({
              success : true,
              message :"created successfully",
              data: savedProvider
          })
            const transport = nodemailer.createTransport({
              host :"sandbox.smtp.mailtrap.io",
                  port : 2525,
                  secure : false ,
                  auth : {
                      user : '5eb65c03cb943e',
                      pass : '0d8fa1526d3e9d'
          
                  }
            });
                  transport.sendMail({
                      from: "admin@gmail.com",
                      to: savedProvider.email,
                      subject: "hello" +""+ savedProvider.fullname,
                      text: "mail de confirmation",
                      html: `<!DOCTYPE html>
                      <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Document</title>
                      </head>
                      <body>
                          <h1>verify account</h1>
                          <a href ="http://localhost:3000/user/verify/${savedProvider.code}"> click here </a>
                        
                      </body>
                      </html>`
                  })
     } 
     catch {
      res.status(400).json ({
          success: false,
          message:"creation failed",
          data:null
      })
     }
  },
  
  
  getAllProviders: async (req,res) => {
      try {
          const provider = await providerModel.find()
          res.status(200).json({
              success:true,
              message:"providers found",
              data:provider
          })
      }
      catch {
          res.status(400).json ({
              success:false,
              message:"failed to find providers",
              data:null 
          })
      }
  },
  
  getproviderById : async (req,res) => {
      try {
          const providerId = req.params.id;
          const provider = await providerModel.findById(providerId)

          if (!provider) {
        return res.status(404).json({
          success: false,
          message: "Provider not found",
          data: null,
        });
      }
          res.status(200).json({
              success:true,
              message:"provider found",
              data:provider
          })
      }
      catch(error) {
          console.error("Erreur lors de la recherche de fournisseur :", error);
          res.status(500).json({
              success:false,
              message:"Erreur interne du serveur",
              data:null
          })
  
  }
  },
  
  
  deleteProvider: async (req, res) => {
      try {
          const deleteProvider = req.params.id
          const existingProvider = await providerModel.findById(deleteProvider)
          if (!existingProvider) {
            return res.status(404).json({
              success: false,
              message: "Provider not found", 
              data: null,
            });
          }
          const provider = await providerModel.findByIdAndDelete(deleteProvider)
          res.status(200).json({
              success: true,
              message: "provider deleted",
              data: provider
          })
      }
      catch {
          res.status(400).json({
              success: false,
              message: "provider not deleted",
              data: null
          })
      }
  },
   
  updateProvider : async (req,res) => {
      try {
          const updateProviderById = req.params.id
          const provider = await providerModel.findByIdAndUpdate(updateProviderById,req.body,{new:true})
          res.status(200).json({
              success:true,
              message:"update successful",
              data:provider
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