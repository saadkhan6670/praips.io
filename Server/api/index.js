var express = require('express');
var app = express();
const requestIp = require('request-ip');
var router = express.Router();
var controller = require('./controller');



//APIs for User
router.post('/createContact', controller.createContact);

router.post('/createResearch', controller.createResearch);

//APIs for Admin
router.post('/adminLogIn', controller.adminLogIn);
router.get('/loginKey', controller.LoginKey);
router.get('/LogKeyAuth', controller.LogKeyAuth);
router.post('/DelLogKey', controller.DelLogKey);

//APIs for Rubrics

router.post('/createRubric', controller.createRubric);
router.post('/updateRubcric', controller.updateRubcric);
router.post('/removeRubrics', controller.removeRubrics);
router.get('/getAllRubrics', controller.getAllRubrics);

//APIs for Rucric Content
router.post('/createRubcricContent', controller.createRubcricContent);
router.post('/updateRubcricContent', controller.updateRubcricContent);
router.post('/updateViews', controller.updateViews);


//APS for About
router.post('/createAbout', controller.createAbout);
router.post('/updateAbout', controller.updateAbout);
router.get('/getAbout', controller.getAbout);

// router.get('/getRubricContent/:slugName', controller.getRubricContent);

module.exports = router;