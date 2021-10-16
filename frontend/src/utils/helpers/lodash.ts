// Creates a throttled function that only invokes `func` at most once per every `time` milliseconds.
type IFunction = (...args: unknown[]) => void;
export const throttle = (func: IFunction, time = 0): IFunction => {
    let timeout = true;
    return (...args) => {
        if (timeout) {
            timeout = false;
            setTimeout(() => {
                timeout = true;
                func(...args);
            }, time);
        }
    };
};
