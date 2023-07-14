// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// imports 
import './css/styles.css';
import './images/turing-logo.png';
import './images/femaleAvatar.jpg';
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
  userInfoButton,
  updateIcon,
  displayTodayHydro,
  displayAvgHydro,
  displayDailyHydro,
  populateHydroGraph,
  createBarGraph,
} from './domUpdates'

// const userHydrationData = hydration.hydrationData
//   .filter((datum) => datum.userID === currentUser.id);

const masterData = {
  today: '2023/07/01', 
  };

const generateWebPage = () => { 
  masterData.currentUser = createRandomUser(masterData.users);
  const currentUserH2O = createUserHydroData(masterData.currentUser, masterData.hydration);
  updateIcon();
  console.log(currentUserH2O);
  weeklyHydroData(currentUserH2O, 99);
  updateUserDailyStepGoal(masterData.currentUser);
  updateUserName(masterData.currentUser);
  displayCohortStepAverage(masterData.users);
  calcStepComparison(masterData.currentUser, masterData.users);
  updateUserInfoPage(masterData.currentUser, masterData.users);
  displayTodayHydro(masterData.today, currentUserH2O);
  displayAvgHydro(currentUserH2O);
  // displayDailyHydro(99, currentUserH2O);
  // populateHydroGraph(99, currentUserH2O);
  createBarGraph(99, currentUserH2O);
  console.log(masterData.currentUser);
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