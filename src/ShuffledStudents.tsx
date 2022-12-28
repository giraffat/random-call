import {useEffect, useRef, useState} from "react";

interface Student {
    name: string;
    number: number;
}

function* shuffledStudents(students: string[]): Generator<Student> {
    function shuffle<T>(array: T[]) {
        for (let i = array.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [array[i - 1], array[j]] = [array[j], array[i - 1]];
        }
        return array;
    }

    while (true) {
        const shuffledStudents_ = shuffle(
            students.map(
                (value, index): Student => {
                    return {name: value, number: index};
                }
            )
        );

        for (const student of shuffledStudents_) {
            yield student;
        }
    }
}

export function useStudents(students: Array<string>): [Student | undefined, () => void] {
    const shuffledStudents_ = useRef(shuffledStudents(students));
    const [student, setStudent] = useState<Student>();

    return [
        student,
        () => setStudent(shuffledStudents_.current.next().value)
    ];
}

export function useRollingStudents(students: Array<string>, isRolling: boolean) {
    const [student, moveNext] = useStudents(students);
    const lastTimestamp = useRef(0);

    useEffect(() => {
        function update(timestamp: number) {
            if (timestamp - lastTimestamp.current > 32) {
                moveNext();
                lastTimestamp.current = timestamp
            }
            if (isRolling){
                requestAnimationFrame(update)
            }
        }

        if (isRolling){
            requestAnimationFrame(update);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {isRolling = false}
    }, [isRolling, moveNext]);

    return student;
}