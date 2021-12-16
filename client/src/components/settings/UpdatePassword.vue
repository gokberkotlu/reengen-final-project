<template>
    <div class="update-password-container">
    <h3 class="settings-sub-header">UPDATE PASSWORD</h3>
        <b-form @submit.prevent="onSubmit">
            <b-form-group id="current-password-input-group" label="Current Password"
                label-for="input-current-password">
                <b-form-input
                id="input-current-password"
                name="input-current-password"
                v-model="$v.form.currentPassword.$model"
                :state="validateState('currentPassword')"
                type="password"
                aria-describedby="current-password-input-live-feedback"
                placeholder="Enter password"
                required></b-form-input>
                <b-form-invalid-feedback id="current-password-input-live-feedback">
                    This is a required password field.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="new-password-input-group" label="New Password"
                label-for="input-new-password">
                <b-form-input
                id="input-new-password"
                name="input-new-password"
                v-model="$v.form.newPassword.$model"
                :state="validateState('newPassword')"
                type="password"
                aria-describedby="new-password-input-live-feedback"
                placeholder="Enter new password"
                required></b-form-input>
                <b-form-invalid-feedback id="new-password-input-live-feedback">
                    This is a required password field.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" class="btn-change-password">Change Password</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../../utils/serverUrl'

import { validation } from '../../mixins/validation'

import { validationMixin } from "vuelidate";
export default {
    mixins: [validationMixin, validation],
    data() {
        return {
            form: {
                currentPassword: null,
                newPassword: null,
            }
        };
    },
    methods: {
        onSubmit() {
            axios({
                method: 'patch',
                url: `${serverUrl}/edit-password`,
                data: {
                    currentPassword: this.form.currentPassword,
                    newPassword: this.form.newPassword,
                    token: this.$store.getters.getToken
                }
            })
            .then(res => {
                if(res.status === 200) {
                    this.$bvToast.toast("Password updated", {
                        title: 'Success',
                        autoHideDelay: 3000
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                this.$bvToast.toast("Password update failed", {
                    title: 'Unsuccessful',
                    autoHideDelay: 3000
                })
            });

            this.form.currentPassword = null;
            this.form.newPassword = null;
            this.$v.$reset();
        }
    }
}
</script>

<style scoped>
    .update-password-container {
        width: 85%;
        min-width: 390px;
        margin: 2rem auto;
    }

    @media screen and (max-width: 700px) {
        .btn-change-password {
            width: 100%;
        }
    }
</style>