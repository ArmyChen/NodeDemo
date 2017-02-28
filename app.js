//加载引用包
var express =require('express');
var expressControllers = require('express-controller');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

//视图加载
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//静态文件载入
app.use(express.static(path.join(__dirname, 'public')));

//传输数据json处理
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//路由控制
app.use(router);

//绑定控制器
expressControllers
	.setDirectory( __dirname + '/controllers')
	.bind(router);

//端口启动
app.listen(3000)