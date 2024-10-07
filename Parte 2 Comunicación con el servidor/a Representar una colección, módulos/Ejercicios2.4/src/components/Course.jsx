import Content from "./Content"
import Header from "./Header"

const Course = ({ courses }) => {
    return (
        <div>
            <ul>
                {courses.map((course, i) => 
                    <li key={i}>
                        <Header course={course} />
                        <Content parts={course.parts} />
                    </li>
            )}
            </ul>
            
        </div>
        
    )
  }
  export default Course
