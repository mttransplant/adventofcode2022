// Day 4, Problem #2
// https://adventofcode.com/2022
// Adam Smith

const pickFile = {
    example: 'Example',
    input: 'Input'
}

const ingestFile = file => {
    const fs = require('fs');
    const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
    return thisFile.split('\n');
}

class Assignment {
    #range;
    #min;
    #max;
    constructor(range) {
        this.#range = range.split('-');
        this.#min = Number(this.#range[0]);
        this.#max = Number(this.#range[1]);
    }
    get range() {
        return this.#range;
    }
    get min() {
        return this.#min;
    }
    get max() {
        return this.#max;
    }
    isMaxTouching(otherAssignment) {
        return otherAssignment.min <= this.#max && this.#max <= otherAssignment.max;
    }
}

class Pair {
    #pair;
    #assignment1;
    #assignment2;
    constructor(assignments) {
        this.#pair = assignments.split(',');
        this.#assignment1 = new Assignment(this.#pair[0]);
        this.#assignment2 = new Assignment(this.#pair[1]);
    }
    get pair() {
        return this.#pair;
    }
    get assignment1() {
        return this.#assignment1;
    }
    get assignment2() {
        return this.#assignment2;
    }
    isOverlapping() {
        return this.#assignment1.isMaxTouching(this.#assignment2) || this.#assignment2.isMaxTouching(this.#assignment1);
    }
}

const loadPairings = (file) => {
    const pairingsText = ingestFile(file);
    return pairingsText.map(pair => new Pair(pair));
}

const countContained = (containsList) => {
    return containsList.reduce((acc, curr) => curr ? acc + 1 : acc, 0);
}

const pairings = loadPairings(pickFile.input);
const overlapResults = pairings.map(pair => pair.isOverlapping());
const count = countContained(overlapResults);
console.log(count);