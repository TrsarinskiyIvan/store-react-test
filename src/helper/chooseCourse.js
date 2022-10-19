export default function chooseCourse(symbol) {

    switch (symbol) {
        case '$': return 0
        case '£': return 1
        case 'A$': return 2
        case '¥': return 3
        case '₽': return 4
        default: return 0
    }
}