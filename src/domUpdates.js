//NOTE: Your DOM manipulation will occur in this file
// import users from './data/users';
import { returnAverageSteps, nameFriends, currentUser } from './scripts';

// import returnAverageSteps from './scripts';
// query selectors
const userName = document.querySelector('.user-greeting');
const userDailyStepGoal = document.querySelector('.user-daily-step-goal');
const cohortStepGoal = document.querySelector('.average-step');
const userStepComparison = document.querySelector('.avg-user-step-comparison');
const userInfoButton = document.querySelector('.user-info-button');
const altLowerPane = document.querySelector('.alt-lower-pane');
const lowerPane = document.querySelector('.lower-pane');
const userNameField = document.querySelector('.user-name');
const addressField = document.querySelector('.user-address');
const emailField = document.querySelector('.user-email');
const strideLengthField = document.querySelector('.user-stride-length');
const stepGoalField = document.querySelector('.user-step-goal');
const friendsField = document.querySelector('.user-friends');
// universal variables

// functions

// const randomIndex = Math.floor(Math.random() * users.users.length);

// let currentUser = users.users[randomIndex];

const updateUserDailyStepGoal = () => {
  userDailyStepGoal.innerText = `${currentUser.dailyStepGoal}`;
};

const updateUserInfoPage = () => {
  userNameField.innerText = currentUser.name
  addressField.innerText = currentUser.address
  emailField.innerText = currentUser.email
  strideLengthField.innerText = currentUser.strideLength
  stepGoalField.innerText = currentUser.dailyStepGoal
  friendsField.innerText = nameFriends(currentUser)
 
};

const calcStepComparison = () => {
  const percent = Math.floor(
    (currentUser.dailyStepGoal / returnAverageSteps()) * 100
  );
  userStepComparison.innerText = `Your step goal is ${percent}% of the average user's step goal!`;
};

const displayCohortStepAverage = () => {
  cohortStepGoal.innerText = `${returnAverageSteps()}`;
};

const updateUserName = () => {
  userName.innerText = `Hello, ${currentUser.name}!`;
};

const toggleInfo = () => {
  altLowerPane.classList.toggle('hidden');
  lowerPane.classList.toggle('hidden');
  if (lowerPane.classList.contains('hidden')) {
    userInfoButton.innerText = `Back to Main`;
  } else {
    userInfoButton.innerText = `User Info`;
  }
};

// event handlers
window.addEventListener('load', () => {
  updateUserDailyStepGoal();
  updateUserName();
  displayCohortStepAverage();
  calcStepComparison();
  updateUserInfoPage();
});
userInfoButton.addEventListener('click', toggleInfo);

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.
const exampleFunction1 = (person) => {
  console.log(`oh hi there ${person}`);
};

const exampleFunction2 = (person) => {
  console.log(`bye now ${person}`);
};

export { exampleFunction1, exampleFunction2 };
