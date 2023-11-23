# Getting Started with Project

## Requirements
1. Node
Run following command on power shell to install node:
```
winget install -e --id OpenJS.NodeJS
```

## Setup Project
### Install dependencies
1. Open terminal with current directory as client and run:
```
npm install
```
2. Open new terminal with current direactory as server and run
```
npm install
```

### Run project
1. In terminal with current directory as client, run:
```
npm run dev
```
2. In terminal with current directory as server, run:
```
npm run dev
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the react app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.


### `npm run dev`

Lanuches the backend server will listen at.\
[http://localhost:4000/](http://localhost:4000)
_Note_: Open new terminal and run above command
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
