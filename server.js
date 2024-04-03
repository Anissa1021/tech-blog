const session = require("express-session");
const exphbs = require("express-handlebars");
const express = require("express");
const sequelize = require("./config/connection");
const allRoutes = require("./controllers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sess = {
  secret: process.env.DB_SESSION_SECRET,
  cookie: {
    maxAge: 0.5 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

app.use(express.static('public'));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("Listening to PORT " + PORT);
  });
});