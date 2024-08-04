import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({courses}) => {
    console.log("courses", courses)
    return (
        <div>
          {courses.map(course => (
            <div key={course.id}>
              <Header name={course.name} />
              {course.parts.map(part => (
                <div key={part.id}>
                  <Content part={part.name} exercises={part.exercises} />
                </div>
              ))}
              <Total course={course.parts} />
            </div>
          ))}
        </div>
      );
    };

export default Course
