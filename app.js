const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();


app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login',(req,res)=>{
    res.cookie('name','ido',httponly = true);
    console.log(req.cookies);
    res.send('login success');
})

app.get('/logout',(req,res)=>{
    res.clearCookie('name');
    res.send('logout success');
})

app.get('/cart',(req,res)=>{
    res.send(`welcome:${req.cookies.user}`);
})


const port = 3000;
app.listen(port, () => console.log(`listening on port http://localhost:${port}`));