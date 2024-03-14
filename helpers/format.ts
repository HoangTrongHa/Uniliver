export const formatSize = (byteSize: number): string => {
    const mbSize = byteSize / (1024 * 1024);
    return mbSize >= 1
        ? `${mbSize.toFixed(2)} MB`
        : `${(byteSize / 1024).toFixed(2)} KB`;
};
