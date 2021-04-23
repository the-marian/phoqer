export const errorWrapper = func => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (err) {
        res.status(err.code || 500).send({
            massage: err.message || 'Internal error',
        });
    }
};

export class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
