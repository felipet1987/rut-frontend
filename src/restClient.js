import axios from 'axios'


export const getUser = (rut) => {
    const res = axios.post('http://localhost:8080/user/find_by_rut', {
        rut: rut,
    })
    return res
}