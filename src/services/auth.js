import axios from "axios";

// API auth calls

export function register(username, password) {
    axios.post('http://localhost:8080/api/user/register', {
        username: username,
        password: password
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export function login(username, password) {
    axios.post('http://localhost:8080/api/user/login', {
        username: username,
        password: password
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}