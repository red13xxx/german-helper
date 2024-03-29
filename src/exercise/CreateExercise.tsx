import React from "react";
import { generateClient } from "aws-amplify/api"
import { type Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>()

type Model<T> = Omit<T, "id"|"createdAt"|"updatedAt"> 

type ImportExerciseWordSubject = {
    type: "WORD_SUBJECT",
    detail: Model<Schema["ExerciseWordSubject"]>
}

type ImportExerciseWordVerb = {
    type: "WORD_VERB",
    detail: Model<Schema["ExerciseWordVerb"]>
}

type ImportExercise = {
    description: string
} & (ImportExerciseWordSubject | ImportExerciseWordVerb)

const testExercises: ImportExercise[] = [
    {
        description: "der Regen",
        type: "WORD_SUBJECT",
        detail: {english: "rain",
            german: {
                singular: "der Regen",
            }
        }
    }
];

const CreateExercise: React.FC = () => {

    function getCreateMethod(type: ImportExercise["type"]) {
        switch(type) {
            case "WORD_SUBJECT":
                return client.models.ExerciseWordSubject.create;
            case "WORD_VERB":
                return client.models.ExerciseWordVerb.create;
        }
    }

    function create() {
        testExercises.forEach(e => {
            getCreateMethod(e.type)(e.detail)
                .then(({errors, data}) => errors ? Promise.reject(errors) : data.id)
                .then(id => 
                    client.models.Exercise.create({
                        type: e.type,
                        description: e.description,
                        detailId: id
                    }).then(({errors, data}) => errors ? Promise.reject(errors) : data)
                )
                .then(d => console.log("Created " + d))
                .catch(e => console.error(e))
        })
        
    }

    return (<button onClick={create}>Create</button>)
}

export default CreateExercise;