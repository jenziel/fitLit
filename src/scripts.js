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
  userInfoButton, 
  displayTodayHydro,
  displayAvgHydro,
  displayDailyHydro,
} from './domUpdates'

// const userHydrationData = hydration.hydrationData
//   .filter((datum) => datum.userID === currentUser.id);

const masterData = {
  users: users.users,
  hydration: hydration.hydrationData,
  currentUser: createRandomUser(users.users),
  today: '2023/07/01',
}
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
  displayTodayHydro(masterData.today, currentUserH2O);
  displayAvgHydro(currentUserH2O);
  displayDailyHydro(99, currentUserH2O);
});

userInfoButton.addEventListener('click', toggleInfo);