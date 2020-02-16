<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-col><h1>Login</h1></v-col>
                <div v-if="show">{{message}}</div>
                <v-col cols="4">
                    <v-card>
                        <v-card-title>Create new user</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field v-model="username" label="username" outlined>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="password" label="password" outlined>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="createUser">Create</v-btn>
                            <v-btn outlined color="primary">Reset</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-col>
            </v-col>


        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            username: '',
            password: '',
            show: false,
            message: ''
        }),
        methods: {
            createUser() {
                const requestBody = {
                    query: `
                        mutation {
                            createUser(userInput: {username: "${this.username}", password: "${this.password}" }) {
                                _id
                                username
                                password
                            }
                        }
                    `
                };
                fetch('http://localhost:3000/graphql', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status !== 200 && response.status !== 201) {
                            throw new Error('Failed')
                        }
                        return response.json();

                    })
                    .then((responseData) => {
                        if (responseData.errors) {
                            this.message = responseData.errors[0].message
                            this.show = true;

                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })

            }
        }
    }
</script>

<style scoped>

</style>