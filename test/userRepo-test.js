const { expect } = require("chai");
// const expect = chai.expect;
// import { expect } from 'chai';
import {
  retrieveUserData,
  returnAverageSteps,
  getAllTimeAverageFlOz,
  getDailyFlOz,
  createUserHydroData,
  weeklyHydroData,
  findStartingIndex,
  getUserSleepData,
  calculateUserAverageSleep,
  calculateUserAverageSleepQuality,
  getUserDailyHrSleep,
  getUserDailyQualitySleep,
  weeklyHourlySleepData,
  weeklyQualitySleepData,
  weeklySleepData,
  createUserStepData,
  getDaySteps,
  calculateDayMileage,
  calculateMinutesActive,
  weeklyStepData,
} from "../src/functions";

// import { retrieveUserData, returnAverageSteps } from './utils'
import mockUsers from "./mockUserData";
import mockAllTimeHydroData from "./mockAllTimeHydroData";

// import mockActivityData from './mockActivityData'

describe("User Repository", () => {
  it("should run tests", function () {
    expect(true).to.be.true;
  });

  it("should be a function", function () {
    expect(retrieveUserData).to.be.a("function");
  });

  it("should return a user object", function () {
    const user2 = retrieveUserData(2, mockUsers);
    expect(user2.name).to.equal("Tyreek VonRueden");
  });

  it("should the average daily step goal for all users (6780)", function () {
    const avg = returnAverageSteps(mockUsers.users);
    expect(avg).to.equal(8000);
  });
});

describe("Hydration Logic", function () {
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
        userID: 1,
        date: "2023/03/24",
        numOunces: 28,
      },
      {
        userID: 2,
        date: "2023/03/24",
        numOunces: 35,
      },
      {
        userID: 1,
        date: "2023/03/25",
        numOunces: 50,
      },
      {
        userID: 2,
        date: "2023/03/25",
        numOunces: 92,
      },
    ];
    user1 = retrieveUserData(1, mockUsers);
    user2 = retrieveUserData(2, mockUsers);
    user1HydroData = createUserHydroData(user1, cohortWaterData);
    user2HydroData = createUserHydroData(user2, cohortWaterData);
    day = "2023/03/25";
    day2 = "2023/07/01";
  });
  it(`should have a function that retrieves a user's hydration data`, function () {
    expect(createUserHydroData).to.be.a("function");
  });
  it(`should return an array of objects representing the given user's hydration data`, function () {
    expect(createUserHydroData(user2, cohortWaterData)).to.deep.equal([
      { userID: 2, date: "2023/03/24", numOunces: 35 },
      { userID: 2, date: "2023/03/25", numOunces: 92 },
    ]);
  });
  it("should have a function that finds fl oz consumed per day for all time", function () {
    expect(getAllTimeAverageFlOz).to.be.a("function");
  });
  it("it should return the average daily intake for all time", function () {
    expect(getAllTimeAverageFlOz(user1HydroData)).to.deep.equal(39);
  });
  it("should have a function that finds fl oz consumed for a specific day", function () {
    expect(getDailyFlOz).to.be.a("function");
  });
  it("should have a function that finds fl oz consumed for a specific day", function () {
    expect(getDailyFlOz(day, user1HydroData)).to.equal(50);
    expect(getDailyFlOz(day, user2HydroData)).to.equal(92);
  });
});

describe("Weekly Hydro Data Function", function () {
  it("should have a function that finds the index that matches the date provided", function () {
    expect(findStartingIndex).to.be.a("function");
  });
  it("should return an index position that references where a given date is within the array", function () {
    let day2 = "2023/07/01";
    expect(findStartingIndex(mockAllTimeHydroData, day2)).to.equal(97);
  });
  it("should have a function that returns an array of data for 1 week", function () {
    expect(weeklyHydroData).to.be.a("function");
  });
  it("should have a function that returns an array of data for 1 week", function () {
    let day2 = "2023/07/01";
    let day3 = findStartingIndex(mockAllTimeHydroData, day2);
    expect(weeklyHydroData(mockAllTimeHydroData, day3)).to.deep.equal([
      { userID: 3, date: "2023/06/25", numOunces: 78 },
      { userID: 3, date: "2023/06/26", numOunces: 56 },
      { userID: 3, date: "2023/06/27", numOunces: 88 },
      { userID: 3, date: "2023/06/28", numOunces: 70 },
      { userID: 3, date: "2023/06/29", numOunces: 87 },
      { userID: 3, date: "2023/06/30", numOunces: 40 },
      { userID: 3, date: "2023/07/01", numOunces: 31 },
    ]);
  });
  it("Should be dynamic to handle an array length < 7", function (){
    expect(weeklyHydroData(mockAllTimeHydroData, 4)).to.deep.equal([
      {userID: 3, date: '2023/03/24', numOunces: 95},
      {userID: 3, date: '2023/03/25', numOunces: 59},
      {userID: 3, date: '2023/03/26', numOunces: 63},
      {userID: 3, date: '2023/03/27', numOunces: 58},
      {userID: 3, date: '2023/03/30', numOunces: 27}
    ]);
  });
});

