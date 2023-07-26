// Fetch requests

const userURL = 'http://localhost:3001/api/v1/users';
const hydroURL = 'http://localhost:3001/api/v1/hydration';
const sleepURL = 'http://localhost:3001/api/v1/sleep';
const activityURL = 'http://localhost:3001/api/v1/activity	';

const urlArray = [userURL, hydroURL, sleepURL, activityURL];

  export const createFetchRequest = () => {
    return urlArray.map(url => 
    fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))
    )
  }


// // user data
// const usersPromise = fetch('https://fitlit-api.herokuapp.com/api/v1/users')
//   .then(response => response.json()) 
//   .then(data => data.users)

// // hydration data
// const hydroPromise = fetch('https://fitlit-api.herokuapp.com/api/v1/hydration')
//   .then(response => response.json()) 
//   .then(data => data.hydrationData)

// // sleep data 
// const sleepPromise = fetch('https://fitlit-api.herokuapp.com/api/v1/sleep')
//   .then(response => response.json()) 
//   .then(data => data.sleepData)

// // activity data
// const activityPromise = fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
//   .then(response => response.json()) 
//   .then(data => data.activityData)

// export const promises = [usersPromise, hydroPromise, sleepPromise, activityPromise];