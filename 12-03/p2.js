// Day 3, Problem #2
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

class Group {
    #rucksacks = [];
    constructor(group) {
        this.#rucksacks.concat(group);
    }
    get rucksacks() {
        return this.#rucksacks;
    }
    addRucksack(rucksack) {
        this.#rucksacks.push(rucksack);
    }
    findGroupBadge() {
        const firstRucksack = this.#rucksacks[0].contents.split('');
        for (let item of firstRucksack) {
            if (this.#rucksacks[1].contents.includes(item) && this.#rucksacks[2].contents.includes(item)) return item;
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

const createGroups = () => {
    const rucksacks = loadRucksacks();
    const groups = [];
    for (let i = 0; i < rucksacks.length; i = i + 3) {
        // const group = [];
        const newGroup = new Group();
        for (j = 0; j < 3; j++) {
            // group.push(rucksacks[i + j]);
            newGroup.addRucksack(rucksacks[i + j]);
        }
        // const newGroup = new Group(group);
        groups.push(newGroup);
    }
    return groups;
}


const groups = createGroups();
const badges = groups.map(group => group.findGroupBadge());
const sumOfPriorities = sumPriorities(badges);
// const errors = rucksacks.map(rucksack => rucksack.findError());
// const sumOfPriorities = sumPriorities(errors);
console.log(sumOfPriorities);