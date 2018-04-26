var express = require('express');
var app = express();
const requestIp = require('request-ip');
var router = express.Router();
var controller = require('./controller');



router.get('/httpheaders', controller.HTTPHeaders);
router.post('/postData', controller.postData);
router.post('/postContent', controller.postContent);






module.exports = router;