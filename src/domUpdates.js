//NOTE: Your DOM manipulation will occur in this file
import  users  from './data/users';

// query selectors 
const userGreeting = document.querySelector('.user-greeting');

// universal variables 

// functions


const updateUserGreeting = () => {
  const getRandomIndex = (Math.floor(Math.random() * users.users.length))
  userGreeting.innerText = `Good morning, ${users.users[getRandomIndex].name}!`
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