const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");
const { createUser, getUserById, getUserByEmail } = require("../db/users");



const schemaBody = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
});

const schemaId = Joi.number().integer().positive().required();

const newUserController = async (req, res, next) => {
    try {
        const { body } = req;
        await schemaBody.validateAsync(body);

        const { email, password } = req.body;
        if (!email || !password) {
            throw generateError("Debes enviar un email y/o password", 400);
        }

        const id = await createUser(email, password);

        res.send({
            status: "OK",
            message: `User created with id: ${id}`,
        });
    } catch (error) {
        next(error);
    }
};

const getUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schemaId.validateAsync(id);

        const user = await getUserById(id);

        res.send({
            status: "OK",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    try {
        const { body } = req;
        await schemaBody.validateAsync(body);

        const { email, password } = body;

        const user = await getUserByEmail(email);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw generateError("El password no coincide", 401);
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1d",
        });

        res.send({
            status: "OK",
            data: token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserController,
    loginController,
    newUserController,
};
