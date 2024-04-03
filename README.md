# Type Test 

This is a simple typing test inspired by [MonkeyType](https://monkeytype.com) which allows users to:

- Set duration of the typing test to 15s, 30s, or 60s
- Choose a color scheme for the applciation
- See their accuracy and WPM after the test

## Setting Up

After downloading the project, run `npm i` to install all the require modules.

In a terminal, `cd` to the project directory and run `npm run start`. This should start a React application on `localhost:3000`.

In a new terminal instance, run `npm electron` to open it up an electron application.

## Notes

This project is meant to be a desktop app in the future, hence the usage of electron. 

Currently there are a few issues:

- UI bugs
- Disgusting color schemes
- Not a fully independent desktop app 
    - electron right now is just a glorified iframe

Once issues are gone, I will remove the points above accordingly.

Sorry, this was just a for fun project that I didn't want to spend more than a day of time on :)