const useReplaceQuery = (params: Object): Object => {
    let query = {};

    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            if (value.length) {
                query[key] = value;
            }
        } else if (value || value === 0) {
            query[key] = value;
        }
    }

    return query;
}

export default useReplaceQuery
