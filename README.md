
# Build a basic version of PayTM

## BackEnd

### User API Endpoints:

- Endpoint: `http://localhost:3000/api/v1/user/signup`
  
  Usecase: User Signups
  
  Req-Body: 
    ```json
    {
      "username": "user1@gmail.com",
      "password": "user1pass",
      "firstName": "Tejas",
      "lastName": "Nirala"
    }
    ```

- Endpoint: `http://localhost:3000/api/v1/user/signin`
  
  Usecase: User Log in
  
  Req-Body:
  ```json
  {
    "username": "user1@gmail.com",
    "password": "user1pass"
  }
  ```

- Endpoint: `http://localhost:3000/api/v1/user/`
  
  Usecase: User Updates the user data
  
  Req-Body:
  ```json
  {
    "password": "user1pass",
    "firstName": "Tejas",
    "lastName": "Nirala"
  }
  ```
  
  Req-Headers:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2RlNjg5MWUzOWE0NjU0ZTM2MzE1MTEiLCJpYXQiOjE3NDI2MjkzNTR9.wPeCUPHJaBCqxlD6ZRd1N2YgVc2rwmterjfnBpYnecA"
  }
  ```

- Endpoint: `http://localhost:3000/api/v1/user/bulk`
  
  Usecase: Fetches users, filterable via firstName/lastName. If no filter Provided, it will fetch all users.
  
  Req-Query:
  ```js
  // To get all users where either firstname or lastname is 'Tejas'
  ${API_ENDPOINT}/?filter=Tejas

  // or

  // To get all users
  ${API_ENDPOINT}
  ```

- Endpoint: `http://localhost:3000/api/v1/user/me`
  
  Usecase: Fetches currently logged in user data, except password field.
  
  Req-Headers:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2RlNjg5MWUzOWE0NjU0ZTM2MzE1MTEiLCJpYXQiOjE3NDI2MjkzNTR9.wPeCUPHJaBCqxlD6ZRd1N2YgVc2rwmterjfnBpYnecA"
  }
  ```


### Account API Endpoints:

- Endpoint: `http://localhost:3000/api/v1/account/balance`
  
  Usecase: Shows the current balance of the user

  Req-Headers:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2RlNjg5MWUzOWE0NjU0ZTM2MzE1MTEiLCJpYXQiOjE3NDI2MjkzNTR9.wPeCUPHJaBCqxlD6ZRd1N2YgVc2rwmterjfnBpYnecA"
  }
  ```

- Endpoint: `http://localhost:3000/api/v1/account/transfer`
  
  Usecase: Transfers the amount from loggedin user to other user

  Req-Headers:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2RlNjg5MWUzOWE0NjU0ZTM2MzE1MTEiLCJpYXQiOjE3NDI2MjkzNTR9.wPeCUPHJaBCqxlD6ZRd1N2YgVc2rwmterjfnBpYnecA"
  }
  ```

  Req-Body:
  ```json
  {
    "amount": 200,
    "to": "67d151bdb52a74014bbc6f75"
  }
  ```



## FrontEnd

