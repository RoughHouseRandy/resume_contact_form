import express, { urlencoded } from 'express';

const app = express();

const PORT  = 3002;

const contacts = [];

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/confirm', (req,res) => {
    res.render('confirm');
});

app.get('/admin', (req,res) => {
    res.json(contacts);
});

app.post('/submit-contact', (req,res) => {
    const contact = req.body;
    contact.timestamp = new Date();

    console.log(contact);

    contacts.push(contact);
    console.log(contacts);

    res.redirect('confirm');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});