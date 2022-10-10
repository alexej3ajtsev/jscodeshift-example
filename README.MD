# jscodeshift example

In this example there are two codemods which replace objects and arrays which includes invoke function `i18n` to arrow functions

## how it works

The code that will be changed located in `src/index.ts` file

What exactly will be changed is described in the jsdoc functions which located in `codemod/**`

## how check result

`npm run test` - after that command result will be printed in console, to view the changes on real files, to view the changes on real files - you can remove the options `-d` and `-p` in value of test script in `package.json`