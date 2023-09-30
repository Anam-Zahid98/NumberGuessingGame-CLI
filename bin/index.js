#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let secretNumber = Math.floor(Math.random() * 10) + 1;
let numberOfTries = 0;
async function startGame() {
    console.log(chalk.bgMagenta("Welcome to Number Guessing Game !"));
    console.log(chalk.bgGreen("I'm thinking of a number between 1 and 10....."));
    promptGuess();
}
async function promptGuess() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "guess",
            message: chalk.bgYellow("Enter your guess !"),
            validate: (input) => {
                const parsedInput = parseInt(input, 10);
                if (isNaN(parsedInput) || parsedInput < 1 || parsedInput > 10) {
                    console.log(chalk.bgRed("Please enter a valid number between 1 & 10."));
                }
                return true;
            }
        }
    ]);
    let userGuess = parseInt(answers.guess, 10);
    numberOfTries++;
    if (userGuess === secretNumber) {
        console.log(chalk.bgBlueBright(`Congratulations! You guessed the secret number ${secretNumber} in ${numberOfTries} tries.`));
        await playAgain();
    }
    else if (userGuess < secretNumber) {
        console.log(chalk.bgBlueBright("Try a higher number!"));
    }
    else {
        console.log(chalk.bgBlueBright("Try a lower number!"));
        await promptGuess();
    }
}
async function playAgain() {
    const answers = await inquirer.prompt([
        {
            type: "confirm",
            name: "playAgain",
            message: chalk.bgRedBright("Do you want to play again?")
        }
    ]);
    if (answers.playAgain) {
        secretNumber = Math.floor(Math.random() * 10) + 1;
        numberOfTries = 0;
        await startGame();
    }
    else {
        console.log(chalk.bgGreen("Thanks for playing! Goodbye."));
    }
}
startGame();
