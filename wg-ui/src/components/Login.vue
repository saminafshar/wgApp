<template>
    <v-container fluid>
        <v-snackbar :color="snackbar.color" right top v-model="snackbar.show" :timeout="snackbar.timeout">
            {{snackbar.text}}
        </v-snackbar>
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
                                        <v-text-field v-model="user.username" label="username" outlined>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="user.password" label="password" outlined>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" :disabled="!user.password" @click="login">Login</v-btn>
                            <v-btn outlined color="primary">Reset</v-btn>
                            <v-btn @click="test">get users</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-col>
            </v-col>


        </v-row>
    </v-container>
</template>

<script>

    import Restservice from "../Restservice";

    export default {
        name: "Login",
        data: () => ({
            snackbar: {
                show: false,
                text: '',
                timeout: 3000,
                color: 'primary',
            },
            user: {
                username: '',
                password: '',
            },
            show: false,
            message: ''
        }),
        methods: {
            login() {
                this.$store.dispatch('login', this.user).then(() => {
                    this.snackbar.show = true;
                    this.snackbar.text = "Logged in!"
                })
                    .catch(error => {
                        console.log(error)
                    })
            },
            test() {
                Restservice.getUsers().then(response => {
                    console.log(response)
                })
            }
        }
    }
</script>

<style scoped>

</style>