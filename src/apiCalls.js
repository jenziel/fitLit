// import { globalCurrentUser } from "./scripts"
// import { gatherUserInput } from "./domUpdates";

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




// export const postUserInput = (currentUser, input) => {
//   console.log('cu', currentUser)
//   console.log('input', input)
//   let data = { userID: currentUser.id, 
//                   date: '2023/07/02', 
//                   numOunces: input }
//   fetch(hydroURL, {
//     method: 'POST',
//     body: JSON.stringify(data), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(response => 
//       // console.log('response', response)
//       // console.log('response.json',response.json())
//      response.json()
//     )
//     .then(data => {
//       console.log(data)
//     return data})
    
//   }

export const postUserInput = (currentUser, input) => {
  let data = {
    userID: currentUser.id,
    date: '2023/07/02',
    numOunces: input
  };

  return fetch(hydroURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }) 
  .catch(error => {
    console.log(error);
    throw error;
  });
};




