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
  getDailyFlOz  
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

// event handlers
window.addEventListener('load', () => {
  updateUserDailyStepGoal(masterData.currentUser);
  updateUserName(masterData.currentUser);
  displayCohortStepAverage(masterData.users);
  calcStepComparison(masterData.currentUser, masterData.users);
  updateUserInfoPage(masterData.currentUser, masterData.users);
});

userInfoButton.addEventListener('click', toggleInfo);