import DomainError from "./domain.error";

export default class ValidationError extends DomainError {
    constructor(message: string) {
        super(message)
    }
}