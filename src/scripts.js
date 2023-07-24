// imports
import "./css/styles.css";
import "./domUpdates";
import { promises } from "./apiCalls";

import {
  createRandomUser,
  createUserHydroData,
  weeklyHydroData,
  getUserSleepData,
  createUserStepData,
  friendsStepChallenge,
  increasingStepDays,
  displayStepChallenge,
} from "./functions";

import {
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
  createHydroBarGraph,
  displaySleepDataToDom,
  createHourlySleepBarGraph,
  createQualitySleepBarGraph,
  displayMinutesActive,
  displayUserSteps,
  displayDistanceWalked,
  createUserActivityGraph,
  displayStepChallengeToDom,
  displayActivityTrendGraph,
} from "./domUpdates";

// master data object
const mainData = {
  today: "2023/07/01",
};

const generateWebPage = () => {
  updateIcon();

  // user data
  mainData.currentUser = createRandomUser(mainData.users);
  updateUserDailyStepGoal(mainData.currentUser);
  updateUserName(mainData.currentUser);
  displayCohortStepAverage(mainData.users);
  displayStepChallengeToDom(
    displayStepChallenge(
      friendsStepChallenge(
        mainData.currentUser,
        mainData.users,
        mainData.activity
      )
    )
  );

  updateUserInfoPage(mainData.currentUser, mainData.users);

  // hydration data
  const currentUserH2O = createUserHydroData(
    mainData.currentUser,
    mainData.hydration
  );
  weeklyHydroData(currentUserH2O, 99);
  displayTodayHydro(mainData.today, currentUserH2O);
  displayAvgHydro(currentUserH2O);
  createHydroBarGraph(99, currentUserH2O);
  
  // sleep data
  const currentUserSleep = getUserSleepData(
    mainData.currentUser,
    mainData.sleep
  );
  createHourlySleepBarGraph(currentUserSleep, 99);
  createQualitySleepBarGraph(currentUserSleep, 99);
  displaySleepDataToDom(mainData.today, currentUserSleep);

  // activity data
  const currentUserActivity = createUserStepData(
    mainData.currentUser,
    mainData.activity
  );
  displayActivityTrendGraph(
    increasingStepDays(currentUserActivity),
    mainData.today
  );
  calcStepComparison(mainData.currentUser, mainData.users);
  createUserActivityGraph(currentUserActivity, 99, mainData.currentUser);
  displayMinutesActive(currentUserActivity, mainData.today);
  displayUserSteps(currentUserActivity, mainData.today);
  displayDistanceWalked(
    currentUserActivity,
    mainData.today,
    mainData.currentUser
  );
  friendsStepChallenge(mainData.currentUser, mainData.users, mainData.activity);
  increasingStepDays(currentUserActivity);
};

// event handlers
window.addEventListener("load", () => {
  Promise.all(promises)
    .then((response) => {
      const [usersPromise, hydroPromise, sleepPromise, activityPromise] =
        response;
      mainData.users = usersPromise;
      mainData.hydration = hydroPromise;
      mainData.sleep = sleepPromise;
      mainData.activity = activityPromise;
    })
    .then(generateWebPage);
});

userInfoButton.addEventListener("click", toggleInfo);
