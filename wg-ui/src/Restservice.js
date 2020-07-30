import axios from 'axios';

export default {

    createUser(username, password) {
        const requestBody = {
            query: `
                        mutation {
                            createUser(userInput: {username: "${username}", password: "${password}" }) {
                                _id
                                username
                                password

                            }
                        }
                    `
        };
        return this.request(requestBody);
    },

    login(user) {
        const requestBody = {
            query: `
                        query {
                            login(username: "${user.username}", password: "${user.password}" ) {
                            token
                            userId
                            }
                        }
                    `
        };
        return this.request(requestBody);
    },

    getUsers() {
        const requestBody = {
            query: `
                        query {
                            users {
                            username
                            }
                        }
                    `
        };
        return this.request(requestBody);
    },

    request(requestBody) {
        return axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    return ('Wrong')
                }
                return (response.data);

            })
            .catch(error => {
                return (error)
            })
    }


}
