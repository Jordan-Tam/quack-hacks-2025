import fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import { parseExpr } from '../database/select_courses.js';

const CSV_FILE = 'data/import/course_data.csv';
const OUTPUT_FILE = 'data/import/courses_all.json';

const csv_data = fs.readFileSync(CSV_FILE, { encoding: 'utf8', flag: 'r' });

const records = parse(csv_data, {
    columns: true,
    skip_empty_lines: true,
});

let newRecords = [];

function semToInt(str) {
    switch (str) {
        case 'Fall':
            return 0;
        case 'Spring':
            return 1;
        case 'Both':
            return 2;
    }
}

for (let o of records) {
    newRecords.push({
        name: o['Course Name'],
        code: o['Course Code'],
        credits: parseInt(o['Credits']),
        tags: [o['Tags']],
        semesters: semToInt(o['Fall/Spring']),
        prereqs: {
            courses: parseExpr(o['Prereqs (courses)']),
            credits: parseInt(o['Prereqs (credits)']),
        },
        specialization:
            o['CS Course Focus Area'] == 'NULL'
                ? null
                : o['CS Course Focus Area'],
    });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newRecords), (err) => {
    if (err) console.error(err);
    else {
        console.log('File written!');
    }
});
