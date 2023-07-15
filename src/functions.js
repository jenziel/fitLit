// functions 
export const createRandomUser = (usersArray) => {
  const randomIndex = Math.floor(Math.random() * usersArray.length);
  let currentUser = usersArray[randomIndex];
  return currentUser
}

export const retrieveUserData = ((userID, data) => {

  var user = data.users.find(user => user.id === userID);
  return user;
});

export const returnAverageSteps = ((userData) => {

 const sumTotalSteps = userData.reduce((acc, user) => {
    acc += user.dailyStepGoal;
    return acc;
    }, 0);
  const average = parseInt(sumTotalSteps)/userData.length;
  return average;
});

export const nameFriends = ((currentUser, usersArray) => {
  let foundFriends = currentUser.friends.map((friend) => {
    return (usersArray.find(user => user.id === friend)).name;
  })
  let formattedArray = foundFriends.map(friend => ` ` + friend);
  return formattedArray;
})

export const createUserHydroData = (user, hydroData) => {
  const userHydroData = hydroData.filter((datum) => datum.userID === user.id);
  return userHydroData;
}

export const getAllTimeAverageFlOz = (userHydroData) => {
  const flOzSum = userHydroData.reduce((sum, {numOunces}) => {
    sum += numOunces;
    return sum;
  }, 0);
  const flOzAverage = Math.floor(flOzSum/userHydroData.length);
  return flOzAverage;
}


export const getDailyFlOz = (day, hydroData) => {
  const todaysData = hydroData.find(datum => datum.date === day);
  return todaysData.numOunces;
}


export function findStartingIndex(userHydroData, endDate){
  for (let i = 0; i< userHydroData.length; i++){
    if (userHydroData[i].date === endDate){
      console.log(i)
      return i;
    }
  }
}

export const weeklyHydroData = (userHydroData, endDateIndex) => {
  const weeklyData = [];
  for(let i = endDateIndex-6; i <= endDateIndex; i++){
    weeklyData.push(userHydroData[i]);
  }
  return weeklyData;
}

export const getUserSleepData = (user, sleepData) => {
  const userSleep = sleepData.filter(data => data.userID === user.id);
  return userSleep;
};

export const calculateUserAverageSleep = (sleepData) => {
  const sum = sleepData.reduce((sum, user) => {
    return sum + user.hoursSlept;
  }, 0)
  const averageUserSleep = sum/sleepData.length;
  return Number(averageUserSleep.toFixed(2));
};

export const calculateUserAverageSleepQuality = (sleepData) => {
  const sum = sleepData.reduce((sum, user) => {
    return sum + user.sleepQuality;
  }, 0)
  const averageUserSleepQuality = sum/sleepData.length;
  return Number(averageUserSleepQuality.toFixed(2));
};

export const getUserDailyHrSleep = (day, sleepData) => {
  const dailySleep = sleepData.find(data => data.date === day);
  return dailySleep.hoursSlept;
};

export const getUserDailyQualitySleep = (day, sleepData) => {
  const dailySleep = sleepData.find(data => data.date === day);
  return dailySleep.sleepQuality;
};

export const weeklyHourlySleepData = (userSleep, endDateIndex) => {
  const weeklyHourSleepData = [];
  for(let i = endDateIndex-6; i <= endDateIndex; i++){
    weeklyHourSleepData.push(userSleep[i].hoursSlept);
  }
  return weeklyHourSleepData;
}

export const weeklyQualitySleepData = (userSleep, endDateIndex) => {
  const weeklySleepQuality = [];
  for(let i = endDateIndex-6; i <= endDateIndex; i++){
    weeklySleepQuality.push(userSleep[i].sleepQuality);
  }
  return weeklySleepQuality;
}


export const createUserStepData = (user, stepData) => {
  const userSteps = stepData.filter(data => data.userID === user.id);
  // console.log('userSteps', userSteps);
  return userSteps;
};

// 1. Calculate the miles a user has walked based on their number of steps
//  (use their strideLength to help calculate this), based on a specific day
export const getDaySteps = (day, userStepData) => {
  console.log("Day", day, "STEP DATA", userStepData)
  const dailySteps = userStepData.find(datum => datum.date === day)
  return dailySteps.numSteps
  };

export const calculateDayMileage = (userStepData, userData) => {
  console.log("user step data" ,userData)
  const miles = (userStepData * userData.strideLength) / 5280
  console.log(miles)
  return Number(miles.toFixed(2))
}

export const calculateMinutesActive = (userData, day) => {
  const dayActivity = userData.find(data => data.date === day);
  return dayActivity.minutesActive;
  }


//sample step data
//   {"userID": 23,
// "date": "2023/03/25",
// "numSteps": 10949,
// "minutesActive": 25,
// "flightsOfStairs": 43}
//sample user data
// {
//   "id": 1,
// "name": "Trystan Gorczany",
// "address": "9484 Lucas Flat, West Kittymouth WA 67504",
// "email": "Taurean_Pollich31@gmail.com",
// "strideLength": 4,
// "dailyStepGoal": 7000,
// "friends": [
// 5,
// 43,
// 46,
// 11
// ]
// }


// 2. Return how many minutes a user was active for a given day

// 3. Return if a user reached their step goal for a given day


// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// An example of how you tell webpack to use a JS file

// Example of one way to import functions from the domUpdates file.  You will delete these examples.

// exampleFunction1('Travis');
// exampleFunction2('Travis');

