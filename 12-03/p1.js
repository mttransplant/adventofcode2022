// Day 3, Problem #1
// https://adventofcode.com/2022
// Adam Smith

const ingestFile = file => {
    const fs = require('fs');
    const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
    return thisFile.split('\n');
}

class Rucksack {
    #contents = '';
    #firstCompartment = '';
    #secondCompartment = '';
    constructor(list) {
        this.#contents = list;
        const splitpoint = list.length / 2;
        this.#firstCompartment = this.#contents.substring(0, splitpoint);
        this.#secondCompartment = this.#contents.substring(splitpoint);
    }
    get contents() {
        return this.#contents;
    }
    get firstCompartment() {
        return this.#firstCompartment;
    }
    get secondCompartment() {
        return this.#secondCompartment;
    }
    findError() {
        const firstCompArr = this.#firstCompartment.split('');
        for (let item of firstCompArr) {
            if (this.#secondCompartment.includes(item)) return item;
        }
        return;
    }
}

const sumPriorities = errors => {
    const list = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const values = errors.map(item => list.indexOf(item));
    return values.reduce((acc, val) => acc + val, 0);
}

const loadRucksacks = () => {
    const file = 'Input';
    const rucksacksText = ingestFile(file);
    return rucksacksText.map(rucksack => new Rucksack(rucksack));
}

const rucksacks = loadRucksacks();
const errors = rucksacks.map(rucksack => rucksack.findError());
const sumOfPriorities = sumPriorities(errors);
console.log(sumOfPriorities);