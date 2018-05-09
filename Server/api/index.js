var express = require('express');
var app = express();
const requestIp = require('request-ip');
var router = express.Router();
var controller = require('./controller');
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


//APIs for User
router.post('/createContact', controller.createContact);
router.get('/getAllContacts', controller.getAllContacts);
router.post('/createResearch', controller.createResearch);
router.get('/getAllResearches', controller.getAllResearches);
router.get('/getUserData/:user_id', controller.getUserData);



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
router.post('/sortRubrics' , controller.sortRubrics)

//APIs for Rucric Content
router.post('/createRubcricContent', controller.createRubcricContent);
router.post('/updateRubcricContent', controller.updateRubcricContent);
router.post('/removeRubricContent', controller.removeRubricContent);
router.post('/updateViews', controller.updateViews);


//APS for About
router.post('/createAbout', controller.createAbout);
router.post('/updateAbout', controller.updateAbout);
router.get('/getAbout', controller.getAbout);

router.post('/uploadImg',upload.single('profile'), controller.uploadImg);


// router.get('/getRubricContent/:slugName', controller.getRubricContent);

module.exports = router;