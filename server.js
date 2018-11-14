const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
});

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.send({
		name: 'Your Name',
		school: [
			'BCIT',
			'SFU',
			'UBC'
		]
	})
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		menuOne: 'Home',
		menuTwo: 'About',
		menuThree: 'Info',
		linkOne: '/',
		linkTwo: '/shaun',
		linkThree: '/info',
		welcome: 'Hello!'
	});
});

app.get('/shaun', (request, response) => {
	response.render('shaun.hbs', {
		title: 'Shaun',
		year: new Date().getFullYear(),
		welcome: 'nice to meet you!',
		menu:[
		{name:'Home', link:'/'},
		{name:'Shaun', link:'/shaun'},
		{name:'Info', link:'/info'}
		],
		myImage: 'https://www.bankofcanada.ca/wp-content/uploads/2017/02/c150-carousel-image-500x250.jpg'
	});
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(8080, () => {
	console.log('Server is up on the port 8080');
});