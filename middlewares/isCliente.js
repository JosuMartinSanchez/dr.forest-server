const isCliente=()=>{
    if (req.payload.userType === "cliente") {
        next()
    }else{
        res.status(400).json("No eres un cliente");
    }




}
module.exports = isCliente;
