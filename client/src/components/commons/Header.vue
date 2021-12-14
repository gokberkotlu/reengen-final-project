<template>
    <div class="dashboard-nav-container">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand
            @click="$router.push('/')"
            style="cursor: pointer;">
                Dashboard
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item @click="$router.push('/factories')">Factories</b-nav-item>
                    <b-nav-item @click="$router.push('/factory-details')">Factory Details</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            User
                        </template>
                        <b-dropdown-item>
                            <router-link
                            to="/settings"
                            >
                                <span>Settings</span>
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item>TR</b-dropdown-item>
                        <b-dropdown-item>EN</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .navbar-dark .navbar-nav .nav-link {
        color: #f3f3f3;
    }
</style>