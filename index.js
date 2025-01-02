const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override')
require('dotenv').config()
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const systemConfig = require("./config/system");

const app = express()
const port = process.env.PORT

const database = require("./config/database");
database.connect();

// Template engines: PUG
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

// Hiển thị thông báo
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// File tĩnh
app.use(express.static(`${__dirname}/public`))

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Khởi tạo prefixAdmin cho file PUG
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Khỏi tạo đường dẫn client/admin
routeClient(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})