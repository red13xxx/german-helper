import { generateClient } from "aws-amplify/api"
import { useEffect, useState } from "react"
import { type Schema } from "../../amplify/data/resource";
import ExerciseList from "./ExerciseList";

const client = generateClient<Schema>()

const AllExercises: React.FC = () => {

    const [exercises, setExercises] = useState<Schema["Exercise"][]>([])

    useEffect(() => {
        client.models.Exercise.list()
            .then(({data}) => {
                setExercises(data)
            })
    })

    return <ExerciseList exercises={exercises} />
}

export default AllExercises;