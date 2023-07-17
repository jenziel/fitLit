// User Data Functions:


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

export const dateToMonth = (trendData) => {
  let lastObject = trendData[trendData.length-1];
  let mostRecentSteps = lastObject.map(datum => datum.numSteps)
  let mostRecentDates = lastObject.map(datum => datum.date)
  let reformattedMostRecentDates = []
  mostRecentDates.forEach((date) => {
    let splitDate = date.split('/');
    splitDate.shift();
    let joinDate = splitDate.join('/');
    reformattedMostRecentDates.push(joinDate);
  })
  const months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  const monthNames =[];
  reformattedMostRecentDates.forEach(date => {
    const splitDate = date.split('/');
    monthNames.push(months[parseInt(splitDate[0])-1] + ' ' + splitDate[1]);
  });
  return monthNames;
}

export const compareUserStepGoal = (weeklyStepData, userData) => {
  const colorArray = [];
  const colorChecks = ["rgba(247, 113, 2, 1)", "rgba(180, 236, 52, .8)"];
  weeklyStepData.forEach(datum => {
    if(datum >= userData.dailyStepGoal) {
      colorArray.push(colorChecks[1]);
    } else {
      colorArray.push(colorChecks[0]);
    }
  })
  return colorArray;
};

export const getUserData = (userID, usersData) => {
  return (usersData.find(user => user.id === userID));
}

export const friendsStepChallenge = (userData, allUsersData, activityData) => {
  const friends = userData.friends;
  const friendsData = [];
  friends.forEach(friend => {
    friendsData.push(getUserData(friend, allUsersData));
  })
  const friendsSteps = [];
  friendsData.forEach(friend => {
    friendsSteps.push(
      {
        friendName: friend.name,
        friendSteps: totalSteps(weeklyStepData(createUserStepData(friend, activityData),99)),
      })
    });
    
    if((friendsSteps.find(friend => friend.friendName === userData.name)) === undefined){
    friendsSteps.push({
      friendName: userData.name,
      friendSteps: totalSteps(weeklyStepData(createUserStepData(userData,activityData),99)),
    })
  }
  const sortedFriends = friendsSteps.sort((a,b) => b.friendSteps - a.friendSteps);
  return sortedFriends
}

export const displayStepChallenge = (totalSteps) => {
  const sortedWithNames = [];
  totalSteps.forEach(friend => {
    sortedWithNames.push( `${friend.friendName} has ${friend.friendSteps} steps.`)
  })
  return sortedWithNames;
}

export const totalSteps = (stepData) => {
  return stepData.reduce((acc, cv) => {
    acc += cv
    return acc;
  },0)
}

export const increasingStepDays = (stepData) => {
  const increasedDays = [];
  for(var i = 0 ; i < stepData.length-2 ; i++){
    if(stepData[i].numSteps < stepData[i+1].numSteps && stepData[i+1].numSteps < stepData[i+2].numSteps){
      increasedDays.push([{
        date: stepData[i].date, 
        numSteps: stepData[i].numSteps,
      },{
        date: stepData[i+1].date, 
        numSteps: stepData[i+1].numSteps,
      },{
        date: stepData[i+2].date, 
        numSteps: stepData[i+2].numSteps,
      }]);
    }
  }
 return increasedDays;
}
