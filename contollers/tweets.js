const path = require("path");
const Joi = require("joi");
const sharp = require("sharp");
const randomstring = require("randomstring");
const { getAllTweets, createTweet, getTweetById, deleteTweetById } = require("../db/tweet");
const { createPathIfNotExists } = require("../helpers");



const schema = Joi.number().integer().positive().required();
const schemaText = Joi.string().min(10).max(280).required();

const getTweetsController = async (req, res, next) => {
    try {
        const tweets = await getAllTweets();

        res.send({
            status: "OK",
            data: tweets,
        });
    } catch (error) {
        next(error);
    }
};

const newTweetController = async (req, res, next) => {
    try {
        const { text } = req.body;
        await schemaText.validateAsync(text);

        let imageFileName;
        if (req.files && req.files.image) {
            const uploadsDir = path.join(__dirname, "../uploads");

            await createPathIfNotExists(uploadsDir);

            const image = sharp(req.files.image.data);
            image.resize(1000);

            imageFileName = randomstring.generate(24) + ".jpg";

            await image.toFile(path.join(uploadsDir, imageFileName));
        }

        const id = await createTweet(req.userId, text, imageFileName);

        res.send({
            status: "OK",
            message: `Tweet creado con id: ${id} creado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

const getSingleTweetController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schema.validateAsync(id);

        const tweet = await getTweetById(id);

        res.send({
            status: "OK",
            data: tweet,
        });
    } catch (error) {
        next(error);
    }
};

const deleteTweetController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schema.validateAsync(id);

        const tweet = await getTweetById(id);

        if (req.userId !== tweet.user_id) {
            throw generateError("No tienes permisos para borrar el tweet", 401);
        }

        await deleteTweetById(id);

        res.send({
            status: "OK",
            message: `El tweet con id ${id} se ha borrado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    deleteTweetController,
    getSingleTweetController,
    getTweetsController,
    newTweetController,
};
