const request = require('request')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname, ('../public')))
const hbs = require('hbs')
const {
    resolveSoa
} = require('dns')
//if you are not using the project name of the folder on the root .
//that we have to use this and set it in paths as done below.
//if we are using a folder of views on the name , then donot need to set the path of views
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

// Express library exposes just a single function as opposed to something like an object 
// We call it to create to express application as done below

const app = express();
//express method does not take any variable , but instead we confugire our ser ver using differnt methds provided on the application itself
//it is a way to customize your server
//static takes the folder that we want to serve up.
//set up the views 

const publicDirecotryPath = path.join(__dirname, ('../public'))
app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(publicDirecotryPath))

//app.com
//app.com/help

//req is the incoming request to the server 
//res is the response which we will send back to the requester

// app.get('',(req,res)=>{
//     //res.send allows us to send something back to the requester
//     res.send('<h1>Weather</h1>')
//     //Start the server up .

// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Ashar',
//         age:27
//     },{
//         name:'Ali',
//         age:29
//     }
// ])

// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1> ')

// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:'It is snowing',
//         location:'Lahore'
//     })

// })

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must Provide a Valid Address'
        })
    } else {
        geocode(req.query.address, (error, {
            latitude,
            longitude,
            location
        } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }


            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                console.log(location)
                console.log(forecastData)
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address

                })
            })
        })
    }

    //the below code will print all the quert string which we are passing in the url 
    //You can not send two responses bacl , you can only send one respons back.

    // The Below code will 
    //    console.log(req.query.search)
    //    res.send({
    //     forecast:'It is snowing',
    //         location:'Lahore',
    //         address:req.query.address
    //    })

})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You can must provide valid Search Item'
        })
    }
    //the below code will print all the quert string which we are passing in the url 
    //You can not send two responses bacl , you can only send one respons back.

    console.log(req.query)
    // The Below code will 
    console.log(req.query.search)
    res.send({
        products: []
    })

})

//Routuning index.hbs file , in order to route to that page.
app.get('', (req, res) => {
    //renders allows us to render on our views 
    res.render('index', {
        title: 'Weather App',
        name: 'Created by Ashar Ijaz'
    })

})

//Routuning index.hbs file , in order to route to that page.
app.get('/about', (req, res) => {
    //renders allows us to render on our views 
    res.render('about', {
        title: 'About',
        name: 'Created by Ashar Ijaz'
    })

})

//Routuning index.hbs file , in order to route to that page.
app.get('/help', (req, res) => {
    //renders allows us to render on our views 
    res.render('help', {
        title: 'Help',
        name: 'Created by Ashar Ijaz',
        helpText: 'This is some helpful text as mu example',

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ashar Ijaz',
        errorMessage: 'Help article not found'
    })

})

//if we want so show 404 pages then we need to use wild card using * 
//if we are navigating to somethign , which is not listed above 
// we would navigate to 404 page 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ashar Ijaz',
        errorMessage: 'Page not Found'
    })

})
// its at the end because as per express first traverse and if we get 404 using ild card * which means it matches everthing 
//in that case it would stop there and show the 404 page , although the orignal page might well exist in the system



//app.listen will start the server on a given port 
//it is not a default port , on https website you have default ports
//for example 8080  is the default port for them
// the other optional parameter for the callback function is the calback function ,that function runs when the server is up and running
//process of starting the server is async function 
app.listen(3000, () => {
    console.log('Server is up on port 3000')

})

//Server is up and running and will not stop as soon you stop it 
// its job is to listen incoming requests 

//if you want to public static pages , then you need to put them in public 
//if the pages are dynamic , then you need to put them in views wiht hbs extension