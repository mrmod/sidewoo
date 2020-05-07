import parseJSON from 'date-fns/parseJSON'
import formatRelative from 'date-fns/formatRelative'
import isValid from 'date-fns/isValid'
import addMinutes from 'date-fns/addMinutes'


// Dates are stored as UTC
export const parseDate = (date) => {
    let offset = new Date().getTimezoneOffset()
    let parsed = parseJSON(date)
    if (isValid(parsed)) {
        return addMinutes(parsed, offset)
    }
    console.error('Failed to parse date', date)
    return new Date()
}

export const sinceDate = (date) => {
    let d = parseJSON(date)
    return formatRelative(d, new Date())
}