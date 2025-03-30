import {students} from '../../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const createStudent = async (

) => {

};

const getStudentById = async (id) => {

    if(!id) {
        throw "getStudentById Error: No id was supplied.";
    }
    if (typeof id !== "string") {
        throw "getStudentById Error: id must be a string.";
    }
    id = id.trim();

    if (!ObjectId.isValid(id)) {
        throw "getStudentById Error: Invalid Object ID.";
    }

    const coursesCollection = await students();

    const student = await coursesCollection.findOne({
        _id: id
    });

    if (!student) {
        throw "getStudentById Error: No student with that id.";
    }

    return student;

};