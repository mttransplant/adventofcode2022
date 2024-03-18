// Day 2, Problem #2
// https://adventofcode.com/2022
// Adam Smith

const ingestFile = file => {
	const fs = require('fs');
	const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
	return thisFile.split('\n');
}

const outcome = round => {
    switch (round.charAt(2)) {
        case 'X':
            return 0;
        case 'Y':
            return 3;
        case 'Z':
            return 6;
        default:
            return 0;
    }
}

const myPlay = round => {
    switch (round.charAt(2)) {
        case 'X':
            switch (round.charAt(0)) {
                case 'A':
                    return 3;
                case 'B':
                    return 1;
                case 'C':
                    return 2;
            }
            break;
        case 'Y':
            switch (round.charAt(0)) {
                case 'A':
                    return 1;
                case 'B':
                    return 2;
                case 'C':
                    return 3;
            }
            break;
        case 'Z':
            switch (round.charAt(0)) {
                case 'A':
                    return 2;
                case 'B':
                    return 3;
                case 'C':
                    return 1;
            }
        default:
            return 0;
    }
}

// const rounds = ingestFile('Example');
const rounds = ingestFile('Input');
const myScore = rounds.reduce((acc, round) => outcome(round) + myPlay(round) + acc, 0);
console.log(`My Final Score: ${myScore}`);