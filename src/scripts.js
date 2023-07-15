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
  calculateUserAverageSleep,
  getUserSleepData,
  calculateUserAverageSleepQuality,
  getUserDailyHrSleep, 
  getUserDailyQualitySleep, 
  weeklyHourlySleepData,
  weeklyQualitySleepData,
  createUserStepData,
  getDaySteps,
  calculateDayMileage,
  calculateMinutesActive,
  weeklyStepData,
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
  createHydroBarGraph,
  displaySleepDataToDom,
  createHourlySleepBarGraph,
  createQualitySleepBarGraph,
  displayMinutesActive,
  displayUserSteps,
  displayDistanceWalked,
} from './domUpdates'

// const userHydrationData = hydration.hydrationData
//   .filter((datum) => datum.userID === currentUser.id);

const mainData = {
  today: '2023/07/01',
}

const generateWebPage = () => { 
  mainData.currentUser = createRandomUser(mainData.users);
  const currentUserH2O = createUserHydroData(mainData.currentUser, mainData.hydration);
  const currentUserSleep = getUserSleepData(mainData.currentUser, mainData.sleep);
  const currentUserActivity = createUserStepData(mainData.currentUser, mainData.activity);
  
  updateIcon();
  weeklyHydroData(currentUserH2O,99);
  updateUserDailyStepGoal(mainData.currentUser);
  updateUserName(mainData.currentUser);
  displayCohortStepAverage(mainData.users);
  calcStepComparison(mainData.currentUser, mainData.users);
  updateUserInfoPage(mainData.currentUser, mainData.users);
  displayTodayHydro(mainData.today, currentUserH2O);

  displayAvgHydro(currentUserH2O);
  createHourlySleepBarGraph(currentUserSleep, 99);
  createQualitySleepBarGraph(currentUserSleep, 99);

  // displayDailyHydro(99, currentUserH2O);
  // populateHydroGraph(99, currentUserH2O);
  createHydroBarGraph(99, currentUserH2O);
  displaySleepDataToDom(mainData.today, currentUserSleep);
  displayMinutesActive(currentUserActivity, mainData.today);
  displayUserSteps(currentUserActivity, mainData.today);
  displayDistanceWalked(currentUserActivity, mainData.today, mainData.currentUser);
};

// event handlers
window.addEventListener('load', () => {
  Promise.all(promises)
  .then(response => {
    console.log("response:", response)
      const [usersPromise, hydroPromise, sleepPromise, activityPromise] = response
      // add second keys to actually be able to access the value from the key (create key/value pairs)
      mainData.users = usersPromise; 
      mainData.hydration = hydroPromise;
      mainData.sleep = sleepPromise;
      mainData.activity = activityPromise;
    })
  .then(generateWebPage)
});

userInfoButton.addEventListener('click', toggleInfo);