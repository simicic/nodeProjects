var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
    res.render('index', {title: 'welcome'});
});

app.get('/about', function(req, res){
    res.render('about');
})

app.get('/contact', function(req, res){
    res.render('contact');
})

app.post('/contact/send', function(req, res){
    var transporter = nodemailer.transporter({
        service: 'Gmail', 
        auth: {
            'user': 'tech@gmail.com',
            pass: ''
        },       
    })
    var mailOptions = {
        from: 'Someone',
        to: 'someone@else.com',
        subject: 'Hello from someone',
        text: 'Some text of the email',
        html: '<p>Some text of the email</p>'
    }

    transporter.sendMail(mailOptions, function(error){
        if(error){
            console.log(error);
            res.redirect('/')
        } else {
            console.log('message sent')
        }
    })
})

app.listen(3005);
console.log("Hello from here")