describe("Sleep Logic: Averages and Daily Values", function () {
  let mockSleepData;
  let day1;
  let day2;
  let user1;
  let user2;
  let user1SleepData;
  let user2SleepData;

  beforeEach(() => {
    mockSleepData = [
      {
        userID: 1,
        date: "2023/03/24",
        hoursSlept: 9.6,
        sleepQuality: 4.3,
      },
      {
        userID: 2,
        date: "2023/03/24",
        hoursSlept: 8.4,
        sleepQuality: 3.5,
      },
      {
        userID: 1,
        date: "2023/07/01",
        hoursSlept: 9.7,
        sleepQuality: 4.7,
      },
      {
        userID: 2,
        date: "2023/07/01",
        hoursSlept: 4.7,
        sleepQuality: 3,
      },
    ];

    user1 = retrieveUserData(1, mockUsers);
    user2 = retrieveUserData(2, mockUsers);
    user1SleepData = getUserSleepData(user1, mockSleepData);
    user2SleepData = getUserSleepData(user2, mockSleepData);
    day1 = "2023/03/24";
    day2 = "2023/07/01";
  }); 

  it(`should be a function`, function () {
    expect(getUserSleepData).to.be.a("function");
  });

  it(`should return an array of objects representing the current user sleep data`, function () {
    expect(getUserSleepData(user1, mockSleepData)).to.deep.equal([
      { userID: 1, date: "2023/03/24", hoursSlept: 9.6, sleepQuality: 4.3 },
      { userID: 1, date: "2023/07/01", hoursSlept: 9.7, sleepQuality: 4.7 },
    ]);
  });

  it(`should return sleep data for a different current user`, function () {
    expect(getUserSleepData(user2, mockSleepData)).to.deep.equal([
      { userID: 2, date: "2023/03/24", hoursSlept: 8.4, sleepQuality: 3.5 },
      { userID: 2, date: "2023/07/01", hoursSlept: 4.7, sleepQuality: 3 },
    ]);
  });

  it(`should be a function`, function () {
    expect(calculateUserAverageSleep).to.be.a("function");
  });

  it("it should return the average hourly sleep data for current user", function () {
    expect(calculateUserAverageSleep(user1SleepData)).to.deep.equal(9.65);
  });

  it("it should return average hourly sleep for a different current user", function () {
    expect(calculateUserAverageSleep(user2SleepData)).to.deep.equal(6.55);
  });

  it(`should be a function`, function () {
    expect(calculateUserAverageSleepQuality).to.be.a("function");
  });

  it("it should return the average quality sleep data for current user", function () {
    expect(calculateUserAverageSleepQuality(user1SleepData)).to.deep.equal(4.5);
  });

  it("it should return average quality sleep for a different current user", function () {
    expect(calculateUserAverageSleepQuality(user2SleepData)).to.deep.equal(
      3.25
    );
  });

  it(`should be a function`, function () {
    expect(getUserDailyHrSleep).to.be.a("function");
  });

  it("it should return the hours slept for current user for a given day", function () {
    expect(getUserDailyHrSleep(day1, user1SleepData)).to.equal(9.6);
  });

  it("it should return the hours slept for a different day", function () {
    expect(getUserDailyHrSleep(day2, user1SleepData)).to.equal(9.7);
  });

  it("it should return the hours slept for a different current user", function () {
    expect(getUserDailyHrSleep(day1, user2SleepData)).to.equal(8.4);
  });

  it(`should be a function`, function () {
    expect(getUserDailyQualitySleep).to.be.a("function");
  });

  it("it should return the sleep quality for current user for a given day", function () {
    expect(getUserDailyQualitySleep(day1, user1SleepData)).to.equal(4.3);
  });

  it("it should return the sleep quality for a different day", function () {
    expect(getUserDailyQualitySleep(day2, user1SleepData)).to.equal(4.7);
  });

  it("it should return the sleep quality for a different current user", function () {
    expect(getUserDailyQualitySleep(day1, user2SleepData)).to.equal(3.5);
  });
});

