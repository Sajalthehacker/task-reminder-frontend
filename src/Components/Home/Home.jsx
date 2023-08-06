import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import { useSelector, useDispatch } from 'react-redux'
import { setEmailStore, setIsEmailVerifiedStore, setIsLoggedInStore, setNameStore, setTokenStore } from '../../Redux/Actions/Action'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [reminderMsg, setReminderMsg] = useState("");
    const [remindAt, setRemindAt] = useState(new Date());
    const [reminderList, setReminderList] = useState([]);

    const myStore = useSelector((store) => store.userReducer)
    const email = myStore.Email

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/reminder/getAllReminders`, {
                email: email
            })

            if (data.status === "SUCCESSFULLY_FETCHED") {
                setReminderList(data.message)
            }
            else {
                alert(data.message)
            }
        }
        fetchData()
    }, [email]);

    const addReminder = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/reminder/addReminders`, { reminderMsg, remindAt, email })

        if (data.status === "SUCCESSFULLY_FETCHED") {
            setReminderList(data.message)
        }
        else {
            alert(data.message)
        }
        setReminderMsg("");
        setRemindAt(new Date());
    };

    const deleteReminder = async (id, email) => {
        const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/reminder/deleteReminders`, { id, email })

        if (data.status === "SUCCESSFULLY_FETCHED") {
            setReminderList(data.message)
        }
        else {
            alert(data.message)
        }
    };

    const logOutHandler = (e) => {
        e.preventDefault()

        dispatch(setNameStore(""))
        dispatch(setEmailStore(""))
        dispatch(setIsEmailVerifiedStore(false))
        dispatch(setIsLoggedInStore(false))
        dispatch(setTokenStore(""))

        navigate('/')
    }

    return (
        <div className='homepage-container'>
            <div className="homepage">
                <h1>Welcome {`${myStore.Name}`}</h1>
                <button className='log-out-btn' onClick={logOutHandler}>Log Out</button>
                <div className="homepage_header">
                    <h1>Remind Me 🙋‍♂️</h1>
                    <input type="text" placeholder="Reminder notes here..." value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} />
                    <DatePicker
                        selected={remindAt}
                        onChange={date => setRemindAt(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                    />
                    <div className="button" onClick={addReminder}>Add Reminder</div>
                </div>

                <div className="homepage_body">
                    {reminderList.length === 0 ? null : reminderList.map(reminder => (
                        <div className="reminder_card" key={reminder._id}>
                            <h2>{reminder.reminderMessage}</h2>
                            <h3>Remind Me at:</h3>
                            <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, { timezone: "Asia/Kolkata" })))}</p>
                            <div className="button" onClick={() => deleteReminder(reminder._id, email)}>Delete Reminder</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
