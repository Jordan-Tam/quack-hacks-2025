import {users} from '../../config/mongoCollections.js';
import {getCourseByCode} from '../../data/mongodb_functions/courses.js';
import {ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';

const createUser = async (
    name,
    username,
    email,
    password,
    completed_courses
) => {

    // Error checking "name"
    if (!name) {
        throw "createUser Error: No name was supplied.";
    }
    if (typeof name !== "string") {
        throw "createUser Error: name must be a string.";
    }
    name = name.trim();
    if (name.length === 0) {
        throw "createUser Error: name must not be a string that only contains spaces.";
    }

    // Error checking "username"
    if (!username) {
        throw "createUser Error: No username was supplied.";
    }
    if (typeof username !== "string") {
        throw "createUser Error: username must be a string.";
    }
    username = username.trim();
    if (username.length === 0) {
        throw "createUser Error: username must not be a string that only contains spaces.";
    }

    // Error checking "email"
    if (!email) {
        throw "createUser Error: No email was supplied.";
    }
    if (typeof email !== "string") {
        throw "createUser Error: email must be a string.";
    }
    email = email.trim();
    if (!validator.isEmail(email)) {
        throw "createUser Error: Invalid email.";
    }

    // Error checking "password"
    if (!password) {
        throw "createUser Error: No password was supplied.";
    }
    if (typeof password !== "string") {
        throw "createUser Error: password must be a string.";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw "createUser Error: password must be 8+ characters long, include only uppercase letters, lowercase letters, and numbers, and must include at least 1 of each.";
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Error checking "completed_courses"
    if (!completed_courses) {
        throw "createUser Error: No completed_courses were supplied.";
    }
    if (typeof completed_courses !== "object") {
        throw "createUser Error: completed_courses must be an array.";
    }
    if (!Array.isArray(completed_courses)) {
        throw "createUser Error: completed_courses must be an array.";
    }

    // Calculate credits
    let credits = 0;

    for (let course of completed_courses.flat(Infinity)) {
        credits += (await getCourseByCode(course)).credits;
    }

    // Create the new user object.
    let newUser = {
        name,
        username,
        password: hashedPassword,
        completed_courses,
        credits,
        study_plans: []
    };

    // Insert new user to collection.
    const usersCollection = await users();

    const insertedUser = await usersCollection.insertOne(newUser);

    if (!insertedUser.acknowledged || !insertedUser.insertedId) {
        throw "createUser Error: Could not add user to collection.";
    }

    return insertedUser;

};

const getUserById = async (id) => {

    if(!id) {
        throw "getUserById Error: No id was supplied.";
    }
    if (typeof id !== "string") {
        throw "getUserById Error: id must be a string.";
    }
    id = id.trim();

    if (!ObjectId.isValid(id)) {
        throw "getUserById Error: Invalid Object ID.";
    }

    const usersCollection = await users();

    const user = await usersCollection.findOne({
        _id: id
    });

    if (!user) {
        throw "getUserById Error: No user with that id.";
    }

    return user;

};

const updateUserById = async (id) => {

};

const updateUserByEmail = async (email) => {

};

export {createUser, getUserById}