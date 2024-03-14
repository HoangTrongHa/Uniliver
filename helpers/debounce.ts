export const debouncedFunction = () => {
    // Hàm debounce
    const debounce = (func: any, delay: number) => {
        let timeoutId: string | number | NodeJS.Timeout | undefined;
        return (...args: any) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };
    return {
        debounce
    }
}