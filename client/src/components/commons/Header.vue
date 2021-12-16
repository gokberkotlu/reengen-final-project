<template>
    <div class="dashboard-nav-container">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand
            @click="navigateToFactoriesPage"
            style="cursor: pointer;">
                Dashboard
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item @click="navigateToFactoriesPage">Factories</b-nav-item>
                    <b-nav-item @click="navigateToFactoryDetails">Factory Details</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-row v-if="!$store.state.token && !$store.state.name">
                        <b-nav-item>
                            <router-link
                            to="/login"
                            >
                                <span>Login</span>
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link
                            to="/register"
                            >
                                <span>Signup</span>
                            </router-link>
                        </b-nav-item>
                    </b-row>

                    <b-row v-else>
                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template #button-content>
                                <!-- User -->
                                {{ $store.state.name }}
                            </template>
                            <b-dropdown-item>
                                <router-link
                                to="/settings"
                                >
                                    <span>Settings</span>
                                </router-link>
                            </b-dropdown-item>
                            <b-dropdown-item @click="$store.dispatch('logout')">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-row>
                    
                    <!-- <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item>TR</b-dropdown-item>
                        <b-dropdown-item>EN</b-dropdown-item>
                    </b-nav-item-dropdown> -->
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    methods: {
        navigateToFactoriesPage() {
            let path = '/factories';
            if(this.$route.path !== path) {
                this.$router.push(path);
            }
        },
        navigateToFactoryDetails() {
            let path = '/factory-details';
            if(this.$route.path !== path) {
                this.$router.push(path);
            }
        }
    }
}
</script>

<style>
    .navbar-dark .navbar-nav .nav-link {
        color: #f3f3f3;
    }
</style>