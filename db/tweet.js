const { generateError } = require("../helpers");
const getConnection = require("./db");





const createTweet = async (userId, text, image = " ") => {
    let connection;
    try {
        connection = await getConnection();

        const [results] = await connection.query(
            `
                        INSERT INTO tweets (user_id, text, image)
                        VALUES( ?, ?, ?)
                  `,
            [userId, text, image]
        );

        return results.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getAllTweets = async () => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(`
                        SELECT * FROM tweets ORDER BY created_at DESC
                  `);

        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getTweetById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        SELECT * FROM tweets WHERE id = ?
                  `,
            [id]
        );

        if (result.length === 0) {
            throw generateError(`El tweet con id: ${id} no existe`, 404);
        }

        return result[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const deleteTweetById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                        DELETE FROM tweets WHERE id = ?
                  `,
            [id]
        );
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    createTweet,
    deleteTweetById,
    getAllTweets,
    getTweetById,
};
