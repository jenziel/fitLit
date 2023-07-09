//NOTE: Your DOM manipulation will occur in this file
import  users  from './data/users';

// query selectors 
const userGreeting = document.querySelector('.user-greeting');

// functions

const getRandomIndex = ((array) => {
  return Math.floor(Math.random() * array.length);
})

const updateUserGreeting = () => {
  console.log('our function is working')
  userGreeting.innerText = `Good morning, ${users.users[0].name}!`
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