//NOTE: Your DOM manipulation will occur in this file
// import users from './data/users';
import { returnAverageSteps, 
  nameFriends, 
  currentUser, 
  getDailyFlOz, 
  getAllTimeAverageFlOz, 
  weeklyHydroData, 
  getUserDailyHrSleep,
  getUserDailyQualitySleep, 
  calculateUserAverageSleep,
  calculateUserAverageSleepQuality,
  weeklyHourlySleepData,
  weeklyQualitySleepData,
} from './functions';

// import returnAverageSteps from './scripts';
// query selectors
const userName = document.querySelector('.user-greeting');
const userDailyStepGoal = document.querySelector('.user-daily-step-goal');
const cohortStepGoal = document.querySelector('.average-step');
const userStepComparison = document.querySelector('.avg-user-step-comparison');
export const userInfoButton = document.querySelector('.user-info-button');
const altLowerPane = document.querySelector('.alt-lower-pane');
const lowerPane = document.querySelector('.lower-pane');
const userNameField = document.querySelector('.user-name');
const addressField = document.querySelector('.user-address');
const emailField = document.querySelector('.user-email');
const strideLengthField = document.querySelector('.user-stride-length');
const stepGoalField = document.querySelector('.user-step-goal');
const friendsField = document.querySelector('.user-friends');
const userIcon = document.querySelector(".user-icon");

const todayHydro = document.querySelector('.todays-hydro');
const avgHydro = document.querySelector('.average-water');
// const day1Hydro = document.querySelector('.hydro1');
// const day2Hydro = document.querySelector('.hydro2');
// const day3Hydro = document.querySelector('.hydro3');
// const day4Hydro = document.querySelector('.hydro4');
// const day5Hydro = document.querySelector('.hydro5');
// const day6Hydro = document.querySelector('.hydro6');
// const day7Hydro = document.querySelector('.hydro7');

// const day1Date = document.querySelector('.day1');
// const day2Date = document.querySelector('.day2');
// const day3Date = document.querySelector('.day3');
// const day4Date = document.querySelector('.day4');
// const day5Date = document.querySelector('.day5');
// const day6Date = document.querySelector('.day6');
// const day7Date = document.querySelector('.day7');

const todaysHourlySleep = document.querySelector('.todays-hourly-sleep');
const todaysQualitySleep = document.querySelector('.todays-quality-sleep');
const averageHourlySleep = document.querySelector('.average-hours-slept');
const averageQualitySleep = document.querySelector('.average-quality-slept');

const hydroBarChart = document.getElementById('hydroChart');
const hourlySleepBarChart = document.getElementById('sleep-hourly-graph');
const qualityBarChart = document.getElementById('sleep-quality-graph');

// Create the chart
// const chart = new Chart(hydroBarChart, {
//   type: 'bar',
//   data: {
//     labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//     datasets: [{
//       label: 'Last Weeks Hydration',
//       data: ['0','0','0','0','0','0','0'],
//       backgroundColor: 'rgba(42, 184, 250, 0.6)', // Customize the bar color
//     }]
//   },
//   options: {
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });


// universal variables

// functions

// const randomIndex = Math.floor(Math.random() * users.users.length);

// let currentUser = users.users[randomIndex];

export const updateUserDailyStepGoal = (user) => {
  userDailyStepGoal.innerText = `${user.dailyStepGoal}`;
};

export const updateIcon = () => {
  var container = document.getElementById("circle");
  console.log("container", container)
  var iconImage = document.createElement("img");
  iconImage.src = "./images/femaleAvatar.jpg";
  console.log("iconImage:", iconImage)
  container.appendChild(iconImage);
}
export const updateUserInfoPage = (user, data) => {
  userNameField.innerText = user.name
  addressField.innerText = user.address
  emailField.innerText = user.email
  strideLengthField.innerText = user.strideLength
  stepGoalField.innerText = user.dailyStepGoal
  friendsField.innerText = nameFriends(user, data)
};

export const calcStepComparison = (user, data) => {
  const percent = Math.floor(
    (user.dailyStepGoal / returnAverageSteps(data)) * 100
  );
  userStepComparison.innerText = `Your step goal is ${percent}% of the average user's step goal!`;
};

