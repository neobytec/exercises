export default class ExerciseInputDTO {
    user_id: string
    content: string

    constructor(user_id: string, content: string) {
        this.user_id = user_id
        this.content = content
    }
}