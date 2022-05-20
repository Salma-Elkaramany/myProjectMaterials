const express = require('express');
const router = express.Router();
const multer = require('multer');

const admin = require('./admin');

const {
    logIn, 
    signUp, 
    profileGet, 
    profileSet, 
    fileUpload, 
    event, 
    getEvent, 
    deleteEvent, 
    askQuestion, 
    askFaq, 
    getQuestion,
    ticket,
    getTicket,
    deleteTicket,
    timesUpEvent,
    updateTicket,
    timesUpTicket,
    getQuestions,
    getNotifications,
    setNotifications,
    deleteMsg,
} = require('../models/check');

/* GET programming languages. */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})
  
const upload = multer({ storage: storage });

router.use('/admin', admin);

router.post('/check_login',  function(req, res){
    logIn (req.body, function (result, id) {
        res.json({result:result, id:id});
        
    });
});



router.post('/check_signup', function(req, res) {
    const url = req.protocol + '://' + req.get('host');
    const path = url + '/public/image/default.png';
    req.body['path'] = path
    signUp (req.body, function(result) {
        res.json({result});
    })
});



router.post('/profile_get', function(req, res) {
    profileGet (req.body.email, function(result) {
        res.json(result);
    })
})

router.post('/notifications', function(req, res) {
    getNotifications(req.body.email, function(result) {
        res.json(result);
    })
})

router.post('/set_notification', function(req, res) {
    setNotifications(req.body.id, function(result) {
        res.json({result});
    })
})

router.post('/profile_set', function(req, res) {
    profileSet (req.body, function(result) {
        res.json(result);
    })
})

router.post('/upload', upload.single("file"), function(req, res) {
    const url = req.protocol + '://' + req.get('host');
    const path = url + '/public/image/' + req.file.filename;
    fileUpload(path, req.body.email, function(result) {
        if(result == 'success')
            res.json({result: 'success'});
    })
})


router.post('/event', function(req, res) {
    event(req.body, function(result) {
        if(result == 'success')
            res.json({result: 'success'});
    })
})



router.post('/get_event', function(req, res) {
    getEvent(req.body, function(result) {
        res.json({result: result});
    })
})

router.post('/delete_event', function(req, res) {
    deleteEvent(req.body.id, req.body.desc, function(result) {
        res.json({result: result});
    })
})

router.post('/ask_question', function(req, res) {
    askQuestion(req.body, function(result) {
        res.json({result: 'success'});
    })
})

router.post('/ask_faq', function(req, res) {
    askFaq(req.body.question, function(result) {
        res.json({result: 'success'});
    })
})

router.post('/get_question', function(req, res) {
    getQuestion(req.body.email, function(faqs) {
        res.json({faqs});
    })
})

router.post('/update_ticket', function(req, res) {
    updateTicket(req.body, function(result) {
        res.json({result});
    })
})

router.post('/ticket', function(req, res) {
    ticket(req.body, function(result) {
        res.json({result: 'success'});
    })
})

router.post('/get_ticket', function(req, res) {

    getTicket(req.body.email, function(result) {
        res.json({result: result});
    })
})

router.post('/delete_ticket', function(req, res) {
    deleteTicket(req.body.id, function(result) {
        res.json({result: result});
    })
})

router.post('/times_up_event', function(req, res) {
    timesUpEvent(req.body.id, function(result) {
        res.json({result});
    })
})

router.post('/times_up_ticket', function(req, res) {
    timesUpTicket(req.body.id, function(result) {
        res.json({result});
    })
})

router.get('/get_questions', function(req, res) {
    getQuestions(function(result) {
        res.json({result});
    })
})

router.post('/delete_msg', function(req, res) {
    deleteMsg(req.body.id, function(result) {
        res.json({result});
    })
})
module.exports = router;
