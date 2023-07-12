// Your fetch requests will live here!


console.log('I will be a fetch request!')


// user data
const usersPromise = fetch('https://fitlit-api.herokuapp.com/api/v1/users')
  .then(response => response.json()) 
  .then(data => data.users)


const HydroPromise = fetch('https://fitlit-api.herokuapp.com/api/v1/hydration')
  .then(response => response.json()) 
  .then(data => data.hydrationData)


const sleepPromise = fetch('https://fitlit-api.herokuapp.com/api/v1/sleep')
  .then(response => response.json()) 
  .then(data => data.sleepData)


const activityPromise = fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
  .then(response => response.json()) 
  .then(data => data.activityData)

export const promises = [usersPromise, HydroPromise, sleepPromise, activityPromise]