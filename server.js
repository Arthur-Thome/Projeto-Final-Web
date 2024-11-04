const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const { Pool } = require('pg');
const { google } = require('googleapis');

const app = express();
const PORT = 3000;

// Gera uma string aleatória segura para o secret
const sessionSecret = 'h7X3lpQp9Jr6V9X4bT8Kx2GzY6Mf5Pj9';

// Configuração do banco de dados PostgreSQL usando variáveis de ambiente
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'login',
    password: 'postgres',
    port: 5434
});

// Configurações do OAuth 2.0 para Nodemailer
const CLIENT_ID = '854154501431-hke1qnlmvtr26u0kqfcldfkubpp4n1c6.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'SEU_REFRESH_TOKEN'; // Insira seu token de atualização aqui

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Em produção, defina como true se estiver usando HTTPS
}));

// Rota de Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try{
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0 || !bcrypt.compareSync(password, result.rows[0].password)) {
            return res.status(400).send("Credenciais inválidas");
    }
    req.session.user = result.rows[0];
    res.send("Login bem-sucedido");
} catch (err) {
    return res.status(500).send("Erro no login: " + err.message);
}
});

// Rota de Cadastro
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 8);
    try{
        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
        res.redirect('/login');    
    } catch (err) {
        return res.status(400).send("Erro no cadastro: " + err.message);
    }

});

// Rota de Resetar a Senha
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body; // Captura a nova senha
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(400).send("Email não encontrado");

        const hashedPassword = bcrypt.hashSync(newPassword, 8);
        await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);

        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'seuemail@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: 'seuemail@gmail.com',
            to: email,
            subject: 'Reset de Senha',
            text: `Sua senha foi alterada com sucesso! Sua nova senha é: ${newPassword}`,
        };

        await transporter.sendMail(mailOptions);
        res.send("Email enviado com a nova senha");
    } catch (err) {
        return res.status(500).send("Erro ao resetar a senha: " + err.message);
    }
});

// Rota de Contato
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await pool.query('INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);
        
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'seuemail@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: 'seuemail@gmail.com',
            to: ['arthurthome7@gmail.com', 'arthurthome21@gmail.com'],
            subject: 'Nova mensagem de contato',
            text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.send("Mensagem enviada com sucesso");
    } catch (err) {
        return res.status(500).send("Erro ao enviar a mensagem: " + err.message);
    }
});


// logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});




// Id do cliente: 854154501431-hke1qnlmvtr26u0kqfcldfkubpp4n1c6.apps.googleusercontent.com
// Chave secreta: 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



// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100),
//     email VARCHAR(100) UNIQUE,
//     password VARCHAR(255)
// );

// CREATE TABLE contacts (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100),
//     email VARCHAR(100),
//     message TEXT
// );

// select * from users

// select * from messages