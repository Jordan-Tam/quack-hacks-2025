import {databaseConnection} from "./mongoConnection.js";

const getCollection = (collection) => {
    let _col = undefined;
  
    return async () => {
      if (!_col) {
        const db = await databaseConnection();
        _col = await db.collection(collection);
      }
      return _col;
    };
};

export const courses = getCollection("courses");
export const users = getCollection("users");