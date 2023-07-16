//NOTE: Your DOM manipulation will occur in this file
// import users from './data/users';
import { 
  returnAverageSteps, 
  nameFriends, 
  currentUser, 
  getDailyFlOz, 
  getAllTimeAverageFlOz, 
  weeklyHydroData, 
  getUserDailyHrSleep,
  getUserDailyQualitySleep, 
  calculateUserAverageSleep,
  calculateUserAverageSleepQuality,
  describeSleepQuality,
  changeGoodBadColor,
  weeklyHourlySleepData,
  weeklyQualitySleepData,
  calculateMinutesActive,
  getDaySteps,
  calculateDayMileage,
  formatDate,
  weeklyStepData,
  weeklySleepData,
  weeklyActivityData,
  compareUserStepGoal,
  
} from './functions';

import { imagesArray } from './images/svgFiles'

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

//last night:
const todaysHourlySleep = document.querySelector('.todays-hourly-sleep');
const todaysQualitySleep = document.querySelector('.todays-quality-sleep-num');
export const lastNightQualityGoodBad = document.querySelector('.sleep-quality-today-descriptive');
//weekly:
const averageHourlySleep = document.querySelector('.average-hours-slept');
const averageQualitySleep = document.querySelector('.average-quality-slept-num');
export const avgQualityGoodBad = document.querySelector('.sleep-quality-avg-descriptive');

const userStepsDisplay = document.querySelector('.step-amount');
const minutesActiveDisplay = document.querySelector('.minutes-active');
const minutesActiveDate = document.querySelector('.active-minutes-date')
const userDistanceDisplay = document.querySelector('.miles-walked');

const hydroBarChart = document.getElementById('hydroChart');
const hourlySleepBarChart = document.getElementById('sleep-hourly-graph');
const qualityBarChart = document.getElementById('sleep-quality-graph');
const activityBarChart = document.getElementById('user-activity-graph');

const displayStepChallenge = document.querySelector('.challenge-results');

export const updateUserDailyStepGoal = (user) => {
  userDailyStepGoal.innerText = `${user.dailyStepGoal}`;
};

export const updateIcon = () => {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  const imageToBeUsed = imagesArray[randomIndex];
  var container = document.getElementById("icon");
  var iconImage = document.createElement("img");
  iconImage.src = imageToBeUsed;
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

export const displayStepChallengeToDom = (challengeData) => {
  displayStepChallenge.innerHTML = '';
  challengeData.forEach((datum, index) => {
    let crown = '👑';
    if(index !== 0){
      crown = '';
    }

    displayStepChallenge.innerHTML += 
      `<p>${index+1}. ${datum} ${crown}</p>`;
  });
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

export const displayDailyHydro = (day, userHydroData) => {
  const weeklyData = weeklyHydroData(userHydroData, day);
  // const days = formatDate(weeklyData)
  const ouncesperDay = weeklyData.map(data => data.numOunces);
  return ouncesperDay;
}

export const createHydroBarGraph = (day, hydroData) => {
  const chart = new Chart(hydroBarChart, {
    type: 'bar',
    data: {
      labels: formatDate(weeklyHydroData(hydroData, day)),
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
          beginAtZero: true,
          title: {
            display: true,
            text: 'Fluid Ounces'
          }
        }
      }
    }
  });
}

export const createHourlySleepBarGraph = (sleepData, day) => {
  const chart = new Chart(hourlySleepBarChart, {
    type: 'bar',
    data: {
      labels: formatDate(weeklySleepData(sleepData, day)),
      datasets: [{
        label: 'Last Weeks Hourly Sleep Data',
        data: weeklyHourlySleepData(sleepData, day),
        backgroundColor: 'rgba(58, 13, 143, 0.6)', // Customize the bar color
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hours Slept'
          }
        }
      }
    }
  });
}

export const createQualitySleepBarGraph = (sleepData, day) => {
  const chart = new Chart(qualityBarChart, {
    type: 'line',
    data: {
      labels: formatDate(weeklySleepData(sleepData, day)),
      datasets: [{
        label: 'Last Weeks Quality',
        data: weeklyQualitySleepData(sleepData, day),
        backgroundColor: 'rgba(58, 13, 143, 0.6)', // Customize the bar color
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Sleep Quality'
          }
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
  lastNightQualityGoodBad.innerText = `${describeSleepQuality(getUserDailyQualitySleep(day, sleepData))}`
  avgQualityGoodBad.innerText = `${describeSleepQuality(calculateUserAverageSleepQuality(sleepData))}`
  lastNightQualityGoodBad.classList.add(changeGoodBadColor(getUserDailyQualitySleep(day, sleepData)))
  avgQualityGoodBad.classList.add(changeGoodBadColor(calculateUserAverageSleepQuality(sleepData)))
}


export const displayMinutesActive = (activityData, day) => {
  minutesActiveDisplay.innerText = `${calculateMinutesActive(activityData, day)}`;
}

export const displayUserSteps = (activityData, day) => {
  userStepsDisplay.innerText = `${getDaySteps(day, activityData)}`;
}

export const displayDistanceWalked = (activityData, day, currentUserData) => {
  userDistanceDisplay.innerText = `${calculateDayMileage(getDaySteps(day, activityData), currentUserData)}`;
}

export const createUserActivityGraph = (activityData, day, userData) => {
  const chart = new Chart(activityBarChart, {
    type: 'bar',
    data: {
      labels: formatDate(weeklyActivityData(activityData, day)),
      datasets: [{
        label: 'Last Weeks Activity',
        data: weeklyStepData(activityData, day),
        backgroundColor: compareUserStepGoal(weeklyStepData(activityData, day), userData)
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Steps'
          }
        }
      }
    }
  });
}
