const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

// save the URL newKey: URL
let keymaps = new Map();
let savedURL = []
const base_URL = 'http://localhost:' + port.toString() + '/'
// handlebar
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.redirect('/URL');
});

app.get('/URL', (req, res) => {
  res.render('FirstPage');
});

app.get('/short', (req, res) => {
  let userInput = req.query.importURL
  // if userInput is empty, show error and return
  if (userInput.toString().length === 0) {
    window.alert("Please enter valid URL!")
    res.redirect('/URL')
  }
  else {
    // make a new id for this website:
    // 1. firstly check if this URL has been saved before
    savedURL = [...keymaps.values()]
    if (savedURL.includes(userInput)) {
      // if include, return the old one
      shortenURL = base_URL + [...keymaps].find(([key, value]) => userInput === value)[0];
    }
    else {
      // generate a new key
      let newkey = Math.random().toString(36).substring(3, 8)
      // check if new key already exists, if it does, generate new key 
      while (keymaps.has(newkey)) {
        newkey = Math.random().toString(36).substring(3, 9)
      }
      // add to map
      keymaps.set(newkey, userInput);
      shortenURL = base_URL + newkey;
    }
  }
  res.render('SuccessPage', { shortenURL })
});

// redirect to the website 
app.get('/:id', (req, res) => {
  let shorten_id = req.params.id
  // check if the id is saved by us
  if (keymaps.has(shorten_id)) {
    // redirect to the web
    res.redirect(keymaps.get(shorten_id))
  }
  else {
    res.render('ErrorPage', { port })
  }

})
// Listen
app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});