describe("Sleep Logic: Weekly Values", function () {
  let mockSleepData;

  beforeEach(() => {
    mockSleepData = [
      {
        userID: 1,
        date: "2023/03/23",
        hoursSlept: 9.6,
        sleepQuality: 4.3,
      },
      {
        userID: 1,
        date: "2023/03/24",
        hoursSlept: 8.4,
        sleepQuality: 3.5,
      },
      {
        userID: 1,
        date: "2023/03/25",
        hoursSlept: 9.7,
        sleepQuality: 4.7,
      },
      {
        userID: 1,
        date: "2023/03/26",
        hoursSlept: 4.7,
        sleepQuality: 3,
      },
      {
        userID: 1,
        date: "2023/03/27",
        hoursSlept: 4.2,
        sleepQuality: 1.2,
      },
      {
        userID: 1,
        date: "2023/03/28",
        hoursSlept: 4.1,
        sleepQuality: 3.9,
      },
      {
        userID: 1,
        date: "2023/03/29",
        hoursSlept: 9.2,
        sleepQuality: 1.6,
      },
    ];
  });

  it(`should be a function`, function () {
    expect(weeklyHourlySleepData).to.be.a("function");
  });

  it(`should be a function`, function () {
    expect(weeklyQualitySleepData).to.be.a("function");
  });

  it("should return a weeks worth of hourly sleep data for current user", function () {
    let day = "2023/03/29";
    expect(weeklyHourlySleepData(mockSleepData, 6)).to.deep.equal([
      9.6, 8.4, 9.7, 4.7, 4.2, 4.1, 9.2,
    ]);
  });

  it("should be dynamic to allow for an array length less than 7", function () {
    expect(weeklyHourlySleepData(mockSleepData, 3)).to.deep.equal([
      9.6, 8.4, 9.7, 4.7
    ]);
  });

  it("should return a weeks worth of sleep quality data for current user", function () {
    let day = "2023/03/29";
    expect(weeklyQualitySleepData(mockSleepData, 6)).to.deep.equal([
      4.3, 3.5, 4.7, 3, 1.2, 3.9, 1.6,
    ]);
  });

  it("should be dynamic to allow for an array length less than 7", function () {
    let day = "2023/03/29";
    expect(weeklyQualitySleepData(mockSleepData, 2)).to.deep.equal([
      4.3, 3.5, 4.7
    ]);
  });

  it("should return an array of objects containing a weeks worth of user sleep data", function () {
    expect(weeklySleepData(mockSleepData, 6)).to.deep.equal([
        {
          userID: 1,
          date: "2023/03/23",
          hoursSlept: 9.6,
          sleepQuality: 4.3,
        },
        {
          userID: 1,
          date: "2023/03/24",
          hoursSlept: 8.4,
          sleepQuality: 3.5,
        },
        {
          userID: 1,
          date: "2023/03/25",
          hoursSlept: 9.7,
          sleepQuality: 4.7,
        },
        {
          userID: 1,
          date: "2023/03/26",
          hoursSlept: 4.7,
          sleepQuality: 3,
        },
        {
          userID: 1,
          date: "2023/03/27",
          hoursSlept: 4.2,
          sleepQuality: 1.2,
        },
        {
          userID: 1,
          date: "2023/03/28",
          hoursSlept: 4.1,
          sleepQuality: 3.9,
        },
        {
          userID: 1,
          date: "2023/03/29",
          hoursSlept: 9.2,
          sleepQuality: 1.6,
        }
    ])
  })
 

  it("should be dynamic enough to return a shorter array if there isn't a weeks worth of data", function () {
    expect(weeklySleepData(mockSleepData, 2)).to.deep.equal([
        {
          userID: 1,
          date: "2023/03/23",
          hoursSlept: 9.6,
          sleepQuality: 4.3,
        },
        {
          userID: 1,
          date: "2023/03/24",
          hoursSlept: 8.4,
          sleepQuality: 3.5,
        },
        {
          userID: 1,
          date: "2023/03/25",
          hoursSlept: 9.7,
          sleepQuality: 4.7,
        },
    ])
  })

}); 

