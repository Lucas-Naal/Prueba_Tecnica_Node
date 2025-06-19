export const usersQuerys = { 
    getUsers: 'SELECT id, full_name, rfc, email, postal_code FROM view_users;',
    createUser: 'INSERT INTO users (full_name, rfc, email, postal_code) VALUES (?, ?, ?, ?)',
    updateUser: 'UPDATE users SET full_name = ?, rfc = ?, email = ?, postal_code = ? WHERE id = ?',
    deleteUser: 'DELETE FROM users WHERE id = ?',
};