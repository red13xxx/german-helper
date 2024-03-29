import { type Schema } from "../../amplify/data/resource";

type ExerciseListProps = {
    exercises: Schema["Exercise"][]
}

const ExerciseList: React.FC<ExerciseListProps> = ({exercises}) => {

    return (
        <ul>
            {exercises.map(e => <ExerciseRow exercise={e}/>)}
        </ul>
    )
}

type ExerciseRowProps = {
    exercise: Schema["Exercise"]
}

const ExerciseRow: React.FC<ExerciseRowProps> = ({exercise}) => {
    return (
        <li>E: {exercise.description}</li>
    )
}

export default ExerciseList;