//NOTE: Your DOM manipulation will occur in this file
import  users  from './data/users';
import { returnAverageSteps } from './scripts'
// import returnAverageSteps from './scripts';
// query selectors 
const userName = document.querySelector('.user-greeting');
const userDailyStepGoal = document.querySelector('.user-daily-step-goal');
const cohortStepGoal = document.querySelector('.average-step');
const userStepComparison = document.querySelector('.avg-user-step-comparison');
const userInfoButton = document.querySelector('.user-info-button')
const altLowerPane = document.querySelector('.alt-lower-pane')
const lowerPane = document.querySelector('.lower-pane')
// universal variables 

// functions

const randomIndex = (Math.floor(Math.random() * users.users.length))

const updateUserDailyStepGoal = () => {
  userDailyStepGoal.innerText = `${users.users[randomIndex].dailyStepGoal}`
};

const calcStepComparison = () => {
  const percent = Math.floor((users.users[randomIndex].dailyStepGoal / returnAverageSteps())*100)
  userStepComparison.innerText = `Your step goal is ${percent}% of the average user's step goal!`
}

const displayCohortStepAverage = () => {
  cohortStepGoal.innerText = `${returnAverageSteps()}`;
};

const updateUserName = () => {
  userName.innerText = `Hello, ${users.users[randomIndex].name}!`
};

const toggleInfo = () => {
    altLowerPane.classList.toggle('hidden')
    lowerPane.classList.toggle('hidden')
    if (lowerPane.classList.contains('hidden')) {
      userInfoButton.innerText = `Back to Main`
    } else {
      userInfoButton.innerText = `User Info`
    }
}


// event handlers 
window.addEventListener('load', () => {
  updateUserDailyStepGoal();
  updateUserName();
  displayCohortStepAverage();
  calcStepComparison()
})
userInfoButton.addEventListener('click', toggleInfo)

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.
const exampleFunction1 = (person) => {
  console.log(`oh hi there ${person}`)
}

const exampleFunction2 = (person) => {
  console.log(`bye now ${person}`)
}


export {
  exampleFunction1,
  exampleFunction2
}