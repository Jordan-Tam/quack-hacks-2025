import { useEffect, useState } from 'react';
import Select from 'react-select';
import { eligible, unparseExpr } from '../../data/database/select_courses';

const Schedule = () => {
    const [courseCatalog, setCourseCatalog] = useState([]);
    const [semesterCourses, setSemesterCourses] = useState(
        Array(8)
            .fill()
            .map(() => [])
    );
    const [selectedCourses, setSelectedCourses] = useState(Array(8).fill(null));

    // 📥 Fetch course data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/course');
                const data = await response.json();
                if (!response.ok) {
                    console.error(`Error: ${data.message}`);
                } else {
                    setCourseCatalog(data);
                }
            } catch (err) {
                console.error('Network error:', err);
            }
        };
        fetchData();
    }, []);

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

    const availableOptions = courseCatalog.map((course) => ({
        value: course.code,
        label: `${course.code} - ${course.name}`,
    }));

    return (
        <div style={{ padding: '20px' }}>
            <h1>Course Schedule</h1>

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
                                              label:
                                                  courseCatalog.find(
                                                      (c) =>
                                                          c.code ===
                                                          selectedCourses[
                                                              semesterIndex
                                                          ]
                                                  )?.name ||
                                                  selectedCourses[
                                                      semesterIndex
                                                  ],
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
                                    const course = courseCatalog.find(
                                        (c) => c.code === code
                                    );
                                    const isEligible = eligible(
                                        course?.prereqs,
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
                                            <td>{course?.code}</td>
                                            <td>{course?.name}</td>
                                            <td>
                                                {(() => {
                                                    const expr =
                                                        course?.prereqs
                                                            ?.courses;
                                                    const str = expr
                                                        ? unparseExpr(expr)
                                                        : '';
                                                    return Array.isArray(str)
                                                        ? str.join(', ')
                                                        : str;
                                                })()}
                                            </td>
                                            <td>{course?.type}</td>
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
