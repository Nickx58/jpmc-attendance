import React, { useState } from "react";
import moment from "moment"; // Install moment.js for date manipulation

const AttendanceTracker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(null);
  const [weekendsCount, setWeekendsCount] = useState(null);
  const [requiredDays, setRequiredDays] = useState(null);
  const [attendanceDates, setAttendanceDates] = useState([]);

  const calculateAttendance = () => {
    if (!startDate || !endDate) return;

    const start = moment(startDate);
    const end = moment(endDate);
    const daysDifference = end.diff(start, "days") + 1; // Including the end date
    const weekends = countWeekends(start, end);

    setTotalDays(daysDifference);
    setWeekendsCount(weekends);

    const workingDays = daysDifference - weekends;
    const daysNeeded = Math.ceil(workingDays * 0.6);
    setRequiredDays(daysNeeded);

    const availableDays = generateAttendanceDates(start, end, daysNeeded);
    setAttendanceDates(availableDays);
  };

  const countWeekends = (start, end) => {
    let count = 0;
    let current = start.clone();

    while (current <= end) {
      if (current.day() === 0 || current.day() === 6) count++;
      current.add(1, "day");
    }

    return count;
  };

  const generateAttendanceDates = (start, end, daysNeeded) => {
    const dates = [];
    let current = start.clone();

    while (current <= end && dates.length < daysNeeded) {
      if (current.day() !== 0 && current.day() !== 6) {
        dates.push(current.format("DD-MM-YYYY")); // Format to Day-Month-Year
      }
      current.add(1, "day");
    }

    return dates;
  };

  return (
    <div>
      <h1>Attendance Calculator</h1>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculateAttendance}>Calculate</button>
      {totalDays !== null && (
        <div>
          <h2>Total Days: {totalDays}</h2>
          <h2>Weekend Days: {weekendsCount}</h2>
          <h2>You need to attend at least {requiredDays} working days.</h2>
          <h3>Suggested Dates to Attend:</h3>
          <ul>
            {attendanceDates.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;
