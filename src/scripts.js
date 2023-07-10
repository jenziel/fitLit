// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// imports 
import  users  from './data/users';
import './css/styles.css';
import './images/turing-logo.png';
import { exampleFunction1, exampleFunction2  } from './domUpdates';


const retrieveUserData = ((userID) => {

  var user = users.users.find(user => user.id === userID) ;
  return user;

});

// const returnAverageSteps = (() => {

//  const sumTotalSteps = users.users.reduce((acc, user) => {
//     acc += user.dailyStepGoal;
//     return acc;
//     }, 0);
//   const average = parseInt(sumTotalSteps)/users.users.length;
//   return average;

// });

// // event handlers 
// window.addEventListener('load', updateUserGreeting)

// An example of how you tell webpack to use a CSS file





// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// An example of how you tell webpack to use a JS file

// Example of one way to import functions from the domUpdates file.  You will delete these examples.

exampleFunction1('Travis');
exampleFunction2('Travis');

export {
  retrieveUserData, 
  // returnAverageSteps
}