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

const mainData = {
  today: '2023/07/01',
}

const generateWebPage = () => { 
  mainData.currentUser = createRandomUser(mainData.users);
  const currentUserH2O = createUserHydroData(mainData.currentUser, mainData.hydration);
  const currentUserSleep = getUserSleepData(mainData.currentUser, mainData.sleep);


  updateIcon();
  weeklyHydroData(currentUserH2O,99);
  updateUserDailyStepGoal(mainData.currentUser);
  updateUserName(mainData.currentUser);
  displayCohortStepAverage(mainData.users);
  calcStepComparison(mainData.currentUser, mainData.users);
  updateUserInfoPage(mainData.currentUser, mainData.users);
  displayTodayHydro(mainData.today, currentUserH2O);

  displayAvgHydro(currentUserH2O);

  // displayDailyHydro(99, currentUserH2O);
  // populateHydroGraph(99, currentUserH2O);
  createBarGraph(99, currentUserH2O);
  console.log(masterData.currentUser);




  console.log('still here', calculateUserAverageSleep(currentUserSleep));
  console.log('avg sleep quality', calculateUserAverageSleepQuality(currentUserSleep));
  console.log('daily hours slept', getUserDailyHrSleep('2023/07/01', currentUserSleep));
  console.log('daily sleep quality', getUserDailyQualitySleep('2023/07/01', currentUserSleep));
  console.log(mainData.currentUser);
  console.log('hourly sleep for a week', weeklyHourlySleepData(currentUserSleep, 99));
  console.log('weekly sleep quality', weeklyQualitySleepData(currentUserSleep, 99));
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