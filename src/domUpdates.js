//NOTE: Your DOM manipulation will occur in this file
import  users  from './data/users';

// query selectors 
const userGreeting = document.querySelector('.user-greeting');
const userDailyStepGoal = document.querySelector('.user-daily-step-goal');

// universal variables 

// functions

const RandomIndex = (Math.floor(Math.random() * users.users.length))

const updateUserDailyStepGoal = () => {
  userDailyStepGoal.innerText = `${users.users[RandomIndex].dailyStepGoal}`
}

const updateUserGreeting = () => {
  updateUserDailyStepGoal()
  userGreeting.innerText = `Good morning, ${users.users[RandomIndex].name}!`
}


// event handlers 
window.addEventListener('load', updateUserGreeting)

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