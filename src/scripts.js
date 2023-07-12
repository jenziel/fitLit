// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// imports 
import users  from './data/users';
import hydration from './data/hydration';
import './css/styles.css';
import './images/turing-logo.png';
import './domUpdates';

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
  users: users.users,
  hydration: hydration.hydrationData,
  currentUser: createRandomUser(users.users),
}
// console.log("test:")
// let exampleHydroData = createUserHydroData(masterData.users[2], masterData.hydration)
// console.log("exampleHydroData", exampleHydroData)
// console.log(`weeklyHydroData(exampleHydroData, "2023/07/01")` , weeklyHydroData(exampleHydroData, "2023/07/01"))

// event handlers
window.addEventListener('load', () => {
  const currentUserH2O = createUserHydroData(masterData.currentUser, masterData.hydration);
  console.log(currentUserH2O);
  weeklyHydroData(currentUserH2O,99);
  updateUserDailyStepGoal(masterData.currentUser);
  updateUserName(masterData.currentUser);
  displayCohortStepAverage(masterData.users);
  calcStepComparison(masterData.currentUser, masterData.users);
  updateUserInfoPage(masterData.currentUser, masterData.users);
});

userInfoButton.addEventListener('click', toggleInfo);