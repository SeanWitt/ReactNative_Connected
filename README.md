# Connected

Connected is a React Native-Rails API project that helps you find people in your city with the same interests as you.

### Project Description

This was our final group project for Dev Bootcamp. We decided to choose a simple app idea, so we could focus on learning React Native and figuring out how to implement it with a Rails API.

Note: This repo only contains the front end application written in React Native. 

Click here for the [Rails Backend Repo](https://github.com/tjoye20/Connected)

Update 9/21/16: The Rails backend application is now deployed online through Heroku.  It is no longer necessary to clone that repo down to your local machine to run the entire application.

### Screenshots

![Connected Screenshots](https://github.com/SeanWitt/ReactNative_Connected/blob/master/Screen%20Shot%202016-09-22%20at%2010.45.08%20AM.png)

### Installation

Since the iOS application is not active through the App Store, you will need XCode and a few other things to run the application through XCode's Simulator.   

Follow the instructions [here](https://facebook.github.io/react-native/docs/getting-started.html) first before moving on.


Once the XCode environment is installed:

##### Clone the repo to your local computer:

    git clone https://github.com/SeanWitt/ReactNative_Connected.git

##### While in the ReactNative_Connected directory run:

    npm install
    react-native run-ios


### How To Use
Note: The users in the app right now are from seed data. Only the zipcodes 78756 and 03051 contain other users.

Once the application loads in Simulator, you will need to login with 

    Email: holly@gmail.com 
    Password: abc123

After that, you'll see a list of interests/categories that you can click on and see the people in the same zip code as you with that same interest. Clicking on their name name takes you to their profile page, and the option to start a chat with them.

This application is still in development.  Some work in progess features are:

- Logout feature does not work.  If stuck, press command-R to restart the app.
- New users cannot add their interests yet.
- Messenger does not update automatically.  Users need to navigate away from the messanger for incomming messages to appear
