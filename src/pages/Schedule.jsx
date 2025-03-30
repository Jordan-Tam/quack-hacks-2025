import { useState } from 'react';
import Select from 'react-select';
import { eligible, unparseExpr } from '../../data/database/select_courses'; // Import your eligibility check

let courseCatalog;

try {
    
    const response = await fetch('http://localhost:3000/course', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    // console.log(data);

    if (!response.ok) console.error(`Error: ${data.message}`);

    courseCatalog = data;

} catch (err) {
    console.error('Network error: ', err); //
}

const specificCoursesRequired = [];

console.log(courseCatalog);

for (let course of courseCatalog) {
    if (course.tags.includes('Core')) {
        specificCoursesRequired.push(course.code);
    }
}

const generalRequirements = {
    Humanities: 1,
    'Tech Electives': 2,
};

function getPreReqsFromCode(code) {
    for (let course of courseCatalog) {
        if (course.code === code) {
            return course.prereqs;
        }
    }
}

// 🔁 Helper to get all course options still available
function getRemainingCourses(allSelected) {
    const remainingSpecific = specificCoursesRequired.filter(
        (code) => !allSelected.includes(code)
    );

    const generalRemaining = { ...generalRequirements };
    for (const code of allSelected) {
        const course = courseCatalog[code];
        if (course && generalRemaining[course.type]) {
            generalRemaining[course.type] -= 1;
            if (generalRemaining[course.type] <= 0) {
                delete generalRemaining[course.type];
            }
        }
    }

    return { remainingSpecific, generalRemaining };
}

const Schedule = () => {
    const [semesterCourses, setSemesterCourses] = useState(
        Array(8)
            .fill()
            .map(() => [])
    );
    const [selectedCourses, setSelectedCourses] = useState(Array(8).fill(null));

    const allSelected = semesterCourses.flat();

    const { remainingSpecific, generalRemaining } =
        getRemainingCourses(allSelected);

    const availableOptions = Object.keys(courseCatalog)
        .filter((code) => !allSelected.includes(code))
        .map((code) => ({
            value: code,
            label: `${courseCatalog[code].code} - ${courseCatalog[code].name}`,
        }));

    const handleAddCourse = (semesterIndex) => {
        const selected = selectedCourses[semesterIndex];
        if (!selected) return;

        setSemesterCourses((prev) => {
            const updated = [...prev];
            if (!updated[semesterIndex].includes(selected)) {
                updated[semesterIndex] = [...updated[semesterIndex], selected];
            }
            return updated;
        });

        setSelectedCourses((prev) => {
            const updated = [...prev];
            updated[semesterIndex] = null;
            return updated;
        });
    };

    const handleDropdownChange = (semesterIndex, value) => {
        setSelectedCourses((prev) => {
            const updated = [...prev];
            updated[semesterIndex] = value?.value || null;
            return updated;
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Course Schedule</h1>

            {/* 🧮 Remaining Requirements */}
            <h2>Remaining Requirements</h2>
            <table
                border="1"
                cellPadding="8"
                style={{ width: '100%', marginBottom: '30px' }}
            >
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Specific Courses</td>
                        <td>{remainingSpecific.join(', ') || '✓'}</td>
                    </tr>
                    {Object.entries(generalRemaining).map(([type, count]) => (
                        <tr key={type}>
                            <td>{type}</td>
                            <td>{count} remaining</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 📅 Semester Tables */}
            {semesterCourses.map((courses, semesterIndex) => {
                const previousCourses = semesterCourses
                    .slice(0, semesterIndex)
                    .flat();
                return (
                    <div key={semesterIndex} style={{ marginBottom: '35px' }}>
                        <h2>Semester {semesterIndex + 1}</h2>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            <Select
                                options={availableOptions}
                                onChange={(value) =>
                                    handleDropdownChange(semesterIndex, value)
                                }
                                value={
                                    selectedCourses[semesterIndex]
                                        ? {
                                              value: selectedCourses[
                                                  semesterIndex
                                              ],
                                              label: `${courseCatalog[selectedCourses[semesterIndex]].code} - ${courseCatalog[selectedCourses[semesterIndex]].name}`,
                                          }
                                        : null
                                }
                                placeholder="Search or select a course..."
                                isClearable
                                styles={{
                                    container: (base) => ({
                                        ...base,
                                        minWidth: '300px',
                                    }),
                                }}
                            />
                            <button
                                onClick={() => handleAddCourse(semesterIndex)}
                            >
                                Add
                            </button>
                        </div>

                        <table
                            border="1"
                            cellPadding="6"
                            style={{ width: '100%' }}
                        >
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Prerequisites</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            style={{ color: '#888' }}
                                        >
                                            No courses selected.
                                        </td>
                                    </tr>
                                )}
                                {courses.map((code) => {
                                    const course = courseCatalog[code];
                                    const isEligible = eligible(
                                        getPreReqsFromCode(course),
                                        previousCourses
                                    );
                                    return (
                                        <tr
                                            key={code}
                                            style={
                                                !isEligible
                                                    ? {
                                                          backgroundColor:
                                                              'rgba(255,0,0,0.2)',
                                                      }
                                                    : {}
                                            }
                                        >
                                            <td>{course.code}</td>
                                            <td>{course.name}</td>
                                            <td>
                                                {(() => {
                                                    const str = unparseExpr(
                                                        course.prereqs.courses
                                                    );
                                                    if (
                                                        typeof str == 'object'
                                                    ) {
                                                        return str.join(', ');
                                                    }
                                                    return str; // assume it's a string
                                                })()}
                                            </td>
                                            <td>{course.type}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default Schedule;
