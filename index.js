const exphbs = require('express-handlebars')
const todosRoutes = require('./routs/todos')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')


const PORT = process.env.PORT ?? 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todosRoutes)


async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://alexandr:1337@cluster0.2lqbr.mongodb.net/todos',
    )
    app.listen(PORT, () => {
      console.log(`Server has been started on Port: ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }
}

start()