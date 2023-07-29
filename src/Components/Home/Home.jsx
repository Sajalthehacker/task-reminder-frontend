import React, { useState } from 'react'
import './Home.css'
import DateTimePicker from 'react-datetime-picker'

const Home = () => {
    const [reminderMsg, setReminderMsg] = useState("")
    const [remindAt, setRemindAt] = useState()
    const [reminderList, setReminderList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/reminder/getAllReminders").then(res => setReminderList(res.data.message))
    }, [])

    const addReminder = () => {
        axios.post("http://localhost:5000/api/reminder/addReminders", { reminderMsg, remindAt })
            .then(res => setReminderList(res.data.message))
        setReminderMsg("")
        setRemindAt()
    }

    const deleteReminder = (id) => {
        axios.post("http://localhost:5000/api/reminder//deleteReminders", { id })
            .then(res => setReminderList(res.data.message))
    }

    return (
        <div className='homepage-container'>
            <div className="homepage">
                <div className="homepage_header">
                    <h1>Remind Me 🙋‍♂️</h1>
                    <input type="text" placeholder="Reminder notes here..." value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} />
                    <DateTimePicker
                        value={remindAt}
                        onChange={setRemindAt}
                        minDate={new Date()}
                        minutePlaceholder="mm"
                        hourPlaceholder="hh"
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YYYY"
                    />
                    <div className="button" onClick={addReminder}>Add Reminder</div>
                </div>

                <div className="homepage_body">
                    {
                        reminderList.map(reminder => (
                            <div className="reminder_card" key={reminder._id}>
                                <h2>{reminder.reminderMsg}</h2>
                                <h3>Remind Me at:</h3>
                                <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, { timezone: "Asia/Kolkata" })))}</p>
                                <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete Reminder</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
