const inquirer = require('inquirer');
const fs = require('fs');
const Circle = require( './lib/circle.js');
const Square = require('./lib/square.js');
const Triangle = require('./lib/triangle.js');


//prompts to generate svg
const questions = [ {
    type: 'input',
    message: 'Enter text for logo (Must not be more than 3 characters)',
    name: 'text',
  },
  {
    type: 'input',
    message: 'Enter a text color:',
    name: 'fontColor',
  },

  {
    type: 'list',
    message: 'Choose shape',
    name: 'shape',
    choices: ['Circle','Square','Triangle']
  },
  {
    type: 'input',
    message: 'Enter shape color',
    name: 'shapeColor',
  },

];
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
  err ? console.log(err) : console.log("Generated logo.svg")
  )};

//creates svg by calling the selected shapes render function after passing in parameters frm answers
  function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        if(answers.shape === 'Circle'){
           const logo = new Circle(answers.text, answers.fontColor, answers.shapeColor);
           console.log(logo);
           const logoSVG = logo.render();
           writeToFile('logo.svg',logoSVG);
        }
        else if(answers.shape === 'Triangle') {
            const logo = new Triangle(answers.text, answers.fontColor, answers.shapeColor);
            const logoSVG = logo.render()
            writeToFile('logo.svg', logoSVG)
        }
        else{
            const logo = new Square(answers.text, answers.fontColor, answers.shapeColor);
            const logoSVG = logo.render()
            writeToFile('logo.svg', logoSVG)
        }
    })
    };

    init();
