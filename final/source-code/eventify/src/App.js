


import CheckUser from './components/check_user/check_user_layout';
import CheckAdmin from './components/check_admin/check_admin_layout';
import MainPage from './components/main_pages/main_layout';
import ScrollToTop from "react-scroll-to-top";
import MainAdminPage from './components/main_admin_pages/main_layout';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import serverRouter from './serverRouter';

function App() {

  const [view, setView] = useState(0);
  const [admin, setAdmin] = useState(0);
  const months = {
    'Jan' : 0, 
    'Feb' : 1, 
    'Mar' : 2, 
    'Apr' : 3, 
    'May' : 4, 
    'Jun' : 5, 
    'Jul' : 6, 
    'Aug' : 7, 
    'Sep' : 8, 
    'Oct' : 9, 
    'Nov' : 10, 
    'Dec' : 11
  };

  useEffect (() => {

    const timeEvent = async () => {
      const res = await axios.post(`${serverRouter}get_event`, {delete: 0});
      const data = res.data.result;
      data.map((event, index) => {
        const month =  months[event.scheduled_at.split(',')[0].split(' ')[0]];
        const day = parseInt(event.scheduled_at.split(',')[0].split(' ')[1]);
        const year = parseInt(event.scheduled_at.split(',')[1].split(' ')[1]);
        const hour = parseInt(event.scheduled_at.split(',')[1].split(' ')[2].split(':')[0]);
        const minute = parseInt(event.scheduled_at.split(',')[1].split(' ')[2].split(':')[1]);

        const now = new Date();
        const someDay = new Date();

        someDay.setFullYear(year, month, day);
        someDay.setHours(hour);
        someDay.setMinutes(minute);
        if(now > someDay) {
          if(event.delet != 1) {
            axios.post(`${serverRouter}times_up_event`, {id : event.id})
          }
        }
      })
    }

    const timeTicket = async () => {
      const res = await axios.post(`${serverRouter}get_ticket`, {email: sessionStorage.getItem('email')})
      const data = res.data.result;
      data.map((ticket, index) => {
        const month =  months[ticket.scheduled_at.split(',')[0].split(' ')[0]];
        const day = parseInt(ticket.scheduled_at.split(',')[0].split(' ')[1]);
        const year = parseInt(ticket.scheduled_at.split(',')[1].split(' ')[1]);
        const hour = parseInt(ticket.scheduled_at.split(',')[1].split(' ')[2].split(':')[0]);
        const minute = parseInt(ticket.scheduled_at.split(',')[1].split(' ')[2].split(':')[1]);

        const now = new Date();
        const someDay = new Date();

        someDay.setFullYear(year, month, day);
        someDay.setHours(hour);
        someDay.setMinutes(minute);
        if(now > someDay) {
          if(ticket.delet == 0 && ticket.event_del == 0) {
            axios.post(`${serverRouter}times_up_ticket`, {id : ticket.id})
          }
        }
      })
    }

    timeEvent();
    timeTicket();
  }, []);

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              view == 0 ?
                <CheckUser checked={(view) => setView(view)} /> :
                <MainPage logout={(view) => setView(view)} />
          } />
          <Route path="/admin" element={
            admin == 0 ?
              <CheckAdmin checked={(view) => setAdmin(view)} /> : 
              <MainAdminPage logout={(view) => setAdmin(view)} />
          } />
        </Routes>
      </BrowserRouter>
      
      <ScrollToTop
          smooth
      />
    </div>
  );
}

export default App;
