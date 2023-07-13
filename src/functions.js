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
  return averageUserSleep.toFixed(2);
};

export const calculateUserAverageSleepQuality = (sleepData) => {
  const sum = sleepData.reduce((sum, user) => {
    return sum + user.sleepQuality;
  }, 0)
  const averageUserSleepQuality = sum/sleepData.length;
  return averageUserSleepQuality.toFixed(2);
};


// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// An example of how you tell webpack to use a JS file

// Example of one way to import functions from the domUpdates file.  You will delete these examples.

// exampleFunction1('Travis');
// exampleFunction2('Travis');

