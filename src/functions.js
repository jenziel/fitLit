// User Data Functions:

import { lastNightQualityGoodBad, avgQualityGoodBad } from "./domUpdates";

export const createRandomUser = (usersArray) => {
  const randomIndex = Math.floor(Math.random() * usersArray.length);
  let currentUser = usersArray[randomIndex];
  return currentUser;
};

export const retrieveUserData = (userID, data) => {
  var user = data.users.find((user) => user.id === userID);
  return user;
};

export const returnAverageSteps = (userData) => {
  const sumTotalSteps = userData.reduce((acc, user) => {
    acc += user.dailyStepGoal;
    return acc;
  }, 0);
  const average = parseInt(sumTotalSteps) / userData.length;
  return average;
};

export const nameFriends = (currentUser, usersArray) => {
  let foundFriends = currentUser.friends.map((friend) => {
    return usersArray.find((user) => user.id === friend).name;
  });
  let formattedArray = foundFriends.map((friend) => ` ` + friend);
  return formattedArray;
};

//Hydro Data Functions:
export const createUserHydroData = (user, hydroData) => {
  const userHydroData = hydroData.filter((datum) => datum.userID === user.id);
  return userHydroData;
};

export const getAllTimeAverageFlOz = (userHydroData) => {
  const flOzSum = userHydroData.reduce((sum, { numOunces }) => {
    sum += numOunces;
    return sum;
  }, 0);
  const flOzAverage = Math.floor(flOzSum / userHydroData.length);
  return flOzAverage;
};

export const getDailyFlOz = (day, hydroData) => {
  const todaysData = hydroData.find((datum) => datum.date === day);
  return todaysData.numOunces;
};

export function findStartingIndex(userHydroData, endDate) {
  for (let i = 0; i < userHydroData.length; i++) {
    if (userHydroData[i].date === endDate) {
      console.log(i);
      return i;
    }
  }
}

export const weeklyHydroData = (userHydroData, endDateIndex) => {
  const weeklyData = [];
  for (let i = endDateIndex - 6; i <= endDateIndex; i++) {
    weeklyData.push(userHydroData[i]);
  }
  return weeklyData;
};

//Sleep Data Functions:
export const getUserSleepData = (user, sleepData) => {
  const userSleep = sleepData.filter((data) => data.userID === user.id);
  return userSleep;
};

export const calculateUserAverageSleep = (sleepData) => {
  const sum = sleepData.reduce((sum, user) => {
    return sum + user.hoursSlept;
  }, 0);
  const averageUserSleep = sum / sleepData.length;
  return Number(averageUserSleep.toFixed(2));
};

export const calculateUserAverageSleepQuality = (sleepData) => {
  const sum = sleepData.reduce((sum, user) => {
    return sum + user.sleepQuality;
  }, 0);
  const averageUserSleepQuality = sum / sleepData.length;
  return Number(averageUserSleepQuality.toFixed(2));
};

export const getUserDailyHrSleep = (day, sleepData) => {
  const dailySleep = sleepData.find((data) => data.date === day);
  return dailySleep.hoursSlept;
};

export const getUserDailyQualitySleep = (day, sleepData) => {
  const dailySleep = sleepData.find((data) => data.date === day);
  return dailySleep.sleepQuality;
};

export const describeSleepQuality = (userSleepQuality) => {
  return userSleepQuality >= 3 ? "good" : "poor"
};

export const changeGoodBadColor = (userSleepQuality) => {
  return userSleepQuality >= 3 ? "green" : "red"
};

export const weeklyHourlySleepData = (userSleep, endDateIndex) => {
  const weeklyHourSleepData = [];
  for (let i = endDateIndex - 6; i <= endDateIndex; i++) {
    weeklyHourSleepData.push(userSleep[i].hoursSlept);
  }
  return weeklyHourSleepData;
};

export const weeklyQualitySleepData = (userSleep, endDateIndex) => {
  const weeklySleepQuality = [];
  for (let i = endDateIndex - 6; i <= endDateIndex; i++) {
    weeklySleepQuality.push(userSleep[i].sleepQuality);
  }
  return weeklySleepQuality;
};

export const weeklySleepData = (userSleep, endDateIndex) => {
  const weeklySleepData = [];
  for (let i = endDateIndex - 6; i <= endDateIndex; i++) {
    weeklySleepData.push(userSleep[i]);
  }
  return weeklySleepData;
};

//Activity Data Functions:
export const createUserStepData = (user, stepData) => {
  const userSteps = stepData.filter((data) => data.userID === user.id);
  return userSteps;
};

export const getDaySteps = (day, userStepData) => {
  const dailySteps = userStepData.find((datum) => datum.date === day);
  return dailySteps.numSteps;
};

export const calculateDayMileage = (userStepData, userData) => {
  const miles = (userStepData * userData.strideLength) / 5280;
  return Number(miles.toFixed(2));
};

export const calculateMinutesActive = (userStepData, day) => {
  const dayActivity = userStepData.find((data) => data.date === day);
  return dayActivity.minutesActive;
};

export const weeklyStepData = (userActivityData, endDateIndex) => {
  const weeklyStepData = [];
  for (let i = endDateIndex - 6; i <= endDateIndex; i++) {
    weeklyStepData.push(userActivityData[i].numSteps);
  }
  return weeklyStepData;
};

export const weeklyActivityData = (userActivityData, endDateIndex) => {
  const weeklyActivityData = [];
  for (let i = endDateIndex - 6; i <= endDateIndex; i++) {
    weeklyActivityData.push(userActivityData[i]);
  }
  return weeklyActivityData;
};

export const formatDate = (weeklyData) => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const justDates = weeklyData.map((datum) => datum.date);
  const daysArray = justDates.map((date) => new Date(date));
  const previous7Days = daysArray.map(
    (previousDay) => weekDays[previousDay.getDay()]
  );
  return previous7Days;
};

export const compareUserStepGoal = (weeklyStepData, userData) => {
  const colorArray = [];
  const colorChecks = ["rgba(247, 113, 2, 1)", "rgba(180, 236, 52, .8)"];
  for (var i = 0; i < weeklyStepData.length; i++) {
    if (weeklyStepData[i] >= userData.dailyStepGoal) {
      colorArray.push(colorChecks[1]);
    } else {
      colorArray.push(colorChecks[0]);
    }
  }
  return colorArray;
};
// 2. Return how many minutes a user was active for a given day

// 3. Return if a user reached their step goal for a given day

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// An example of how you tell webpack to use a JS file

// Example of one way to import functions from the domUpdates file.  You will delete these examples.

// exampleFunction1('Travis');
// exampleFunction2('Travis');
