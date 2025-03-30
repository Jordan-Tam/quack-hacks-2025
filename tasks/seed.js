import {databaseConnection, closeConnection} from '../config/mongoConnection.js';
import {createCourse, getCourseById} from '../data/mongodb_functions/courses.js';
import data from '../data/import/courses_all.json' with {type: "json"};

const database = await databaseConnection();
await database.dropDatabase();

// console.log(data);

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

await closeConnection();

console.log("Seeding complete.");