import pool from '../config/db.js'

const UserModel = {
   async create(user) {
    const { name, email, password } = user;
    const query = `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const values = [name, email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findAll() {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  },

  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  },

  async update(id, user) {
    const { name, email, password } = user;
    const query = `
      UPDATE users 
      SET name = $1, email = $2, password = $3 
      WHERE id = $4 
      RETURNING *
    `;
    const values = [name, email, password, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }, 
  
  async deleteAll() {
    
    const result = await pool.query('DELETE FROM users RETURNING *'); // Executa a query de DELETE sem cláusula WHERE para remover todos
    return {
      count: result.rowCount,  
      deletedUsers: result.rows 
    };
  }
};

export default UserModel;