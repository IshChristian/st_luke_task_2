const pool = require('../config/dbConfig');

class Staff {
    static async getAllStaff() {
        const [rows] = await pool.query(
            'SELECT s.*, p.post_name FROM staff s LEFT JOIN posts p ON s.post_id = p.post_id'
        );
        return rows;
    }

    static async getStaffById(id) {
        const [rows] = await pool.query(
            'SELECT s.*, p.post_name FROM staff s LEFT JOIN posts p ON s.post_id = p.post_id WHERE s.employee_id = ?',
            [id]
        );
        return rows[0];
    }

    static async createStaff(staffData) {
        const [result] = await pool.query(
            'INSERT INTO staff (first_name, last_name, email, phone, address, post_id, salary, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [staffData.first_name, staffData.last_name, staffData.email, staffData.phone, staffData.address, staffData.post_id, staffData.salary, staffData.department]
        );
        return result.insertId;
    }

    static async updateStaff(id, staffData) {
        const [result] = await pool.query(
            'UPDATE staff SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, post_id = ?, salary = ?, department = ? WHERE employee_id = ?',
            [staffData.first_name, staffData.last_name, staffData.email, staffData.phone, staffData.address, staffData.post_id, staffData.salary, staffData.department, id]
        );
        return result.affectedRows > 0;
    }

    static async deleteStaff(id) {
        const [result] = await pool.query(
            'DELETE FROM staff WHERE employee_id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Staff;
