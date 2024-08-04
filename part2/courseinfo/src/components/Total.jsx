const Total = ({course}) => {
    console.log(course)
    const sum = course.reduce((s, p) => {
        return s + p.exercises
    }, 0)
    return (
        <b>total of {sum} exercises</b>
    )
  }
export default Total