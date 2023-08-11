const userURL = 'https://fitlit-api-green.vercel.app/api/v1/users';
const hydroURL = 'https://fitlit-api-green.vercel.app/api/v1/hydration';
const sleepURL = 'https://fitlit-api-green.vercel.app/api/v1/sleep';
const activityURL = 'https://fitlit-api-green.vercel.app/api/v1/activity';

const urlArray = [userURL, hydroURL, sleepURL, activityURL];

// GET requests
export const createFetchRequest = () => {
  return urlArray.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error))
  );
};

// POST request
export const postUserInput = (currentUser, input) => {
  let data = {
    userID: currentUser.id,
    date: '2023/07/02',
    numOunces: input,
  };

  return fetch(hydroURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error);
    throw error;
  });
};
