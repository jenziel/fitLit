import {
  returnAverageSteps,
  nameFriends,
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
  dateToMonth,
} from "./functions";

import { imagesArray } from "./images/svgFiles";
// import { globalCurrentUser } from "./scripts";

// query selectors
const userName = document.querySelector(".user-greeting");
const userDailyStepGoal = document.querySelector(".user-daily-step-goal");
const cohortStepGoal = document.querySelector(".average-step");
const userStepComparison = document.querySelector(".avg-user-step-comparison");
export const userInfoButton = document.querySelector(".user-info-button");
const altLowerPane = document.querySelector(".alt-lower-pane");
const lowerPane = document.querySelector(".lower-pane");
const userNameField = document.querySelector(".user-name");
const addressField = document.querySelector(".user-address");
const emailField = document.querySelector(".user-email");
const strideLengthField = document.querySelector(".user-stride-length");
const stepGoalField = document.querySelector(".user-step-goal");
const friendsField = document.querySelector(".user-friends");

const todayHydro = document.querySelector(".todays-hydro");
const avgHydro = document.querySelector(".average-water");

// last night:
const todaysHourlySleep = document.querySelector(".todays-hourly-sleep");
const todaysQualitySleep = document.querySelector(".todays-quality-sleep-num");
export const lastNightQualityGoodBad = document.querySelector(
  ".sleep-quality-today-descriptive"
);
// weekly:
const averageHourlySleep = document.querySelector(".average-hours-slept");
const averageQualitySleep = document.querySelector(
  ".average-quality-slept-num"
);
export const avgQualityGoodBad = document.querySelector(
  ".sleep-quality-avg-descriptive"
);

const userStepsDisplay = document.querySelector(".step-amount");
const minutesActiveDisplay = document.querySelector(".minutes-active");

const userDistanceDisplay = document.querySelector(".miles-walked");

const hydroBarChart = document.getElementById("hydroChart");
const hourlySleepBarChart = document.getElementById("sleep-hourly-graph");
const qualityBarChart = document.getElementById("sleep-quality-graph");
const activityBarChart = document.getElementById("user-activity-graph");

const displayStepChallenge = document.querySelector(".challenge-results");
const activityTrendText = document.querySelector(".activity-trend-title");
const activityTrendGraph = document.getElementById(
  "activity-trend-graph-display"
);


let hydroChart 


export const hydroUserInput = document.getElementById('user-hydration-input');
export const hydroUserInputButton = document.querySelector('.user-hydration-input-button');
export const errorMessage = document.querySelector('.error-message');

export const gatherUserInput = () => {
  let userInput = hydroUserInput.value;
    if(isNaN(userInput)) { 
      // error message appear 
      errorMessage.innerText = ''
      errorMessage.innerText = 'Please enter a number'
  } else {
    errorMessage.innerText = ''
    errorMessage.innerText = 'Today I drank'
      // capture input and POST
    }
    console.log(userInput) 
  
  return parseInt(userInput)
}

export const updateUserDailyStepGoal = (user) => {
  userDailyStepGoal.innerText = `${user.dailyStepGoal}`;
};

export const updateIcon = () => {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  const imageToBeUsed = imagesArray[randomIndex];
  var iconImage = document.getElementById("icon");
  iconImage.src = imageToBeUsed;
};

export const updateUserInfoPage = (user, data) => {
  userNameField.innerText = user.name;
  addressField.innerText = user.address;
  emailField.innerText = user.email;
  strideLengthField.innerText = user.strideLength;
  stepGoalField.innerText = user.dailyStepGoal;
  friendsField.innerText = nameFriends(user, data);
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
  displayStepChallenge.innerHTML = "";
  challengeData.forEach((datum, index) => {
    let crown = "👑";
    let firstPlace = "first-place";
    if (index !== 0) {
      crown = "";
      firstPlace = "";
    }

    displayStepChallenge.innerHTML += `<p class=${firstPlace}>${
      index + 1
    }. ${datum} ${crown}</p>`;
  });
};

export const updateUserName = (user) => {
  userName.innerText = `Hello, ${user.name}!`;
};

export const toggleInfo = () => {
  altLowerPane.classList.toggle("hidden");
  lowerPane.classList.toggle("hidden");
  if (lowerPane.classList.contains("hidden")) {
    userInfoButton.innerText = `Back to Main`;
  } else {
    userInfoButton.innerText = `User Info`;
  }
};

export const updateHydroGraph = (day, currentUserH2O) => {
  let hydroGraphData = { 
    labels: formatDate(weeklyHydroData(currentUserH2O, day)),
    datasets: [
      {
        label: "Last Weeks Hydration",
        data: displayDailyHydro(day, currentUserH2O),
        backgroundColor: "rgba(42, 184, 250, 0.6)", // Customize the bar color
      }]
    };
  hydroChart.data = hydroGraphData;
  hydroChart.update()
}

export const displayTodayHydro = (day, data) => {
  todayHydro.innerText = `${getDailyFlOz(day, data)}`;
};

