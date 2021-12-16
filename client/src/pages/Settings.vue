<template>
    <div class="settings">
        <h1 style="text-align: right;">Settings</h1>
        <update-password />
        <update-user-informations />
    </div>
</template>

<script>
import UpdatePassword from '../components/settings/UpdatePassword.vue'
import UpdateUserInformations from '../components/settings/UpdateUserInformations.vue'
export default {
    components: {
        UpdatePassword,
        UpdateUserInformations
    }
}
</script>

<style>

    .settings {
        width: 70%;
        min-width: 390px;
        margin: 4rem auto;
    }

    .settings-sub-header {
        font-size: 1.6rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .settings label {
        font-size: .9rem;
        font-weight: 900;
        color: #333;
    }

    @media screen and (max-width: 700px) {
        .settings-sub-header {
            text-align: center;
        }
    }
</style>