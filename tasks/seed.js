import {databaseConnection, closeConnection} from '../config/mongoConnection.js';
import {createCourse, getCourseById, getCourseByCode} from '../data/mongodb_functions/courses.js';
import {createUser, getUserById} from '../data/mongodb_functions/users.js';
import data from '../data/import/courses_all.json' with {type: "json"};

const database = await databaseConnection();
await database.dropDatabase();

// console.log(data);

// Add all courses in JSON file.
for (let course of data) {
    try {
        await createCourse(
            course.name,
            course.code,
            course.credits,
            course.tags,
            course.semesters,
            course.prereqs,
            course.specialization
        );
    } catch (e) {
        console.log(e);
    }
}

// Seed users collection with students.
try {
    await createUser(
        "Sliminy Jardet",
        "sjard",
        "ImBeginningToFeelLikeARunGodDoneGod1",
        [
            ["CS559", "CS583"],
            ["MA232"]
        ]
    );
} catch (e) {
    console.log(e);
}

try {
    await createUser(
        "Alexander Hamilton",
        "ahamilton",
        "ImNotThrowingAwayMyShot1",
        [
            ["CS101", "CS115", "HASS103"],
            ["HASS105", "CS135", "CS284"],
            ["CS382", "CS385", "CS347"],
            ["CS392", "CS396", "CS492", "CS496"]
        ]
    );
} catch (e) {
    console.log(e);
}

try {
    await createUser(
        "Real Slim Jardy",
        "sjardy",
        "IstandUp420",
        [
            ["CS392", "CS115", "CS492"],
            ["CS496", "CS385", "CS347"],
        ]
    );
} catch (e) {
    console.log(e);
}

await closeConnection();

console.log("Seeding complete.");