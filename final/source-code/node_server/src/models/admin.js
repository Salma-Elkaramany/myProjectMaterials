const mysql = require('mysql');

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eventify"
});

const logIn = (data, callback) => {
  let sql = `select * from admins where email = '${data.email}' and password = md5('${data.password}')`;
  console.log("logo", sql)
  conn.query(sql, (err, result) => {
    if(result && result.length > 0) {
        let sql = `select id from admins where email = '${data.email}'`;
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
  let sql = `select * from admins where email = '${data.email}'`;
  conn.query (sql, function (err, result) {
    if(result.length <= 0) {
      
      let sql = `insert into admins (username, f_name, l_name, phoneNumber, email, password, image)
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
    let sql = `select * from admins where email = '${email}'`;
    conn.query(sql, function (err, result) {
      callback(result[0]);
    })
}

const getNotifications = (email, callback) => {
  let sql = `select * from notifications where email='${email}' and checked = 1 order by id desc`;
  conn.query(sql, function (err, result) {
    callback(result);
  })
}

const setNotification = (id, callback) => {
  let sql = `delete from notifications where id = '${id}'`;
  conn.query(sql, function(res, result) {
    callback('success');
  })
}
  
const profileSet = (data, callback) => {
  var checkEmail = 0;
  if(data.email != '') {
    let sql = `select id from admins where email = '${data.email}'`;
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
    let sql = `select * from admins where id = '${data.currentId}' and password = md5('${data.currentPass}')`;
    conn.query(sql, function(err, result) {
      if(result.length != 0) {
        checkPassword = 0;
      } else {
        checkPassword = 1;
      }
    })
  }

  let sql = `select * from admins where id = '${data.currentId}'`;
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
    let sql = `update admins SET forename='${forname}', surname='${surname}', username='${username}', phoneNumber='${phone}', email = '${email}', password = md5('${password}') where id = '${data.currentId}'`;
    console.log("update", sql)
    conn.query(sql, function (err, result) {
      callback('success');
    })
  })
}


const fileUpload = (path, email, callback) => {
    let sql = `update admins set image = '${path}' where email = "${email}"`;
    conn.query(sql, function (err, result) {
      callback('success');
    })
}

const processingEvent = (callback) => {
    let sql = `select * from events where delet = 2`;
    conn.query(sql, function(err, result) {
        callback(result);
    })
}

const eventAction = (id, action, email, callback) => {
    if(action == 0) {
        var sql = `update events set delet = 0 where id = '${id}'`;
    } else {
        var sql = `update events set delet = 1 where id = '${id}'`;
    }
    conn.query(sql, function(err, result) {
        if(action == 0) {
            var sql = `select * from users`;
            conn.query(sql, function(err, result) {
              if(result.length != 0) {
                result.map((user) => {
                  let sql = `insert into notifications (email, checked, msg) values ('${user.email}', 0, 'Event delete request was canceled.')`;
                  conn.query(sql, function(err, result){})
                })
              }
            })
            sql = `select * from admins`;
            conn.query(sql, function(err, result) {
              if(result.length != 0) {
                result.map((admin) => {
                    let sql = admin.email != email && `insert into notifications (email, checked, msg) values ('${admin.email}', 1, 'Event delete request was canceled.')`;
                    conn.query(sql, function(err, result){})
                })
              }
            })
            sql = `update tickets set event_del = 0 where event_id = '${id}'`;
        } else {
            var sql = `select * from users`;
            conn.query(sql, function(err, result) {
              if(result.length != 0) {
                result.map((user) => {
                  let sql = `insert into notifications (email, checked, msg) values ('${user.email}', 0, 'Event was deleted.')`;
                  conn.query(sql, function(err, result){})
                })
              }
            })
            sql = `select * from admins`;
            conn.query(sql, function(err, result) {
              if(result.length != 0) {
                result.map((admin) => {
                    let sql = admin.email != email && `insert into notifications (email, checked, msg) values ('${admin.email}', 1, 'Event was deleted.')`;
                    conn.query(sql, function(err, result){})
                })
              }
            })
            sql = `update tickets set event_del = 2 where event_id = '${id}'`;
        }
        conn.query(sql, function (err, result) {
            callback('success');
        })
    })
}

const getRoleUser = (callback) => {
  let sql = `select * from management`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const getAdmins = (callback) => {
  let sql = `select * from admins`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const insertRole = (data, callback) => {

  if(data.department != '') {
    let checkSql = `select * from management where role = '${data.department}'`;
    conn.query(checkSql, function (err, result) {
      if(result.length == 0) {
        var sql = `insert into management (role, action) 
                  values ('${data.department}', 0)`;
        conn.query(sql, function(err, result) {
          callback('success');
        })
      } else {
        callback('role');
      }
    })
  } else {
    callback('success');
  }
}

const deleteRole = (data, callback) => {
  if(data.role != '') {
    var sql = `delete from management where role = '${data.role}'`;
    conn.query(sql, function(err, result) {
      callback('success');
    })
  } else {
    callback('success');
  }
}
  
const insertUser = (data, callback) => {
  if(data.userEnquiry != '') {
    let checkSql = `select * from management where user = '${data.userEnquiry}'`;
    conn.query(checkSql, function (err, result) {
      if(result.length == 0) {
        var sql = `insert into management (user, action) 
        values ('${data.userEnquiry}', 1)`;
        conn.query(sql, function(err, result) {
          callback('success');
        })
      } else {
        callback('user');
      }
    })
  } else {
    callback('success');
  }
}
  
const deleteUser = (data, callback) => {
  if(data.removeEnquiry != '') {
    var sql = `delete from management where user = '${data.removeEnquiry}' `;
    conn.query(sql, function(err, result) {
      callback('success');
    })
  } else {
    callback('success');
  }
}
  
const setPermission = (data, callback) => {
  if(data.permissions != '') {
    let can_d = data.deleted ? 1 : 0;
    let can_m = data.modify ? 1 : 0; 
    
    var sql = `update admins set can_d = '${can_d}', can_m = '${can_m}' where email = '${data.permissions}'`;
    conn.query(sql, function(err, result) {
      callback('success');
    })
  } else {
    callback('success');
  }
}

const deleteEvent = (data, callback) => {
  let sql = `select * from events where id = '${data.id}'`;
  conn.query(sql, function(err, result) {
    if(result.length == 0) {
      callback('error');
    } else {
      let sql = `select * from events where id = '${data.id}' and delet != 0`;
      conn.query(sql, function(err, result) {
        if(result.length > 0) {
          callback('delete');
        } else {
          let sql = `update events set delet = 1, admin_desc = '${data.desc}' where id = '${data.id}'`;
          conn.query(sql, function(err, result) {
            let  sql = `select * from users`;
            conn.query(sql, function(err, result) {
              if(result.length != 0) {
                result.map((user) => {
                  let sql = `insert into notifications (email, checked, msg) values ('${user.email}', 0, 'Event was deleted.')`;
                  conn.query(sql, function(err, result){})
                })
              }
            })
            sql = `select * from admins`;
            conn.query(sql, function(err, result) {
              if(result.length != 0) {
                result.map((admin) => {
                    let sql = admin.email != data.email && `insert into notifications (email, checked, msg) values ('${admin.email}', 1, 'Event was deleted.')`;
                    conn.query(sql, function(err, result){})
                })
              }
            })
            sql = `update tickets set event_del = 2 where event_id = '${data.id}'`;
            conn.query(sql, function(err, result) {})
            callback('success');
          })
        }
      })
      
    }
  })
}

const updateEvent = (data, callback) => {
  console.log(data.period);
  let sql = `update events set 
            type = '${data.type}', 
            organiser = '${data.organiser}', 
            created_at = '${data.date}', 
            scheduled_at = '${data.scheduled}', 
            description = '${data.desc}', 
            period = ${data.period} 
            where id = '${data.id}'`;
  conn.query(sql, function(err, result) {
    let  sql = `select * from users`;
    conn.query(sql, function(err, result) {
      if(result.length != 0) {
        result.map((user) => {
          let sql = `insert into notifications (email, checked, msg) values ('${user.email}', 0, 'Event was changed.')`;
          conn.query(sql, function(err, result){})
        })
      }
    })

    sql = `update tickets set 
          type = '${data.type}', 
          created_at = '${data.date}', 
          scheduled_at = '${data.scheduled}', 
          description = '${data.desc}', 
          period = '${data.period}' 
          where event_id = '${data.id}'`;
    conn.query(sql, function(err, result){})
    callback('success');
  })
}

const getEventAll = (callback) => {
  let sql = `select * from events`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const getTicketAll =(callback) => {
  let sql = `select * from tickets order by id desc`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const updateTickets = (data, callback) => {
  let sql = `update tickets set 
            organiser = '${data.organiser}', 
            scheduled_at = '${data.scheduled}', 
            qr = '${data.qr}', 
            description = '${data.desc}', 
            period = ${data.period}
            where id = '${data.id}'`;
  conn.query(sql, function(err, result) {
    callback('success');
  })
  
}

const getQuestion = (callback) => {
  let sql = `select * from questions where action = '0'`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const answerQuestion = (data, callback) => {
  let sql = `update questions set answer = '${data.answer}', action = 1 where id = '${data.id}'`;
  conn.query(sql, function(err, result) {
    let  sql = `select * from questions where id = '${data.id}'`;
    conn.query(sql, function(err, result) {
      if(result.length != 0) {
          let sql = `insert into notifications (email, checked, msg) values ('${result[0].email}', 0, 'Question had answer.')`;
          conn.query(sql, function(err, result){})
      }
    })
    callback('success');
  })
}

const getFaqs = (callback) => {
  let sql = `select *from faqs where action != '2' order by id desc`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const answerFaqs = (data, callback) => {
  let sql = `update faqs set question = '${data.question}', answer = '${data.answer}', action = 1 where id = '${data.id}'`;
  conn.query(sql, function(err, result) {
    let  sql = `select * from users`;
    conn.query(sql, function(err, result) {
      if(result.length != 0) {
        result.map((user) => {
          let sql = `insert into notifications (email, checked, msg) values ('${user.email}', 0, 'Faq was changed.')`;
          conn.query(sql, function(err, result){})
        })
      }
    })
    callback('success');
  })
}

const getUsers = (callback) => {
  let sql = `select * from users`;
  conn.query(sql, function(err, result) {
    callback(result);
  })
}

const getEventAdmin = (callback) => {
  let sql = `select * from events where delet = 0`;
  conn.query(sql, function(err, events) {
    let sql = `select * from admins`;
    conn.query(sql, function(err, admins) {
      callback(events.length, admins.length);
    })
  })
}

const deleteFaq = (id, callback) => {
  let sql = `update faqs set action = 2 where id = '${id}'`;
  conn.query(sql, function(err, result) {
    let  sql = `select * from users`;
    conn.query(sql, function(err, result) {
      if(result.length != 0) {
        result.map((user) => {
          let sql = `insert into notifications (email, checked, msg) values ('${user.email}', 0, 'Faq was deleted.')`;
          conn.query(sql, function(err, result){})
        })
      }
    })
    callback('success');
  })
}

const modules = {
    logIn,
    signUp,
    profileGet,
    profileSet,
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
}
  
  module.exports = modules;