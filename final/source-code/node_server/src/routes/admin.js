const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
    logIn, 
    signUp, 
    profileSet, 
    profileGet, 
    fileUpload, 
    processingEvent, 
    eventAction,
    getRoleUser,
    getAdmins,
    insertRole,
    deleteRole,
    insertUser,
    deleteUser,
    setPermission,
    deleteEvent,
    updateEvent,
    getEventAll,
    getTicketAll,
    updateTickets,
    getQuestion,
    answerQuestion,
    getFaqs,
    answerFaqs,
    getUsers,
    getNotifications,
    setNotification,
    getEventAdmin,
    deleteFaq,
} = require('../models/admin');

router.post('/check_login',  function(req, res){
    console.log("check", req.body)
    logIn (req.body, function (result, id) {
        res.json({result:result, id:id});
    });
});

router.post('/check_signup', function(req, res){
    const url = req.protocol + '://' + req.get('host');
    const path = url + '/public/image/default.png';
    req.body['path'] = path
    signUp (req.body, function(result) {
        res.json({result});
    })
});

router.post('/profile_get', function(req, res){
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
    setNotification(req.body.id, function(result) {
        res.json({result});
    })
}) 

router.post('/profile_set', function(req, res){
    profileSet (req.body, function(result) {
        res.json(result);
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/admins/image')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})
  
const upload = multer({ storage: storage });

router.post('/upload', upload.single("file"), function(req, res) {
    const url = req.protocol + '://' + req.get('host');
    const path = url + '/public/admins/image/' + req.file.filename;
    fileUpload(path, req.body.email, function(result) {
        if(result == 'success')
            res.json({result: 'success'});
    })
})


router.get('/processing_event', function(req, res) {
    processingEvent(function(result) {
        res.json(result);
    })
})

router.post('/event_action', function(req, res) {
    eventAction(req.body.id, req.body.delete, req.body.email, function(result) {
        res.json({result});
    })
})

router.get('/get_role_user', function(req, res) {
    getRoleUser(function(result) {
        res.json({result});
    })
})

router.get('/get_admins', function(req, res) {
    getAdmins(function(result) {
        res.json({result});
    })
})

router.post('/management_insert_role', function(req, res) {

    insertRole(req.body, function (result) {

        res.json({result});
    })
})

router.post('/management_insert_user', function(req, res) {

    insertUser(req.body, function(result) {
        res.json({result});
    })
})
    
router.post('/management_delete_role', function(req, res) {

    deleteRole(req.body, function (result) {
        res.json({result});
    })
})
    
router.post('/management_delete_user', function(req, res) {

    deleteUser(req.body, function (result) {
        res.json({result});
    })
})
    
router.post('/management_set_permission', function(req, res) {

    setPermission(req.body, function (result) {
        res.json({result});
    })
})
    
router.post('/delete_event', function(req, res) {
    deleteEvent(req.body, function(result) {
        res.json({result});
    })
})

router.post('/update_event', function(req, res) {
    updateEvent(req.body, function(result) {
        res.json({result});
    })
})

router.get('/get_event_all', function(req, res) {
    getEventAll(function(result) {
        res.json({result});
    })
})

router.get('/get_ticket_all', function(req, res) {
    getTicketAll(function(result) {
        res.json({result});
    })
})

router.post('/update_ticket', function(req, res) {
    updateTickets(req.body, function(result) {
        res.json({result});
    })
})

router.get('/get_questions', function(req, res) {
    getQuestion(function(result) {
        res.json({result});
    })
})

router.post('/answer_question', function(req, res) {
    answerQuestion(req.body, function(result) {
        res.json({result});
    })
})

router.get('/get_faqs', function(req, res) {
    getFaqs(function(result) {
        res.json({result});
    })
})

router.post('/answer_faqs', function(req, res) {
    answerFaqs(req.body, function(result) {
        res.json({result});
    })
})

router.get('/get_users', function(req, res) {
    getUsers(function(result) {
        res.json({result});
    })
})

router.get('/get_event_admin', function(req, res) {
    getEventAdmin(function(events, admins) {
        res.json({events, admins})
    })
})

router.post('/delete_faq', function(req, res) {
    deleteFaq(req.body.id, function(result) {
        res.json({result});
    })
})

module.exports = router;