export const displayCohortStepAverage = (data) => {
  cohortStepGoal.innerText = `${returnAverageSteps(data)}`;
};

export const updateUserName = (user) => {
  userName.innerText = `Hello, ${user.name}!`;
};

export const toggleInfo = () => {
  altLowerPane.classList.toggle('hidden');
  lowerPane.classList.toggle('hidden');
  if (lowerPane.classList.contains('hidden')) {
    userInfoButton.innerText = `Back to Main`;
  } else {
    userInfoButton.innerText = `User Info`;
  }
};

export const displayTodayHydro = (day, data) => {
  todayHydro.innerText = `${getDailyFlOz(day, data)}`;
}

export const displayAvgHydro = (userHydroData) => {
  avgHydro.innerText = `${getAllTimeAverageFlOz(userHydroData)}`
}

export const formatDate = (weeklyData) => {
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const justDates = weeklyData.map(datum => datum.date)
  const daysArray = justDates.map(date => new Date(date))
  const previous7Days = daysArray.map(previousDay => weekDays[previousDay.getDay()])
  return previous7Days
}

export const displayDailyHydro = (day, userHydroData) => {
  const weeklyData = weeklyHydroData(userHydroData, day);
  const days = formatDate(weeklyData)
  
  // day1Hydro.innerText = `${weeklyData[0].numOunces}`;
  // day2Hydro.innerText = `${weeklyData[1].numOunces}`;
  // day3Hydro.innerText = `${weeklyData[2].numOunces}`;
  // day4Hydro.innerText = `${weeklyData[3].numOunces}`;
  // day5Hydro.innerText = `${weeklyData[4].numOunces}`;
  // day6Hydro.innerText = `${weeklyData[5].numOunces}`;
  // day7Hydro.innerText = `${weeklyData[6].numOunces}`;

  // day1Date.innerText = `${days[0]}`; 
  // day2Date.innerText = `${days[1]}`; 
  // day3Date.innerText = `${days[2]}`; 
  // day4Date.innerText = `${days[3]}`; 
  // day5Date.innerText = `${days[4]}`; 
  // day6Date.innerText = `${days[5]}`; 
  // day7Date.innerText = `${days[6]}`; 
  const ouncesperDay = weeklyData.map(data => data.numOunces);
  return ouncesperDay;
}

// export const populateHydroGraph = (day, hydroData) => {
//   chart.data.datasets[0].data = displayDailyHydro(day, hydroData);
//   chart.update();
// }

export const createHydroBarGraph = (day, hydroData) => {
  const chart = new Chart(hydroBarChart, {
    type: 'bar',
    data: {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: 'Last Weeks Hydration',
        data: displayDailyHydro(day, hydroData),
        backgroundColor: 'rgba(42, 184, 250, 0.6)', // Customize the bar color
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

export const createHourlySleepBarGraph = (sleepData, day) => {
  const chart = new Chart(hourlySleepBarChart, {
    type: 'bar',
    data: {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: 'Last Weeks Hourly Sleep Data',
        data: weeklyHourlySleepData(sleepData, day),
        backgroundColor: 'rgba(42, 184, 250, 0.6)', // Customize the bar color
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

export const createQualitySleepBarGraph = (sleepData, day) => {
  const chart = new Chart(qualityBarChart, {
    type: 'line',
    data: {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: 'Last Weeks Quality',
        data: weeklyQualitySleepData(sleepData, day),
        backgroundColor: 'rgba(42, 184, 250, 0.6)', // Customize the bar color
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
export const displaySleepDataToDom = (day, sleepData) => {
  todaysHourlySleep.innerText = `${getUserDailyHrSleep(day, sleepData)}`;
  todaysQualitySleep.innerText = `${getUserDailyQualitySleep(day, sleepData)}`;
  averageHourlySleep.innerText = `${calculateUserAverageSleep(sleepData)}`;
  averageQualitySleep.innerText = `${calculateUserAverageSleepQuality(sleepData)}`;
}

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.
// const exampleFunction1 = (person) => {
//   console.log(`oh hi there ${person}`);
// };

// const exampleFunction2 = (person) => {
//   console.log(`bye now ${person}`);
// };

// export { exampleFunction1, exampleFunction2 };
