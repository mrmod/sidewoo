import parseJSON from 'date-fns/parseJSON'
import isValid from 'date-fns/isValid'

export const parseDate = (date) => {
    let parsed = parseJSON(date)
    if (isValid(parsed)) {
        return parsed
    }
    console.error('Failed to parse date', date)
    return new Date()
}