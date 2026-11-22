//import the express module
import express, { urlencoded } from 'express';

//import mysql
import mysql2 from 'mysql2';

//import dotenv
import dotenv from 'dotenv';
dotenv.config();

//create a connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//Creates an instance of an express app
const app = express();

//define a port number
const PORT  = 3002;

const contacts = [];

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render('home');
});
app.get('/contact', (req,res) => {
    res.render('contact');
});

app.get('/admin', async(req,res) => {
    try {
        const [contacts] = await
        pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
        console.log(contacts);
        res.render('admin', {contacts});
    } catch (err) {
        console.error('Database error: ', err);
        res.status(500).send('Database error occured');
    }
    
});

app.post('/submit-contact', async(req,res) => {
    try{
        const contact = req.body;
        const mailingList = contact.add ? 1 : 0;
        const emailFormat = mailingList ? (contact.emailformat || null) : null;

        console.log(contact);

        //
        const sql = `INSERT INTO contacts (first_name, last_name, job_title, company, linked_in, email, meeting, other_meeting, message, mailing_list, email_format)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            contact.fname,
            contact.lname,
            contact.jobtitle || null,
            contact.company || null,
            contact.linked || null,
            contact.email,
            contact.meeting,
            contact.meeting === 'other' ? (contact.specify || null) : null,
            contact.message || null,
            mailingList,
            emailFormat
        ];

        const [result] = await pool.execute(sql, params);

        contact.id = result.insertId;
        console.log('A new row was inserted with ID: ' + contact.id);

        contacts.push(contact);
        console.log(contacts);

        res.render('confirm', { contact });
    } catch (err){
        console.error('Database error: ' + err);
        res.status(500).send('Database error occured');
    }
   
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});