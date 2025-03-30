import {courses} from '../../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const createCourse = async (
    name,
    code,
    credits,
    tags,
    semesters,
    prereqs,
    specialization
) => {

    // Error checking "name"
    if (!name) {
        throw "createCourse Error: No name was supplied.";
    }
    if (typeof name !== "string") {
        throw "createCourse Error: name must be a string.";
    }
    name = name.trim();

    // Error checking "code"
    if (!code) {
        throw "createCourse Error: No code was supplied.";
    }
    if (typeof code !== "string") {
        throw "createCourse Error: code must be a string.";
    }
    code = code.trim();


    // Error checking "credits"
    if (!credits) {
        throw "createCourse Error: No credits were supplied.";
    }
    if (typeof credits !== "number") {
        throw "createCourse Error: credits must be a number.";
    }
    if (credits < 1 || credits > 4) {
        throw "createCourse Error: credits must be a number between 1 and 4.";
    }

    // Error checking "tags"
    if (!tags) {
        throw "createCourse Error: No tags were supplied.";
    }
    if (typeof tags !== "object") {
        throw "createCourse Error: tags must be an array.";
    }
    if (!Array.isArray(tags)) {
        throw "createCourse Error: tags must be an array.";
    }
    if (tags.length === 0) {
        throw "createCourse Error: tags must not be empty.";
    }
    for (let t of tags) {
        if (!["Core", "TechE", "Extra", "MathsciE", "Science1", "Science2", "ScienceL", "HumanitiesE"].includes(t)) {
            throw "createCourse Error: Each element in tags must take on one of the following values: [Core, TechE, Extra, MathsciE, Science1, Science2, ScienceL, HumanitiesE]";
        }
    }

    // Error checking "semesters"
    if (semesters === undefined || semesters === null) {
        throw "createCourse Error: No semester was supplied.";
    }
    if (typeof semesters !== "number") {
        throw "createCourse Error: Semester must be a number.";
    }
    if (![0,1,2].includes(semesters)) {
        throw "createCourse Error: Semester must be 0, 1, or 2.";
    }

    // Error checking "prereqs"
    if (!prereqs) {
        throw "createCourse Error: No prerequisites were supplied.";
    }
    if (typeof prereqs !== "object") {
        throw "createCourse Error: prerequisites must be an object.";
    }
    if (Array.isArray(prereqs)) {
        throw "createCourse Error: prerequisites must be an object.";
    }

    // Error checking "specialization"
    if (specialization !== null) {
        if (specialization === undefined) {
            throw "createCourse Error: No specialization was supplied.";
        }
        if (typeof specialization !== "string") {
            throw "createCourse Error: specialization must be a string.";
        }
        specialization = specialization.trim();
    }

    // Create the new course object
    let newCourse = {
        name,
        code,
        credits,
        tags,
        semesters,
        prereqs,
        specialization
    };

    const coursesCollection = await courses();

    const insertedCourse = await coursesCollection.insertOne(newCourse);

    if (!insertedCourse.acknowledged || !insertedCourse.insertedId) {
        throw "createMovie Error: Could not add course to collection.";
    }

    return insertedCourse;

};

const getCourseById = async (id) => {

    if(!id) {
        throw "getCourseById Error: No id was supplied.";
    }
    if (typeof id !== "string") {
        throw "getCourseById Error: id must be a string.";
    }
    id = id.trim();

    if (!ObjectId.isValid(id)) {
        throw "getCourseById Error: Invalid Object ID.";
    }

    const coursesCollection = await courses();

    const course = await coursesCollection.findOne({
        _id: id
    });

    if (!course) {
        throw "getCourseById Error: No course with that id.";
    }

    return course;

};

export {createCourse, getCourseById}