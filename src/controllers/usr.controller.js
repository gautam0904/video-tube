import {asayncHandler} from "../utiles/asynchandler.js"

const registerUser = asayncHandler( async (req,res)=>{
    res.status(200).json({
        "message":"ok"
    })
})

export {registerUser}