export const displayAvgHydro = (userHydroData) => {
  avgHydro.innerText = ``
  avgHydro.innerText = `${getAllTimeAverageFlOz(userHydroData)}`;
};

export const displayDailyHydro = (day, userHydroData) => {
  const weeklyData = weeklyHydroData(userHydroData, day);
  const ouncesperDay = weeklyData.map((data) => data.numOunces);
  return ouncesperDay;
};

export const createHydroBarGraph = (day, hydroData) => {
  hydroChart = new Chart(hydroBarChart, {
    type: "bar",
    data: {
      labels: formatDate(weeklyHydroData(hydroData, day)),
      datasets: [
        {
          label: "Last Weeks Hydration",
          data: displayDailyHydro(day, hydroData),
          backgroundColor: "rgba(42, 184, 250, 0.6)", // Customize the bar color
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Fluid Ounces",
          },
        },
      },
    },
  });
};

export const createHourlySleepBarGraph = (sleepData, day) => {
  const chart = new Chart(hourlySleepBarChart, {
    type: "bar",
    data: {
      labels: formatDate(weeklySleepData(sleepData, day)),
      datasets: [
        {
          label: "Last Weeks Hourly Sleep Data",
          data: weeklyHourlySleepData(sleepData, day),
          backgroundColor: "rgba(58, 13, 143, 0.9)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Hours Slept",
          },
        },
      },
    },
  });
};

export const createQualitySleepBarGraph = (sleepData, day) => {
  const chart = new Chart(qualityBarChart, {
    type: "line",
    data: {
      labels: formatDate(weeklySleepData(sleepData, day)),
      datasets: [
        {
          label: "Last Weeks Quality",
          data: weeklyQualitySleepData(sleepData, day),
          backgroundColor: "rgba(58, 13, 143, 0.9)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Sleep Quality",
          },
        },
      },
    },
  });
};

export const displaySleepDataToDom = (day, sleepData) => {
  todaysHourlySleep.innerText = `${getUserDailyHrSleep(day, sleepData)}`;
  todaysQualitySleep.innerText = `${getUserDailyQualitySleep(day, sleepData)}`;
  averageHourlySleep.innerText = `${calculateUserAverageSleep(sleepData)}`;
  averageQualitySleep.innerText = `${calculateUserAverageSleepQuality(
    sleepData
  )}`;
  lastNightQualityGoodBad.innerText = `${describeSleepQuality(
    getUserDailyQualitySleep(day, sleepData)
  )}`;
  avgQualityGoodBad.innerText = `${describeSleepQuality(
    calculateUserAverageSleepQuality(sleepData)
  )}`;
  lastNightQualityGoodBad.classList.add(
    changeGoodBadColor(getUserDailyQualitySleep(day, sleepData))
  );
  avgQualityGoodBad.classList.add(
    changeGoodBadColor(calculateUserAverageSleepQuality(sleepData))
  );
};

export const displayMinutesActive = (activityData, day) => {
  minutesActiveDisplay.innerText = `${calculateMinutesActive(
    activityData,
    day
  )}`;
};

export const displayUserSteps = (activityData, day) => {
  userStepsDisplay.innerText = `${getDaySteps(day, activityData)}`;
};

export const displayDistanceWalked = (activityData, day, currentUserData) => {
  userDistanceDisplay.innerText = `${calculateDayMileage(
    getDaySteps(day, activityData),
    currentUserData
  )}`;
};

export const createUserActivityGraph = (activityData, day, userData) => {
  const userStepGoal = ["", "", "", "", "", "", ""];

  const chart = new Chart(activityBarChart, {
    type: "bar",
    data: {
      labels: formatDate(weeklyActivityData(activityData, day)),
      datasets: [
        {
          type: "bar",
          label: "Last Weeks Activity",
          data: weeklyStepData(activityData, day),
          backgroundColor: compareUserStepGoal(
            weeklyStepData(activityData, day),
            userData
          ),
          yAxisID: "steps-y-axis", // Assign this dataset to the left y-axis
        },
        {
          type: "line",
          label: "Step Goal",
          data: userStepGoal.fill(userData.dailyStepGoal),
          borderColor: "red", // Change the color of the line as needed
          borderWidth: 3, // Adjust the width of the line as needed
          fill: false, // Disable filling the area under the line
          yAxisID: "steps-y-axis", // Assign this dataset to the left y-axis
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        "steps-y-axis": {
          type: "linear",
          position: "left",
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Steps",
          },
        },
      },
    },
  });
};

export const displayActivityTrendGraph = (trendData, today) => {
  let lastObject = trendData[trendData.length - 1];
  let mostRecentSteps = lastObject.map((datum) => datum.numSteps);
  let reformattedMostRecentDates = dateToMonth(trendData);

  if (lastObject[2].date !== today) {
    activityTrendText.innerText = `Your most recent trend:`;
  }

  const chart = new Chart(activityTrendGraph, {
    type: "bar",
    data: {
      labels: reformattedMostRecentDates,
      datasets: [
        {
          label: "Latest Trend",
          data: mostRecentSteps,
          backgroundColor: "rgba(242, 15, 15, 1)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Steps",
          },
        },
      },
    },
  });
};
