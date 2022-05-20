//this file is optional and usually ORM dependent if an ORM is used.
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eventify"
});

const logIn = (data, callback) => {
  let sql = `select * from users where email = '${data.email}' and password = md5('${data.password}')`;
  conn.query(sql, (err, result) => {
    if(result && result.length > 0) {
      let sql = `select id from users where email = '${data.email}'`;
        conn.query(sql, (err, result) => {
          if(result && result.length > 0){
            callback("success", result[0].id);
          }else {
            callback("error");
          }
        })
    } else {
      callback('error');
    }
  })
}

const signUp = (data, callback) => {
  let sql = `select * from users where email = '${data.email}'`;
  conn.query (sql, function (err, result) {
    if(result.length <= 0) {
      
      let sql = `insert into users (username, f_name, l_name, phoneNumber, email, password, image)
                 values('${data.userName}', '${data.firstName}', '${data.lastName}', '${data.phoneNumber}', '${data.email}', md5('${data.pass}'), '${data.path}')`;
      conn.query(sql, function (err, result) {
        callback('success');
      })
    } else {
      callback('error');
    }
  })
}

const profileGet = (email, callback) => {
  let sql = `select * from users where email = '${email}'`;
  conn.query(sql, function (err, result) {
    callback(result[0]);
  })
}

const getNotifications = (email, callback) => {
  let sql = `select * from notifications where email = '${email}' and checked = 0 order by id desc`;
  conn.query(sql, function (err, result) {
    callback(result);
  })
}

const setNotifications = (id, callback) => {
  let sql = `delete from notifications where id = '${id}'`;
  conn.query(sql, function (err, result) {
    callback('success');
  })
}

const profileSet = (data, callback) => {
  var checkEmail = 0;
  if(data.email != '') {
    let sql = `select id from users where email = '${data.email}'`;
    conn.query(sql, function (err, result) {
      if(result.length > 0) {
        if(result[0].id == data.currentId){
          checkEmail = 0;
        }else
          checkEmail = 1;
      } else {
        checkEmail = 0;
      }
    })
  }

  var checkPassword = 0;
  if(data.currentPass != '') {
    let sql = `select * from users where id = '${data.currentId}' and password = md5('${data.currentPass}')`;
    conn.query(sql, function(err, result) {
      if(result.length != 0) {
        checkPassword = 0;
      } else {
        checkPassword = 1;
      }
    })
  }

  let sql = `select * from users where id = '${data.currentId}'`;
  conn.query(sql, function (err, result) {
    if(checkEmail == 1) {
      callback('email');
      return;
    }

    if(checkPassword == 1) {
      callback('password');
      return;
    }


    let forname = data.forname == '' ? result[0].forename : data.forname;
    let surname = data.surname == '' ? result[0].surname : data.surname;
    let username = data.username == '' ? result[0].username : data.username;
    let phone = data.phone == '' ? result[0].phoneNumber : data.phone;
    let email = data.email == '' ? result[0].email : data.email; 
    let password = data.newPass == '' ? result[0].newPass : data.newPass;
    let sql = `update users SET forename='${forname}', surname='${surname}', username='${username}', phoneNumber='${phone}', email = '${email}', password = md5('${password}') where id = '${data.currentId}'`;
    console.log("update", sql)
    conn.query(sql, function (err, result) {
      callback('success');
    })
  })
}


const fileUpload = (path, email, callback) => {
  let sql = `update users set image = '${path}' where email = "${email}"`;
  conn.query(sql, function (err, result) {
    callback('success');
  })
}

const event = (data, callback) => {
  let sql = `insert into events (period, email, type, organiser, created_at, scheduled_at, qr, description)
              values('${data.period}', '${data.email}', '${data.type}', '${data.organiser}', '${data.date}', '${data.scheduled}', '${data.qr}', '${data.desc}')`;
  conn.query(sql, function(err, result) {
    let  sql = `select * from admins`;
    conn.query(sql, function(err, result) {
      if(result.length != 0) {
        result.map((admin) => {
            
            let sql = data.who == 1 ? (admin.email != data.email && `insert into notifications (email, checked, msg) values ('${admin.email}', 1, 'Event was created.')`) : `insert into notifications (email, checked, msg) values ('${admin.email}', 1, 'Event was created.')`;
            
            conn.query(sql, function(err, result){})
        })
      }
    })

    sql = `select * from users`;
    conn.query(sql, function(err, result) {
      if(result.length != 0) {
        result.map((user) => {
          if(user.email != data.email) {
            let sql = data.who == 0 ? (user.email != data.email && `insert into notifications (email, checked, msg) values ('${user.email}', 0, 'Event was created.')`) : `insert into notifications (email, checked, msg) values ('${user.email}', 0, 'Event was created.')`;
            conn.query(sql, function(err, result){})
          }
        })
      }
    })
    callback('success');
  })
}



