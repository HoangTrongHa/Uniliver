const formatTimeDiff = (startTime: string) => {
    const start = new Date(startTime);
    const end = new Date();
    // const moscowTime = end.toLocaleString("en-US", { timeZone: "Europe/Moscow" });
    // const moscowDate = new Date(moscowTime);
    // const moscowTimestamp = moscowDate.getTime();
    const diffMilliseconds = end.getTime() - start.getTime();

    if (diffMilliseconds < 60 * 1000) {
        const diffSeconds = Math.floor(diffMilliseconds / 1000);
        return `${diffSeconds} второй`;
    } else if (diffMilliseconds < 60 * 60 * 1000) {
        const diffMinutes = Math.floor(diffMilliseconds / (60 * 1000));
        return `${diffMinutes} минута`;
    } else if (diffMilliseconds < 24 * 60 * 60 * 1000) {
        const diffHours = Math.floor(diffMilliseconds / (60 * 60 * 1000));
        return `${diffHours} час`;
    } else {
        const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));
        return `${diffDays} день`;
    }
};

export default formatTimeDiff;