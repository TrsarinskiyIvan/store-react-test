export default function chooseCourse(symbol) {

    let indexOfAmount = 0;

    switch (symbol) {
        case '$': {
            indexOfAmount = 0;
            break;
        }
        case '£': {
            indexOfAmount = 1;
            break;
        }
        case 'A$': {
            indexOfAmount = 2;
            break;
        }
        case '¥': {
            indexOfAmount = 3;
            break;
        } case '₽': {
            indexOfAmount = 4;
            break;
        }
        default: {
            indexOfAmount = 0;
        }
    }
    return indexOfAmount;
}