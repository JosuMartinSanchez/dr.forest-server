const isProfesional=()=>{
    if (req.payload.userType === "profesional") {
        next()
    }else{
        res.status(400).json("No eres un profesional");
    }




}

module.exports = isProfesional;