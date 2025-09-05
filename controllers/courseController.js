const db = require('../config/db');

// CREATE
exports.createCourse = (req, res) => {
  const { code, title, units } = req.body;
  if (!code || !title || units == null) {
    return res.status(400).json({ error: 'code, title, and units are required' });
  }
  const sql = 'INSERT INTO courses (code, title, units) VALUES (?, ?, ?)';
  db.query(sql, [code, title, units], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'code must be unique' });
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Course created', id: result.insertId });
  });
};

// READ ALL
exports.getCourses = (_req, res) => {
  db.query('SELECT * FROM courses ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// READ ONE
exports.getCourseById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM courses WHERE id=?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'course not found' });
    res.json(rows[0]);
  });
};

// UPDATE
exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const { code, title, units } = req.body;
  // allow partial update, but at least one field must be provided
  if (code == null && title == null && units == null) {
    return res.status(400).json({ error: 'provide at least one field to update' });
  }
  const fields = [];
  const values = [];
  if (code != null) { fields.push('code=?'); values.push(code); }
  if (title != null) { fields.push('title=?'); values.push(title); }
  if (units != null) { fields.push('units=?'); values.push(units); }
  values.push(id);

  const sql = `UPDATE courses SET ${fields.join(', ')} WHERE id=?`;
  db.query(sql, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'code must be unique' });
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'course not found' });
    res.json({ message: 'Course updated' });
  });
};

// DELETE
exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM courses WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'course not found' });
    res.json({ message: 'Course deleted' });
  });
};