const getEvent = (data, callback) => {
  if(data.delete == 0) {
    var sql = `select * from events where delet = ${data.delete} or delet = 2 order by id desc`;
  } else {
    var sql = `select * from events where delet = ${data.delete} or delet = 4 order by id desc`;
  }
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const deleteEvent = (id, desc, callback) => {
  let sql = `update events set delet = 2, delet_desc = '${desc}' where id = '${id}'`;
  conn.query(sql, function(err, result) {
    let sql = `update tickets set event_del = 1 where event_id = '${id}'`;
    conn.query(sql, function(err, result) {
      let  sql = `select * from admins`;
      conn.query(sql, function(err, result) {
        if(result.length != 0) {
          result.map((admin) => {
            let sql = `insert into notifications (email, checked, msg) values ('${admin.email}', 1, 'Event was deleted by user.')`;
            conn.query(sql, function(err, result){})
          })
        }
      })
      callback('success');
    })
  })
}

const ticket = (data, callback) => {
  let sql = `select * from users where email = '${data.email}'`;
  conn.query(sql, function(err, result) {
    let sql = `insert into tickets (username, period, email, type, organiser, created_at, scheduled_at, qr, event_id, description)
          values('${result[0].username}', '${data.period}', '${data.email}', '${data.type}', '${data.organiser}', '${data.date}', '${data.scheduled}', '${data.qr}', '${data.id}', '${data.description}')`;
      conn.query(sql, function(err, result) {
      callback('success');
      })
  })
  
}

const updateTicket = (data, callback) => {
  let sql = `update tickets set 
              organiser = '${data.organiser}', 
              period = '${data.period}', 
              scheduled_at = '${data.scheduled}', 
              qr = '${data.qr}' 
              where id = '${data.ticketId}'`;
  conn.query(sql, function(err, result) {
    callback('success');
  })
}

const getTicket = (email, callback) => {
  let sql = `select * from tickets where email = '${email}' and delet = 0 order by id desc`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const deleteTicket = (id, callback) => {
  let sql = `update tickets set delet = 1 where id = '${id}'`;
  conn.query(sql, function(err, result) {
    callback('success');
  })
}

const askQuestion = (data, callback) => {
  let sql = `insert into questions (email, name, enquiry, message)
            values ('${data.email}', '${data.name}', '${data.enquiry}', '${data.message}')`;
  conn.query(sql, function(err, result) {
    let  sql = `select * from admins`;
      conn.query(sql, function(err, result) {
        if(result.length != 0) {
          result.map((admin) => {
            let sql = `insert into notifications (email, checked, msg) values ('${admin.email}', 1, 'A question has been raised.')`;
            conn.query(sql, function(err, result){})
          })
        }
      })
    callback('success');
  })
}

const askFaq = (question, callback) => {
  let sql = `insert into faqs (question)
            values ('${question}')`;
  conn.query(sql, function(err, result) {
    let  sql = `select * from admins`;
      conn.query(sql, function(err, result) {
        if(result.length != 0) {
          result.map((admin) => {
            let sql = `insert into notifications (email, checked, msg) values ('${admin.email}', 1, 'A faq has been raised.')`;
            conn.query(sql, function(err, result){})
          })
        }
      })
    callback('success');
  })
}

const getQuestion = (email, callback) => {
  let sql = `select * from faqs where action = 1`;
  conn.query(sql, function(err, faqs) {
    callback(faqs);
  })
}

const timesUpEvent = (id, callback) => {

  let sql = `update events set delet = 4 where id = '${id}'`;
  conn.query(sql, function(err, result) {
    let sql = `update tickets set event_del = 3 where event_id = '${id}'`;
    conn.query(sql, function(err, result) {
      callback('success');
    })
  })
}

const timesUpTicket = (id, callback) => {
  let sql = `update tickets set delet = 2 where id = '${id}'`;
  conn.query(sql, function(err, result) {
    callback('success');
  })
}

const getQuestions = (callback) => {
  let sql = `select * from questions where action = 1`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const deleteMsg = (id, callback) => {
  let sql = `delete from questions where id = '${id}'`;
  conn.query(sql, function(err, result) {
    callback('success');
  })
}

const modules = {
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
}

module.exports = modules;