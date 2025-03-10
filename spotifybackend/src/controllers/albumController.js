import {v2 as cloudinary} from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum=async(req,res)=>{
    try{
        const name=req.body.name
        const desc=req.body.desc
        const bgColor=req.body.bgColor
        const imageFile=req.file
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})

        const albumData={
            name,
            desc,
            image:imageUpload.secure_url,
            bgColor:bgColor
        }
        const album=new albumModel(albumData)
        await album.save()
        res.json({success:true,message:'Album Added Successfully'})
    }
    catch(err){
        res.status(500).json({success:false,message:'Something Went Wrong',error:err.message})
    }
}

const listAlbum=async(req,res)=>{
    try{
        const allAlbums=await albumModel.find({})
        res.status(200).json({success:true,message:'Albums Listed',albums:allAlbums})
    }
    catch(err){
        console.error('Error in listAlbum:',err)
    }
}
const removeAlbum=async(req,res)=>{
    try{
        const album=await albumModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:true,message:'Album Removed Successfully'})
    }
    catch(err){
        res.status(500).json({success:false,message:'Something Went Wrong',error:err.message})
    }
}
export {addAlbum,listAlbum,removeAlbum}