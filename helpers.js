const fs = require("fs/promises");

const generateError = (message, status) => {
    const error = new Error(message);
    error.httpStatus = status;

    return error;
};

const createPathIfNotExists = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        await fs.mkdir(path);
    }
};

module.exports = {
    createPathIfNotExists,
    generateError,
};
