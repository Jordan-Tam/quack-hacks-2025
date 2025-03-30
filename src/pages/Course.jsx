const Course = () => {
    const { courseCode } = useParams();
    const course = {
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

    if (!course) return <p>Course not found!</p>;

    return (
        <div>
            <h2>{c.name}</h2>
            <p>{c.code}</p>
            <p>{c.credits}</p>
            <p>{c.tags.join(', ')}</p>
        </div>
    );
};

export default Course;
