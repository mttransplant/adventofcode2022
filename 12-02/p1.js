// Day 2, Problem #1
// https://adventofcode.com/2022
// Adam Smith

const ingestFile = file => {
	const fs = require('fs');
	const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
	return thisFile.split('\n');
}

const outcome = round => {
    switch (round) {
        case 'A Y':
        case 'B Z':
        case 'C X':
            return 6;
        case 'A X':
        case 'B Y':
        case 'C Z':
            return 3;
        default:
            return 0;
    }
}

const myPlay = round => {
    switch (round.charAt(2)) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
        default:
            return 0;
    }
}

// const rounds = ingestFile('Example');
const rounds = ingestFile('Input');

// rounds.forEach(round => {
//     console.log(`${round} results in ${outcome(round)}`);
//     console.log(`My Score: ${myPlay(round) + outcome(round)}`);
// });
const myScore = rounds.reduce((acc, round) => outcome(round) + myPlay(round) + acc, 0);
console.log(`My Final Score: ${myScore}`);