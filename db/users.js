const bcryt = require("bcrypt");
const getConnection = require("./db");
const { generateError } = require("../helpers");



const createUser = async (email, password) => {
    let connection;
    try {
        connection = await getConnection();

        const [user] = await connection.query(
            `
                  SELECT id FROM users WHERE email = ?
                  `,
            [email]
        );

        if (user.length > 0) {
            throw generateError("Ya existe usuario con ese email", 409);
        }

        const passwordHash = await bcryt.hash(password, 8);

        const [newUser] = await connection.query(
            `
                        INSERT INTO users (email, password)
                        VALUES (?, ?)
                  `,
            [email, passwordHash]
        );

        return newUser.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getUserById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [results] = await connection.query(
            `
                        SELECT id, email, created_at FROM users
                        WHERE id = ?
                  `,
            [id]
        );

        if (results.length === 0) {
            throw generateError("No existe usuario con ese id", 404);
        }

        return results[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getUserByEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        const [results] = await connection.query(
            `
                        SELECT * FROM users
                        WHERE email = ?
                  `,
            [email]
        );

        if (results.length === 0) {
            throw generateError("No existe usuario con ese email", 404);
        }

        return results[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
};
