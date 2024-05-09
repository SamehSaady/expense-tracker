// Retrieves the Sum of the passed array of numbers.
export function sum(arr: number[]) {
    let sum = 0;

    for (let num of arr) {
        sum += num;
    }

    return sum;
}