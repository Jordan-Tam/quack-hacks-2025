import {users} from '../../config/mongoCollections.js';
import {createUser} from '../mongodb_functions/users.js';
import {ObjectId} from 'mongodb';

const createStudyPlan = async (
    user_email,
    name,
    courses
) => {

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

    if (!courses) {
        throw "createStudyPlan Error: No courses were supplied.";
    }
    if (typeof courses !== "object") {
        throw "createStudyPlan Error: courses must be an array.";
    }
    if (!Array.isArray(courses)) {
        throw "createStudyPlan Error: courses must be an array.";
    }

    let newStudyPlan = {
        _id: new ObjectId(),
        name,
        courses
    };

    let usersCollection = await users();

    let user = await usersCollection.findOne({
        email: user_email
    });

    if (!user) {
        throw "createStudyPlan Error: User not found.";
    }

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
    if (!studyplan_id) {
        throw "removeStudyPlan Error: No studyplan_id was supplied.";
    }
    if (!ObjectId.isValid(studyplan_id)) {
        throw "removeStudyPlan Error: Invalid Object ID.";
    }

    let usersCollection = await users();
    const user = await usersCollection.findOne({"studyplan_id": new ObjectId(studyplan_id)});

    if (!user){
        throw "removestudyPlan Error: Study Plan not found."
    }

    const deletionInfo = await moviesCollection.findOneAndUpdate(
        {_id: movie._id},
        {$pull: {reviews: {'_id': new ObjectId(reviewId)}}},
        {returnDocument: 'after'}
    );
      
    if (!deletionInfo) {
        throw `removeMovie Error: Could not delete movie with id of ${reviewId}.`;
    }

};

const updateStudyPlan = async (
    studyplan_id,
    name,
    courses
) => {

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

    if (!courses) {
        throw "createStudyPlan Error: No courses were supplied.";
    }
    if (typeof courses !== "object") {
        throw "createStudyPlan Error: courses must be an array.";
    }
    if (!Array.isArray(courses)) {
        throw "createStudyPlan Error: courses must be an array.";
    }

    let updatedStudyPlan = {
        _id: new ObjectId(),
        name,
        courses
    };

    let usersCollection = await users();

    let user = await usersCollection.findOne({
        email: user_email
    });

    if (!user) {
        throw "createStudyPlan Error: User not found.";
    }

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