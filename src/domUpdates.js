//NOTE: Your DOM manipulation will occur in this file
// import users from './data/users';
import { returnAverageSteps, nameFriends, currentUser } from './functions';

// import returnAverageSteps from './scripts';
// query selectors
const userName = document.querySelector('.user-greeting');
const userDailyStepGoal = document.querySelector('.user-daily-step-goal');
const cohortStepGoal = document.querySelector('.average-step');
const userStepComparison = document.querySelector('.avg-user-step-comparison');
export const userInfoButton = document.querySelector('.user-info-button');
const altLowerPane = document.querySelector('.alt-lower-pane');
const lowerPane = document.querySelector('.lower-pane');
const userNameField = document.querySelector('.user-name');
const addressField = document.querySelector('.user-address');
const emailField = document.querySelector('.user-email');
const strideLengthField = document.querySelector('.user-stride-length');
const stepGoalField = document.querySelector('.user-step-goal');
const friendsField = document.querySelector('.user-friends');
const userIcon = document.querySelector(".user-icon");

// universal variables

// functions

// const randomIndex = Math.floor(Math.random() * users.users.length);

// let currentUser = users.users[randomIndex];

export const updateUserDailyStepGoal = (user) => {
  userDailyStepGoal.innerText = `${user.dailyStepGoal}`;
};

export const updateIcon = () => {
  var container = document.getElementById("circle");
  console.log("container", container)
  var iconImage = document.createElement("img");
  iconImage.src = "./images/femaleAvatar.jpg";
  console.log("iconImage:", iconImage)
  container.appendChild(iconImage);
}
export const updateUserInfoPage = (user, data) => {
  userNameField.innerText = user.name
  addressField.innerText = user.address
  emailField.innerText = user.email
  strideLengthField.innerText = user.strideLength
  stepGoalField.innerText = user.dailyStepGoal
  friendsField.innerText = nameFriends(user, data)
 
};

export const calcStepComparison = (user, data) => {
  const percent = Math.floor(
    (user.dailyStepGoal / returnAverageSteps(data)) * 100
  );
  userStepComparison.innerText = `Your step goal is ${percent}% of the average user's step goal!`;
};

export const displayCohortStepAverage = (data) => {
  cohortStepGoal.innerText = `${returnAverageSteps(data)}`;
};

export const updateUserName = (user) => {
  userName.innerText = `Hello, ${user.name}!`;
};

export const toggleInfo = () => {
  altLowerPane.classList.toggle('hidden');
  lowerPane.classList.toggle('hidden');
  if (lowerPane.classList.contains('hidden')) {
    userInfoButton.innerText = `Back to Main`;
  } else {
    userInfoButton.innerText = `User Info`;
  }
};



//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.
// const exampleFunction1 = (person) => {
//   console.log(`oh hi there ${person}`);
// };

// const exampleFunction2 = (person) => {
//   console.log(`bye now ${person}`);
// };

// export { exampleFunction1, exampleFunction2 };
