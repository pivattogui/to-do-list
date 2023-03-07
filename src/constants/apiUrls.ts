const joinSegments = (...segments: string[]) => `${segments.length > 0 ? "/" : ""}${segments.join("/")}`;

const taskSegment = (...segments: string[]) =>
    `/task${joinSegments(...segments)}`;

const apis = {
    user: 'user',
    task: {
        base: taskSegment(),
        id: (id: string) => taskSegment(id),
    },
}

export default apis