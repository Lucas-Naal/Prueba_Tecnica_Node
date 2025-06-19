import { pool } from '../db/db.js';
import { usersQuerys } from '../db/querys/users.querys.js';

const rfcRegex = /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//GET
export const getUsers = async (req, res) => {
    const [result] = await pool.query(usersQuerys.getUsers);
    res.json(result);
}

// POST
export const createUser = async (req, res) => {
    const { full_name, rfc, email, postal_code } = req.body;

    if (!full_name || !rfc || !postal_code) {
        return res.status(400).json({ error: 'full_name, rfc y postal_code son requeridos.' });
    }

    if (!rfcRegex.test(rfc)) {
        return res.status(400).json({ error: 'RFC inválido.' });
    }

    if (email && !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Correo electrónico inválido.' });
    }

    const [existing] = await pool.query('SELECT * FROM users WHERE rfc = ?', [rfc]);
    if (existing.length > 0) {
        return res.status(409).json({ error: 'Ya existe un usuario con ese RFC.' });
    }

    await pool.query(usersQuerys.createUser, [full_name, rfc, email || null, postal_code]);
    res.status(201).json({ message: 'Usuario creado exitosamente.' });
};

// PUT
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { full_name, rfc, email, postal_code } = req.body;

    if (!full_name || !rfc || !postal_code) {
        return res.status(400).json({ error: 'full_name, rfc y postal_code son requeridos.' });
    }

    if (!rfcRegex.test(rfc)) {
        return res.status(400).json({ error: 'RFC inválido.' });
    }

    if (email && !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Correo electrónico inválido.' });
    }

    const [currentUserResult] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (currentUserResult.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    const currentUser = currentUserResult[0];

    if (
        currentUser.full_name === full_name &&
        currentUser.rfc === rfc &&
        (currentUser.email || '') === (email || '') &&
        currentUser.postal_code === postal_code
    ) {
        return res.status(409).json({ error: 'No hay cambios en los datos para actualizar.' });
    }

    const [existing] = await pool.query('SELECT * FROM users WHERE rfc = ? AND id != ?', [rfc, id]);
    if (existing.length > 0) {
        return res.status(409).json({ error: 'Ya existe otro usuario con ese RFC.' });
    }

    const [result] = await pool.query(usersQuerys.updateUser, [full_name, rfc, email || null, postal_code, id]);
    res.json({ message: 'Usuario actualizado exitosamente.' });
};


// DELETE
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query(usersQuerys.deleteUser, [id]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json({ message: 'Usuario eliminado exitosamente.' });
};