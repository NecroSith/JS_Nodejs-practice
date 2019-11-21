//  Object ids in mongo are represented like
// _id: 5dd6df0cf29da43a98ca6417

// There are 24 characters
// Each 2 of them are 1 byte
// Thus, there are 12 bytes in total

// first 4 bytes (8 characters): timestamp
// 3 bytes (6 characters): machine identifier
// 2 bytes (4 characters): process identifier
// 3 bytes (6 characters): counter - if previous three are the same

// We can create id explicitly by using

const mongoose = require('mongoose');

const id = mongoose.Types.ObjectId();
console.log(id); // we get 5dd6e7d0f1b55d22ec311e92, though each run it's unique

// We can extract timestamp from the id by writing this command
console.log(id.getTimestamp()); // We get 2019-11-21T19:38:56.000Z

// We can check if existing id is valid by using built-in method
const isValid = mongoose.Types.ObjectId.isValid('666');
console.log(isValid); // we get false, expectedly