const fs = require("fs");
const path = require("path");
const _ = require("underscore");
const counter = require("./counter");
const Promise = require('bluebird');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, data) => {
    if (err) {
      console.log("error getting next ID: ", `${err}`);
      callback(err, null);
    } else {
      fs.writeFile(path.join(exports.dataDir, `${data}.txt`), text, err => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: data, text: text });
          console.log("The file has been saved!");
        }
      });
    }
  });
};

exports.readAll = (callback) => { // we never invoke this callback with the success case for the whole function

  fs.readdir(exports.dataDir, (err, fileNames) => {
    if (err) {
      console.log(`error is.. ${err}`);
      callback(err, null); // here we invoke the callback with the error case
    } else {
      console.log(`fileNames === `, fileNames);
      // iterate over fileNames array and invoke fs.readFile with each fileName
      let promises = _.map(fileNames, (name) => {
        return new Promise (function (resolve, reject) {
          fs.readFile(exports.dataDir + '/' + name, (err, fileData) => {
            if (err) {
              reject(err);
            } else {
              resolve({id: name.slice(0,5), text:fileData.toString() });
            }
          });
        });
      });
      Promise.all(promises)
        .then(function(arr){
          console.log('promisees ===>', promises);
          console.log('arr ------> ', arr);
          callback(null, arr);
        });
    }
  });
};

exports.readOne = (id, callback) => {
  //find a new method that reads a specific file with a given id
  //construct the err first method pattern
  //for else, read the contents of that file id
  //then invoke the callback on that content in the file

  fs.readFile(`${exports.dataDir}/${id}.txt`, (err, fileContent) => {
    if (err) {
      // throw err;
      callback(new Error(`No item with id: ${id}`), null);
    } else {
      callback(null, { id: id, text: fileContent.toString() });
    }
  });
};

exports.update = (id, text, callback) => {

  exports.readOne(id, function(err, content) {
    if (err) {
      callback(err, null);
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, err => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: id, text: text.toString() });
        }
      });
    }
  });

};

exports.delete = (id, callback) => {
  fs.unlink(`${exports.dataDir}/${id}.txt`, (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`), null);
    } else {
      console.log('path/file.txt was deleted');
      callback();
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, "data");

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
