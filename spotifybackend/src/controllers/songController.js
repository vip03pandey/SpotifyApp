import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;
        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];
        if (!name || !desc || !album || !audioFile || !imageFile) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, desc, album, image, audio) are required."
            });
        }
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        // ✅ Validate successful uploads
        if (!audioUpload?.secure_url || !imageUpload?.secure_url) {
            return res.status(500).json({
                success: false,
                message: "File upload to Cloudinary failed."
            });
        }
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
        };
        const song = new songModel(songData);
        await song.save();

        res.status(200).json({ success: true, message: "Song Added Successfully" });

    } catch (err) {
        console.error("Error in addSong:", err);  // Log the actual error
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            error: err.message,
        });
    }
};

const listSong = async (req, res) => {
    try{
        const allSongs=await songModel.find({})
        res.status(200).json({success:true,message:'Songs Listed',songs:allSongs})
    }
    catch(err){
        console.error('Error in listSong:',err)
    }
};
const removeSong=async(req,res)=>{
    try{
        const song=await songModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:true,message:'Song Removed Successfully'})
    }
    catch(err){
        res.status(500).json({success:false,message:'Something Went Wrong',error:err.message})
    }
}
export { addSong, listSong ,removeSong};
