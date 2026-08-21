export class LinkLimitReachedError extends Error {
    constructor() {
        super("Link limit reached.");
        this.name = "LinkLimitReachedError";
    }
}
