const { expect } = require('chai');
// const expect = chai.expect;
// import { expect } from 'chai';
import {  retrieveUserData, returnAverageSteps, getAllTimeAverageFlOz, getDailyFlOz, createUserHydroData, weeklyHydroData, findStartingIndex, createUserStepData, getDaySteps, calculateDayMileage} from '../src/functions';

// import { retrieveUserData, returnAverageSteps } from './utils'
import mockUsers from './mockUserData'
import mockAllTimeHydroData from './mockAllTimeHydroData'
import mockActivityData from './mockActivityData'

describe('User Repository', () => {

  it('should run tests', function () {
    expect(true).to.be.true;
  });

  it('should be a function', function() {
    expect(retrieveUserData).to.be.a('function')
  });

  it('should return a user object', function() {

    const user2 = retrieveUserData(2, mockUsers)
    expect(user2.name).to.equal('Tyreek VonRueden')

  });

  it('should the average daily step goal for all users (6780)', function() {
    const avg = returnAverageSteps(mockUsers.users)
    expect(avg).to.equal(8000)
  });

});

describe('Hydration Logic', function() {
  let cohortWaterData;
  let day;
  let day2;
  let user1;
  let user2;
  let user1HydroData;
  let user2HydroData;
  beforeEach(() => {
    cohortWaterData = [
  
      {
        "userID": 1,
        "date": "2023/03/24",
        "numOunces": 28
      },
      {
        "userID": 2,
        "date": "2023/03/24",
        "numOunces": 35
      },
      {
          "userID": 1,
          "date": "2023/03/25",
          "numOunces": 50
        },
        {
          "userID": 2,
          "date": "2023/03/25",
          "numOunces": 92
        }]
    user1 = retrieveUserData(1, mockUsers);
    user2 = retrieveUserData(2, mockUsers);
    user1HydroData = createUserHydroData(user1, cohortWaterData)
    user2HydroData =  createUserHydroData(user2, cohortWaterData)
    day = "2023/03/25"
    day2= "2023/07/01"
  });
  it(`should have a function that retrieves a user's hydration data`, function () {
    expect(createUserHydroData).to.be.a('function');
  });
  it(`should return an array of objects representing the given user's hydration data`, function () {
    expect(createUserHydroData(user2, cohortWaterData)).to.deep.equal([
      { userID: 2, date: '2023/03/24', numOunces: 35 },
      { userID: 2, date: '2023/03/25', numOunces: 92 }
    ]);
  });
  it('should have a function that finds fl oz consumed per day for all time', function () {
    expect(getAllTimeAverageFlOz).to.be.a('function');
  });
  it('it should return the average daily intake for all time', function (){
    expect(getAllTimeAverageFlOz(user1HydroData)).to.deep.equal(39)
  })
  it('should have a function that finds fl oz consumed for a specific day', function () {
    expect(getDailyFlOz).to.be.a('function');
  });
  it('should have a function that finds fl oz consumed for a specific day', function () {
    expect(getDailyFlOz(day, user1HydroData)).to.equal(50);
    expect(getDailyFlOz(day, user2HydroData)).to.equal(92);
  });
});

describe('Weekly Hydro Data Function', function(){
  it('should have a function that finds the index that matches the date provided', function (){
    expect(findStartingIndex).to.be.a('function')
  })
  it('should return an index position that references where a given date is within the array', function(){
    let day2= "2023/07/01"
    expect(findStartingIndex(mockAllTimeHydroData, day2)).to.equal(97)
  })
  it('should have a function that returns an array of data for 1 week', function () {
    expect(weeklyHydroData).to.be.a('function');
  });
  it('should have a function that returns an array of data for 1 week', function () {
    let day2= "2023/07/01"
    let day3 = findStartingIndex(mockAllTimeHydroData, day2)
    // console.log("mockAllTimeHydroData", mockAllTimeHydroData)
    expect(weeklyHydroData(mockAllTimeHydroData, day3)).to.deep.equal([
      { userID: 3, date: '2023/06/25', numOunces: 78 },
      { userID: 3, date: '2023/06/26', numOunces: 56 },
      { userID: 3, date: '2023/06/27', numOunces: 88 },
      { userID: 3, date: '2023/06/28', numOunces: 70 },
      { userID: 3, date: '2023/06/29', numOunces: 87 },
      { userID: 3, date: '2023/06/30', numOunces: 40 },
      { userID: 3, date: '2023/07/01', numOunces: 31 }
    ]);
  });
})

describe('Activity data calculations', function() {
  let cohortActivityData;
  let day;
  let day2;
  let user1;
  let user2;
  let user1StepData;
  let user2StepData;
  let specificDayStepData
  beforeEach(() => {
    cohortActivityData = [
      {
      "userID": 1,
      "date": "2023/03/24",
      "numSteps": 7362,
      "minutesActive": 261,
      "flightsOfStairs": 26
      },
      {
      "userID": 2,
      "date": "2023/03/24",
      "numSteps": 3049,
      "minutesActive": 125,
      "flightsOfStairs": 43
      }]  
    user1 = retrieveUserData(1, mockUsers);
    user2 = retrieveUserData(2, mockUsers);
    user1StepData = createUserStepData(user1, cohortActivityData)
    user2StepData =  createUserStepData(user2, cohortActivityData)
    day = "2023/03/24"
    day2= "2023/07/01"
    specificDayStepData = getDaySteps("2023/03/24", user1StepData)
  });
  it('should have a function to access the user step data', function (){
    expect(createUserStepData).to.be.a('function')
  })
  it(`should return an array of objects representing the given user's step data`, function () {
    expect(createUserStepData(user1, user1StepData)).to.deep.equal(
      [{
        "userID": 1,
        "date": "2023/03/24",
        "numSteps": 7362,
        "minutesActive": 261,
        "flightsOfStairs": 26
        }]
    );
  });
  it('should have a function to access the user step data', function (){
    expect(getDaySteps).to.be.a('function')
  })
  it('should return an object for the day we want', function(){
    expect(getDaySteps(day, user1StepData)).to.equal(7362)
  })
  it('should have a function to access the user step data', function (){
    expect(calculateDayMileage).to.be.a('function')
  })
  it('should return a number representing mileage', function (){
    console.log("user1", user1)
    expect(calculateDayMileage(specificDayStepData, user1)).to.equal(5.58)
  })

})
