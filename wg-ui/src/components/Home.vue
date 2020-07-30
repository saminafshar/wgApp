<template>
    <v-container fluid>
        <h2>| Home</h2>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        Comments
                    </v-card-title>
                    <v-card-text>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: 'Home',

        data: () => ({}),
        mounted() {
            fetch("https://tripadvisor1.p.rapidapi.com/answers/list?limit=10&question_id=5283833", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
                    "x-rapidapi-key": "92a655b69emsh8ae79e5dbbd6a59p116f84jsn59fa043e1fe4"
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
</script>
