const fs = require("fs");
const path = require("path");
const _ = require("underscore");
const counter = require("./counter");

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, data) => {
    if (err) {
      console.log("error getting next ID: ", `${err}`);
    } else {
      fs.writeFile(path.join(exports.dataDir, `${data}.txt`), text, err => {
        if (err) {
          throw `${err}`;
        } else {
          callback(null, { id: data, text: text });
          console.log("The file has been saved!");
        }
      });
    }
  });
};

exports.readAll = callback => {
  // figure out how to read filenames within /data directory
  // extract just the filename without the '.txt' suffix
  // push each of those strings to an array
  fs.readdir(exports.dataDir, (err, fileNames) => {
    if (err) {
      console.log(`error is.. ${err}`);
    } else {
      console.log(`fileNames === `, fileNames);
      // create a new array to store these objects
      // iterate over fileNames array
      // for each element in fileNames take the first 5 characters and push them to the new array in the form { id: first5, text: first5 }
      var names = _.map(fileNames, (text) => {
        let obj = {id: text.slice(0,5), text: text.slice(0,5)}
        return obj;
      });
      callback(null, names);
    }
  });

  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, "data");

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
