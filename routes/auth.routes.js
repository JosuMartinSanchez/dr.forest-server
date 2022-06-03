const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//! POST '/api/auth/signup'=> Registrar usuario

router.post("/signup", async (req, res, next) => {
  const {
    email,
    password,
    username,
    cp,
    userType,
    pais,
    provincia,
    poblacion,
    calle,
    numero,
    piso,
    cif,
    rSocial,
  } = req.body;

  console.log(req.body);

  // todo=>------------------VALIDACIONES BACKEND-----------------

  // ! 1.) Todos los campos tienen que estar rellenados
  //Cliente
  if (
    userType === "cliente" &&
    (!email || !password || !username || !cp || !userType)
  ) {
    res.status(400).json({ errorMessage: "Los campos estan incompletos" });

    return;
  }
  console.log();
  //profesional
  if (
    userType === "profesional" &&
    (!email ||
      !password ||
      !username ||
      !cp ||
      !userType ||
      !pais ||
      !provincia ||
      !poblacion ||
      !calle ||
      !numero ||
      !piso ||
      !cif ||
      !rSocial)
  ) {
    res.status(400).json({ errorMessage: "Los campos estan incompletos" });

    return;
  }
  //! 2.) Requisitos del Password

  // el password debe incluir mínimo 8 caracteres, una letra minúscula, una letra mayúscula y un número.
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "La contraseña debe incluir mínimo 8 caracteres, una letra minúscula, una letra mayúscula y un número",
    });

    return;
  }
  //! 3.) Valida el formato de email

  // const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(
  //   email
  // );

  // if (!emailValidator) {
  //   res.status(400).json({
  //     errorMessage: "La dirección de email " + email + " es incorrecta.",
  //   });
  // }

  //! 4.) Ningún usuario en nuestra BBDD tiene el mismo nombre de usuario o email.

  try {
    const foundUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "Usuario ya registrado" });

      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    res.json("Usuario creado");
  } catch (error) {
    next(error);
  }
});

//! POST '/api/auth/login'=> Verificar credenciales del usuario y 'abrirle sesion'

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // todo=>------------------VALIDACIONES BACKEND-----------------

  //! 1.) Todos los campos tienen que estar rellenados

  if (!email || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos lo campos" });

    return;
  }

  //! 3.) Valida el formato de email
  // const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(
  //   email
  // );

  // if (!emailValidator) {
  //   res.status(400).json({
  //     errorMessage: "La dirección de email " + email + " es incorrecta.",
  //   });
  // }

  //! 3.) Validar si el usuario existe en la BBDD
  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Usuario no registrado" });
      return;
    }

    // Encriptacion de contraseña
    const passwordMatch = await bcryptjs.compare(password, foundUser.password);
    console.log(passwordMatch); // true o false

    if (passwordMatch === false) {
      res.status(401).json({ errorMessage: "Contraseña Incorrecta" });
      return;
    }

    //*Creamos el Payload que será nuestro req.session y donde tendremos acceso al usuario registrado

    //Manda un payload y otro dependiendo si es profesional o no
    if (foundUser.userType === " profesional") {
      const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        cp: foundUser.cp,
        telf: foundUser.telf,
        userType: foundUser.userType,
        pais: foundUser.pais,
        provincia: foundUser.provincia,
        poblacion: foundUser.poblacion,
        calle: foundUser.calle,
        numero: foundUser.numero,
        piso: foundUser.piso,
        cif: foundUser.cif,
        rSocial: foundUser.rSocial,
      };
    } else {
      const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        cp: foundUser.cp,
        telf: foundUser.telf,
      };
    }

    console.log();

    // si hubiesen propiedades de isAdmin o isVip se recomienda agregarlas para navegacion de FE

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "12h",
    });

    res.json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

//! GET '/api/auth/verify'=> Checkea si el token es valido, la ruta se usa para el flujo de frontend

router.get("/verify", isAuthenticated, (req, res, next) => {
  // checkear que el token sea valido a traves del middleware

  console.log(req.payload);
  console.log("Midleware ok");
  res.json(req.payload); // Envia al frontend la info del usuario despues de haber comprovado el token
});

module.exports = router;
