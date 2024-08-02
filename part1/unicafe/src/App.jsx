import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const StatisticLine = (props) => {
  return(<tr>
    <td>{props.text}</td> <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.all > 0){
  return(<table><tbody>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value={props.all} />
    <StatisticLine text="average" value ={props.score / props.all} />
    <StatisticLine text="positive" value ={(100 / props.all) * props.good + "%"} />
    </tbody>
    </table>
  )}
  return(<div>No feedback given</div>)
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setScore(score + 1)
  }
  const neutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const badClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setScore(score - 1)
  }
  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodClick} text="good" />      
      <Button handleClick={neutralClick} text="neutral" />      
      <Button handleClick={badClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} score={score}/>
    </div>
  )
}

export default App