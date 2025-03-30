let course = {
    name: 'Systems Programming',
    code: 'CS392',
    credits: 3,
    tags: ['Core'],
    semesters: 1,
    prereqs: {
        courses: { op: 'and', a: 'CS382', b: 'CS385' },
        credits: null,
    },
    specialization: null,
};

const Course = ({ c }) => {
    return (
        <div>
            <h2>{c.name}</h2>
            <p></p>
        </div>
    );
};

export default Course;
