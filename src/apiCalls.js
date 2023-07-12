// Your fetch requests will live here!


console.log('I will be a fetch request!')


// user data
fetch('https://fitlit-api.herokuapp.com/api/v1/users')
  .then(response => response.json()) 
  .then(data => {

    console.log('the data is here -> ', data)
  });
