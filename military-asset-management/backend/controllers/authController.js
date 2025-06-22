const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = 'supersecretmilitarykey'; // Move to .env in production

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash: hash, role });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
  const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, role: user.role }); // ✅ Token + role returned to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
