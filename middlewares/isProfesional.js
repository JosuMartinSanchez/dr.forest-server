const isProfesional = (req, res, next) => {
    if (req.session.user.userType === "profesional") {
        next()
        console.log("el usuario es profesional y puede crear servicios")
    } else {
        res.redirect("/")
        console.log("El usuario no es profesional, no puede crear servicios")
    }
}

module.exports = isProfesional