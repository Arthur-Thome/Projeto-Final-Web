const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { Pool } = require('pg');
require('dotenv').config(); // Importando o dotenv

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados PostgreSQL usando variáveis de ambiente
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Configuração do Nodemailer usando variáveis de ambiente
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Pasta para arquivos estáticos
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Rotas

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Email ou senha incorretos.' });
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
    res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
});

app.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user) {
        const token = Math.random().toString(36).substr(2); // Geração simples de token
        await pool.query('UPDATE users SET reset_token = $1 WHERE email = $2', [token, email]);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Redefinição de Senha',
            text: `Clique no link para redefinir sua senha: http://localhost:3000/reset-password?token=${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({ success: false, message: 'Erro ao enviar email.' });
            }
            res.json({ success: true, message: 'Email de redefinição enviado!' });
        });
    } else {
        res.json({ success: false, message: 'Email não encontrado.' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});