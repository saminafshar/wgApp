<template>
    <v-app>
        <v-app-bar
                clipped-left
                apppekeke
        >
            <v-icon color="black" @click="navDrawer = !navDrawer">mdi-menu</v-icon>
            <h3 class="ml-2">Home</h3>
            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>

        </v-app-bar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-navigation-drawer :value="navDrawer" width="200" app absolute fixed left clipped>
            <v-list nav dense class="py-0">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>Account</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

    </v-app>
</template>

<script>
    export default {
        name: 'App',

        components: {},

        data: () => ({
            navDrawer: true,
        }),
    };
</script>
