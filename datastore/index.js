const fs = require("fs");
const path = require("path");
const _ = require("underscore");
const counter = require("./counter");

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId();
  // // Todo.create(text, (err) => {

  // // })
  // fs.writeFile(path.join(exports.dataDir, id), text, (err) => {
  //   if (err){ throw `${err}`;
  // }else{
  //   callback(null, { id, text });
  //   console.log('The file has been saved!');
  // }
  // });

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
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = callback => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
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
