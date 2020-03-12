import parseJSON from 'date-fns/parseJSON'
import isValid from 'date-fns/isValid'

export const parseDate = date => {
    let parsed = parseJSON(date)
    if (isValid(parsed)) {
        return parsed
    }
    return new Date()
}