const fs = require("fs");
const path = require("path");

const booksFile = path.join(__dirname, "../books.json");

function readBooksFromFile() {
    const data = fs.readFileSync(booksFile, 'utf-8');
    return JSON.parse(data);
}

function writeBooksFromFile(data) {
    fs.writeFileSync(booksFile, JSON.stringify(data, null, 2));
}

module.exports = {
    readBooksFromFile, writeBooksFromFile
}