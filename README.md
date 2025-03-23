
# Build a basic version of PayTM

## How to run the project locally

To run the project on your machine, please follow the steps metioned below:

- Clone the repository on your machine:

  ```bash
  git clone https://github.com/tejasnirala/paytm.git
  ```

- Create a `.env` file in the root level of this project.

  ```bash
  cp .env.example .env
  ```

  This command will create a `.env` file. Update the environment variables value with the actual values.

- Install the dependencies to run the app.

  ```bash
  npm install
  ```

- Now run the project:

  ```bash
  npm run dev
  ```

  This will run your both, frontend and backend concurrently.

The frontend will be accessible at http://localhost:5173 and will take you to the `signin` page if you are running the project for the first time. If you already had run this project previously and the authorization token is present in your localstorage, you will be redirected to `dashboard` page upon authenticated successfully.


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

The Frontend consist of 4 pages. They are shown below along with their routes.

### Routes

#### `/signin`

  ![signin page](frontend/public/signin.png)

#### `/signup`

  ![signup page](frontend/public/signup.png)

#### `/dashboard`

  ![dashboard page](frontend/public/dashboard.png)

#### `/send`

  ![send page](frontend/public/send.png)

