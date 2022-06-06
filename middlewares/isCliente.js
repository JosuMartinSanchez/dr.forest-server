const isCliente = (req, res, next) => {
    if (req.session.user.userType === "cliente") {
        next()
    } else {
        res.redirect("/")
    }
}

module.exports = isCliente