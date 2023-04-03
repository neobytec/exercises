import DomainError from "./domain.error";

export default class NotFoundError extends DomainError {
    constructor(message: string) {
        super(message)
    }
}