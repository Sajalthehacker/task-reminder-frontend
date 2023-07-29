import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles


const Home = () => {
    const [reminderMsg, setReminderMsg] = useState("");
    const [remindAt, setRemindAt] = useState(new Date());
    const [reminderList, setReminderList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("http://localhost:5000/api/reminder/getAllReminders")

            if (data.status === "SUCCESSFULLY_FETCHED") {
                setReminderList(data.message)
            }
            else {
                alert(data.message)
            }
        }
        fetchData()
    }, []);

    const addReminder = async () => {
        const { data } = await axios.post("http://localhost:5000/api/reminder/addReminders", { reminderMsg, remindAt })

        if (data.status === "SUCCESSFULLY_FETCHED") {
            setReminderList(data.message)
        }
        else {
            alert(data.message)
        }
        setReminderMsg("");
        setRemindAt(new Date());
    };

    const deleteReminder = async (id) => {
        const { data } = await axios.post("http://localhost:5000/api/reminder/deleteReminders", { id })

        if (data.status === "SUCCESSFULLY_FETCHED") {
            setReminderList(data.message)
        }
        else {
            alert(data.message)
        }
    };

    return (
        <div className='homepage-container'>
            <div className="homepage">
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
                            <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete Reminder</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
