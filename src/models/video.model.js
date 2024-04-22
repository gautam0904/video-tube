import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
    videoFile : {
        typpe : String ,
        required : true
    },
    thumbnail : {
        typpe : String ,
        required : true
    },
    title : {
        typpe : String ,
        required : true
    },
    description : {
        typpe : String ,
        required : true
    },
    views : {
        typpe : Number ,
        default : 0
    },
    duration : {
        typpe : Number ,
        required : true
    },
    isPublished : {
        typpe : Boolean ,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
})

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video" , videoSchema)