// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// imports 
import './css/styles.css';
import './images/turing-logo.png';
import './domUpdates';
import { promises } from './apiCalls';

import { 
  createRandomUser,
  retrieveUserData, 
  returnAverageSteps, 
  nameFriends,
  getAllTimeAverageFlOz,
  getDailyFlOz,
  createUserHydroData,
  weeklyHydroData,  
} from './functions';

import{
  updateUserDailyStepGoal,
  updateUserInfoPage,
  calcStepComparison,
  displayCohortStepAverage,
  updateUserName,
  toggleInfo,
  userInfoButton 
} from './domUpdates'

// const userHydrationData = hydration.hydrationData
//   .filter((datum) => datum.userID === currentUser.id);

const masterData = {
  // users: users.users,
  // hydration: hydration.hydrationData,     
  };

const generateWebPage = () => { 
  masterData.currentUser = createRandomUser(masterData.users);
  const currentUserH2O = createUserHydroData(masterData.currentUser, masterData.hydration);
  weeklyHydroData(currentUserH2O,99);
  updateUserDailyStepGoal(masterData.currentUser);
  updateUserName(masterData.currentUser);
  displayCohortStepAverage(masterData.users);
  calcStepComparison(masterData.currentUser, masterData.users);
  updateUserInfoPage(masterData.currentUser, masterData.users);
};


// console.log("test:")
// let exampleHydroData = createUserHydroData(masterData.users[2], masterData.hydration)
// console.log("exampleHydroData", exampleHydroData)
// console.log(`weeklyHydroData(exampleHydroData, "2023/07/01")` , weeklyHydroData(exampleHydroData, "2023/07/01"))

// event handlers
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(response => {
      const [usersPromise, HydroPromise, sleepPromise, activityPromise] = response
      masterData.users = usersPromise; // add second keys to actually be able to acces the value from the key
      masterData.hydration = HydroPromise;
      masterData.sleep = sleepPromise;
      masterData.activity = activityPromise;
    })
  .then(generateWebPage)
});

userInfoButton.addEventListener('click', toggleInfo);