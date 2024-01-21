function time_ago(date: string): string {
    const elapsedMilliseconds: number = new Date().getTime() - new Date(date).getTime();

    const timeTable: [number, string][] = [
        [1000, "millisecond"],
        [60, "second"],
        [60, "minute"],
        [24, "hour"],
        [30, "day"],
        [12, "month"],
    ];

    function helper(i: number, time: number): string {
        if (i > timeTable.length - 1) {
            return time === 1 ? `${time} year ago` : `${time} years ago`;
        }

        const convertedTime = Math.floor(time / timeTable[i][0]);

        if (convertedTime === 0) {
            return i === 0 || i === 1
                ? "just now"
                : time === 1
                  ? `${time} ${timeTable[i][1]} ago`
                  : `${time} ${timeTable[i][1]}s ago`;
        }

        return helper(i + 1, convertedTime);
    }

    return helper(0, elapsedMilliseconds);
}

export default time_ago;
