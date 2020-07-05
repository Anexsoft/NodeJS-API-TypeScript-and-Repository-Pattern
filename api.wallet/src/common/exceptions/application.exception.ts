export class ApplicationException extends Error {
    constructor(message: string = 'An unexpected error ocurred.') {
        super(message);
    }
}