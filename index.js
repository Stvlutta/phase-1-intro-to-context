function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  let [date, hour] = dateTime.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });
  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  let [date, hour] = dateTime.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(event => event.date === date);
  let timeOut = employee.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

function allWagesFor(employee) {
  let eligibleDates = employee.timeInEvents.map(event => event.date);
  let payable = eligibleDates.reduce((memo, date) => memo + wagesEarnedOnDate(employee, date), 0);
  return payable;
}

function calculatePayroll(employees) {
  return employees.reduce((memo, employee) => memo + allWagesFor(employee), 0);
}
