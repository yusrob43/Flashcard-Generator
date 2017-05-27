
var inquirer = require('inquirer');
var flashCards = require('./flashCards.js');
var questions = require('./questions.js').questions;
var closeQuestions = []; 

for (var i = 0; i < questions.length; i++) {
	var q = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
	closeQuestions.push(q);
}

var currentQuestion = 0;
var answerRight = 0;
var answerWrong = 0;

function askQuestion() {
	inquirer.prompt([
		{
			type: 'input',
			message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct!');
			answerRight++;
		} else {
			console.log('Incorrect!');
			answerWrong++;
		}

		console.log(closeQuestions[currentQuestion].full);
		console.log('-------------------------------------\n');

		if (currentQuestion < closeQuestions.length - 1) {
			currentQuestion++;
			askQuestion();
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + answerRight);
			console.log('Incorrect Answers: ' + answerWrong);

			console.log('-------------------------------------\n');

			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to play again?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {

					currentQuestion = 0;
					answerRight = 0;
					answerWrong = 0;

					askQuestion();
				} else {
					console.log('Game Over!');
				}
			})
		}
	})
}

askQuestion();