describe("Activity data calculations", function () {
  let cohortActivityData;
  let day;
  let day2;
  let user1Data;
  let user2;
  let user1StepData;
  let user2StepData;
  let specificDayStepData;
  beforeEach(() => {
    cohortActivityData = [
      {
        userID: 1,
        date: "2023/03/24",
        numSteps: 7362,
        minutesActive: 261,
        flightsOfStairs: 26,
      },
      {
        userID: 2,
        date: "2023/03/24",
        numSteps: 3049,
        minutesActive: 125,
        flightsOfStairs: 43,
      },
      {
        userID: 1,
        date: "2023/03/25",
        numSteps: 14264,
        minutesActive: 111,
        flightsOfStairs: 1,
      },
      {
        userID: 1,
        date: "2023/03/26",
        numSteps: 8646,
        minutesActive: 32,
        flightsOfStairs: 31,
      },
      {
        userID: 1,
        date: "2023/03/27",
        numSteps: 5405,
        minutesActive: 54,
        flightsOfStairs: 42,
      },
      {
        userID: 1,
        date: "2023/03/28",
        numSteps: 8638,
        minutesActive: 123,
        flightsOfStairs: 26,
      },
      {
        userID: 1,
        date: "2023/03/29",
        numSteps: 9608,
        minutesActive: 53,
        flightsOfStairs: 22,
      },
      {
        userID: 1,
        date: "2023/03/30",
        numSteps: 14960,
        minutesActive: 52,
        flightsOfStairs: 4,
      },
    ];
    user1Data = retrieveUserData(1, mockUsers);
    user2 = retrieveUserData(2, mockUsers);
    user1StepData = createUserStepData(user1Data, cohortActivityData);
    user2StepData = createUserStepData(user2, cohortActivityData);
    day = "2023/03/24";
    day2 = "2023/03/30";
    specificDayStepData = getDaySteps("2023/03/24", user1StepData);
  });
  it("should have a function to access the user step data", function () {
    expect(createUserStepData).to.be.a("function");
  });
  it(`should return an array of objects representing the given user's step data`, function () {
    expect(createUserStepData(user1Data, cohortActivityData)).to.deep.equal([
      {
        userID: 1,
        date: "2023/03/24",
        numSteps: 7362,
        minutesActive: 261,
        flightsOfStairs: 26,
      },
      {
        userID: 1,
        date: "2023/03/25",
        numSteps: 14264,
        minutesActive: 111,
        flightsOfStairs: 1,
      },
      {
        userID: 1,
        date: "2023/03/26",
        numSteps: 8646,
        minutesActive: 32,
        flightsOfStairs: 31,
      },
      {
        userID: 1,
        date: "2023/03/27",
        numSteps: 5405,
        minutesActive: 54,
        flightsOfStairs: 42,
      },
      {
        userID: 1,
        date: "2023/03/28",
        numSteps: 8638,
        minutesActive: 123,
        flightsOfStairs: 26,
      },
      {
        userID: 1,
        date: "2023/03/29",
        numSteps: 9608,
        minutesActive: 53,
        flightsOfStairs: 22,
      },
      {
        userID: 1,
        date: "2023/03/30",
        numSteps: 14960,
        minutesActive: 52,
        flightsOfStairs: 4,
      },
    ]);
  });
  it("should be a function", function () {
    expect(getDaySteps).to.be.a("function");
  });
  it("should return the number of steps for the day we want", function () {
    expect(getDaySteps(day, user1StepData)).to.equal(7362);
  });
  it("should have a function to calculate mileage for a specific day", function () {
    expect(calculateDayMileage).to.be.a("function");
  });
  it("should return a number representing mileage", function () {
    expect(calculateDayMileage(specificDayStepData, user1Data)).to.equal(5.58);
  });
  it("should have a function to calculate the minutes active", function () {
    expect(calculateMinutesActive(user1StepData, day)).to.equal(261);
  });
  it(`should have a function to isolate the most recent week's step data`, function () {
    expect(weeklyStepData).to.be.a("function");
  });
  it(`should return an array of 7 numbers representing number of steps`, function () {
    expect(weeklyStepData(user1StepData, 6)).to.deep.equal([
      7362, 14264, 8646, 5405, 8638, 9608, 14960,
    ]);
  });
  it('should be dynamic enough to handle an array lenght less than 7', function () {
    expect(weeklyStepData(user1StepData, 2)).to.deep.equal([
      7362, 14264, 8646
    ]);
  });
});
