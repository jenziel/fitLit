// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// imports 
import users  from './data/users';
import hydration from './data/hydration';
import './css/styles.css';
import './images/turing-logo.png';

import { 
  createRandomUser,
  retrieveUserData, 
  returnAverageSteps, 
  nameFriends,
  getAllTimeAverageFlOz,
  getDailyFlOz  
} from './functions';




// const userHydrationData = hydration.hydrationData
//   .filter((datum) => datum.userID === currentUser.id);

const masterData = {
  users: users.users,
  hydration: hydration.hydrationData,
  currentUser: createRandomUser(users.users),
}






// no reason we'll need to have a utils.js file, because it's just a copy
// we can just import the specific functions from scripts into the 
// test file 

// we probably won't need the domUpdates.js file to import to the 
// scripts.js file