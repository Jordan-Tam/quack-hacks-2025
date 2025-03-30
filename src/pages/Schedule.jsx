import { useState } from 'react';
import Select from 'react-select';
import { eligible } from '../../data/database/select_courses'; // Import your eligibility check

// 🎓 Course catalog
const courseCatalog = {
    CS101: { name: 'Intro to Programming', type: 'Core Courses', prereqs: [] },
    CS102: {
        name: 'Data Structures',
        type: 'Core Courses',
        prereqs: ['CS101'],
    },
    CS392: {
        name: 'Systems Programming',
        type: 'Core Courses',
        prereqs: ['CS102'],
    },
    CS450: { name: 'AI', type: 'Tech Electives', prereqs: ['CS392'] },
    CS460: { name: 'Security', type: 'Tech Electives', prereqs: ['CS392'] },
    HIST101: { name: 'US History', type: 'Humanities', prereqs: [] },
    PHIL202: { name: 'Ethics', type: 'Humanities', prereqs: [] },
    MATH201: { name: 'Discrete Math', type: 'Math', prereqs: [] },
    BIO150: { name: 'Biology Basics', type: 'Science', prereqs: [] },
};

// 📘 Specific requirements (must take these exact courses)
const specificCoursesRequired = ['CS101', 'CS102', 'CS392'];

// 📘 General requirements (can fulfill with *any* from a type)
const generalRequirements = {
    Humanities: 1,
    'Tech Electives': 2,
};

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
            label: `${code} - ${courseCatalog[code].name}`,
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
                                              label: `${selectedCourses[semesterIndex]} - ${courseCatalog[selectedCourses[semesterIndex]].name}`,
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
                                        code,
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
                                            <td>{code}</td>
                                            <td>{course.name}</td>
                                            <td>
                                                {course.prereqs.join(', ') ||
                                                    'None'}
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
