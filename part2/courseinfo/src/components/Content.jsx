import Part from "./Part"
const Content = (props) => {
    return (
      <div>
          <Part part={props.part} exercises={props.exercises} />
      </div>
    )
  }

  export default Content