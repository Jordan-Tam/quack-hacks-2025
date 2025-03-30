import {users} from '../../config/mongoCollections.js';
import {createUser} from '../mongodb_functions/users.js';
import {ObjectId} from 'mongodb';

const createStudyPlan = async (
    user_email, // Primary key of users collection
    name,
    courses
) => {

    // Error checking "user_email"
    if (!user_email) {
        throw "createStudyPlan Error: No user_email was supplied.";
    }
    if (typeof user_email !== "string") {
        throw "createStudyPlan Error: user_email must be a string.";
    }
    user_email = user_email.trim();
    if (!validator.isEmail(user_email)) {
        throw "createUser Error: Invalid email.";
    }

    // Error checking "name"
    if (!name) {
        throw "createStudyPlan Error: No name was supplied.";
    }
    if (typeof name !== "string") {
        throw "createStudyPlan Error: name must be a string.";
    }
    name = name.trim();
    if (name.length === 0) {
        throw "createStudyPlan Error: name must not be a string that only contains spaces.";
    }

    // Error checking "courses"
    if (!courses) {
        throw "createStudyPlan Error: No courses were supplied.";
    }
    if (typeof courses !== "object") {
        throw "createStudyPlan Error: courses must be an array.";
    }
    if (!Array.isArray(courses)) {
        throw "createStudyPlan Error: courses must be an array.";
    }

    // Create the new study plan object.
    let newStudyPlan = {
        _id: new ObjectId(),
        name,
        courses
    };

    // Check if user exists using user_email.
    let usersCollection = await users();

    let user = await usersCollection.findOne({
        email: user_email
    });

    if (!user) {
        throw "createStudyPlan Error: User not found.";
    }

    // Insert the new study plan as a subdocument of the user.
    let insertedStudyPlan = await usersCollection.findOneAndUpdate(
        {email: user_email},
        {$push: {study_plans: newStudyPlan}},
        {returnDocument: 'after'}  
    );

    if (!insertedStudyPlan) {
        throw "createStudyPlan Error: Study plan could not be added.";
    }

    return insertedStudyPlan;

};

const removeStudyPlan = async (
    studyplan_id,
) => {

    // Error checking "studyplan_id"
    if (!studyplan_id) {
        throw "removeStudyPlan Error: No studyplan_id was supplied.";
    }
    if (!ObjectId.isValid(studyplan_id)) {
        throw "removeStudyPlan Error: Invalid Object ID.";
    }

    // Check if the study plan exists using its id.
    let usersCollection = await users();
    const user = await usersCollection.findOne({"study_plans._id": new ObjectId(studyplan_id)});

    if (!user){
        throw "removestudyPlan Error: Study plan not found."
    }

    // Remove the study plan from the user.
    const deletedStudyPlan = await usersCollection.findOneAndUpdate(
        {_id: studyplan_id},
        {$pull: {study_plans: {'_id': new ObjectId(studyplan_id)}}},
        {returnDocument: 'after'}
    );
      
    if (!deletedStudyPlan) {
        throw `removeStudyPlan Error: Could not delete movie with id of ${studyplan_id}.`;
    }

    // Return the deleted study plan.
    return deletedStudyPlan;

};

const updateStudyPlan = async (
    studyplan_id,
    name,
    courses
) => {

    // Error checking "studyplan_id"
    if (!studyplan_id) {
        throw "updateStudyPlan Error: No studyplan_id was supplied.";
    }
    if (!ObjectId.isValid(studyplan_id)) {
        throw "updateStudyPlan Error: Invalid Object ID.";
    }

    // Check if the study plan exists using its id.
    let usersCollection = await users();
    const user = await usersCollection.findOne({"study_plans._id": new ObjectId(studyplan_id)});

    if (!user){
        throw "updateStudyPlan Error: Study plan not found."
    }

    // Error checking "name"
    if (!name) {
        throw "updateStudyPlan Error: No name was supplied.";
    }
    if (typeof name !== "string") {
        throw "updateStudyPlan Error: name must be a string.";
    }
    name = name.trim();
    if (name.length === 0) {
        throw "updateStudyPlan Error: name must not be a string that only contains spaces.";
    }

    // Error checking "courses"
    if (!courses) {
        throw "updateStudyPlan Error: No courses were supplied.";
    }
    if (typeof courses !== "object") {
        throw "updateStudyPlan Error: courses must be an array.";
    }
    if (!Array.isArray(courses)) {
        throw "updateStudyPlan Error: courses must be an array.";
    }

    for (let i = 0; i < user.study_plans.length; i++) {
        if (user.study_plans[i]._id === studyplan_id) {
            user.study_plans[i].name = name;
            user.study_plans[i].courses = courses;
            break;
        }
    }

    let changedStudyPlan = {
        study_plans: user.study_plans
    };

    const updatedStudyPlan = await usersCollection.findOneAndUpdate(
        {_id: studyplan_id},
        {$set: changedStudyPlan},
        {returnDocument: 'after'}
    );

    if (!updatedStudyPlan) {
        throw "createStudyPlan Error: Study plan could not be added.";
    }

    return updatedStudyPlan;


};

export {createStudyPlan, removeStudyPlan, updateStudyPlan}