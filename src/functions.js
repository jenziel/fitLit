// import users  from './data/users';
// import hydration from './data/hydration';



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

export const returnAverageSteps = ((data) => {

 const sumTotalSteps = data.reduce((acc, user) => {
    acc += user.dailyStepGoal;
    return acc;
    }, 0);
  const average = parseInt(sumTotalSteps)/data.length;
  return average;
});

export const nameFriends = ((currentUser, usersArray) => {
  let foundFriends = currentUser.friends.map((friend) => {
    return (usersArray.find(user => user.id === friend)).name;
  })
  let formattedArray = foundFriends.map(friend => ` ` + friend);
  return formattedArray;
})

export const getAllTimeAverageFlOz = (currentUser, hydroData) => {
  const flOzSum = hydroData.reduce((sum, {numOunces}) => {
    sum += numOunces;
    return sum;
  }, 0);
  const flOzAverage = Math.floor(flOzSum/hydroData.length);
  return flOzAverage;
}


export const getDailyFlOz = (day, hydroData) => {
  const todaysData = hydroData.find(datum => datum.date === day);
  return todaysData.numOunces;
}






// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// An example of how you tell webpack to use a JS file

// Example of one way to import functions from the domUpdates file.  You will delete these examples.

// exampleFunction1('Travis');
// exampleFunction2('Travis');

