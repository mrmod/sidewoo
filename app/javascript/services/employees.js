import axios from 'axios'
import {authorizedJSONHeaders, railsErrorHandler} from './requests'

const allEmployeesUrl = '/api/employees'
const oneEmployeeUrl = id => `${allEmployeesUrl}/${id}`

export const getOneEmployee = id => axios.get(oneEmployeeUrl(id), authorizedJSONHeaders)
    .then(r => r.data)
    .then(data => ({
        data: data,
        error: null,
    }))
    .catch(railsErrorHandler)