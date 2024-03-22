// Day 7, Problem #2
// https://adventofcode.com/2022
// Adam Smith

const pickFile = { example: 'Example', input: 'Input' }

const readFile = file => {
    const fs = require('fs');
    const thisFile = fs.readFileSync(__dirname + '/' + file + '.txt', 'utf-8');
    return thisFile.split('\n');
}

class File {
    #name = '';
    #size = 0;
    constructor(name, size) {
        this.#name = name;
        this.#size = size;
    }
    get name() {
        return this.#name;
    }
    get size() {
        return this.#size;
    }
}

class Directory {
    #name = '';
    #files = [];
    #directories = [];
    constructor(name) {
        this.#name = name;
    }
    addFile(file) {
        this.#files.push(file);
    }
    addDir(dir) {
        this.#directories.push(dir);
    }
    get name() {
        return this.#name;
    }
    get files() {
        return this.#files;
    }
    get directories() {
        return this.#directories;
    }
    cd(cdName) {
        const names = this.#directories.map(dir => dir.name);
        const index = names.indexOf(cdName);
        return this.#directories[index];
    }
    #calcSizeFiles() {
        return this.#files.reduce((acc, curr) => acc + curr.size, 0);
    }
    #calcSizeDirs() {
        return this.#directories.reduce((acc, curr) => acc + curr.size(), 0);
    }
    size() {
        return this.#calcSizeFiles() + this.#calcSizeDirs();
    }
    specialSize(sizeArray = []) {
        const thisSize = this.size();
        if (thisSize <= 100000) sizeArray.push(this.size());
        this.#directories.forEach(dir => dir.specialSize(sizeArray));
        return sizeArray;
    }
    deleteOptions(sizeArray = []) {
        sizeArray.push(this.size());
        this.#directories.forEach(dir => dir.deleteOptions(sizeArray));
        return sizeArray;
    }
}

const parseCommands = fileLines => {
    const root = new Directory('root');
    const path = [root];
    let pwd = root;
    fileLines.forEach(line => {
        const parts = line.split(' ');
        switch (parts[0]) {
            case '$':
                switch (parts[1]) {
                    case 'cd':
                        switch (parts[2]) {
                            case '..':
                                path.pop();
                                pwd = path[path.length - 1];
                                break;
                            case '/':
                                path.splice(1);
                                pwd = path[0];
                                break;
                            default:
                                pwd = pwd.cd(parts[2]);
                                path.push(pwd);
                                break;
                        }
                        break;
                    case 'ls':
                        break;
                }
                break;
            case 'dir':
                pwd.addDir(new Directory(parts[1]));
                break;
            default:
                pwd.addFile(new File(parts[1], Number(parts[0])));
                break;
        }
    });
    return root;
}

const selectDelete = (dir) => {
    const disk = 70000000;
    const target = 30000000;
    const used = dir.size();
    const options = dir.deleteOptions().sort((a, b) => b - a);
    const selected = options.reduce((acc, curr) => disk - used + curr >= target ? curr : acc, 0);
    return selected;
}

const run = () => {
    const fileLines = readFile(pickFile.input);
    const root = parseCommands(fileLines);
    const deletedSize = selectDelete(root);
    return deletedSize;
}

const outcome = run();
console.log(`The outcome is: ${outcome}`);