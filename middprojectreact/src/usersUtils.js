const axios = require('axios')

const url = "https://jsonplaceholder.typicode.com/users"

const getUsers = function()
{
    return axios.get(url)
}

export default {getUsers}