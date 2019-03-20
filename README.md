# Rent'n'Share

## A mobile application pedagogical project. It's basically a renting marketplace.

This project is using Phonegap. That allows us to test easily our hybrid application and to build apk from web languages.
As backend solution we use Firebase from google.

### Install the project

```
$ npm install
$ npx webpack
```

### Knowns problems
## Installing packages

There is a weird behavior with npm install sometimes, didn't had the time to fix it.
If you have any problems while installing packages through `npm install`, try this, it should fix the problem.

```
npm install vue vue-loader css-loader vue-template-compiler vue-router node-sass sass-loader postcss-loader expose-loader jquery firebase autodll-webpack-plugin underscore --saveDev
```

### Launch the application

```
$ phonegap serve
```

Use it through your web browser or directly via the application PhoneGap findable on the PlayStore.
 