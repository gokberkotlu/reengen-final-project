<template>
    <div class="update-user-informations-container">
        <h3 class="settings-sub-header">UPDATE USER INFORMATION</h3>
        <b-form @submit.stop.prevent="onSubmit">
            <!-- NAME -->
            <b-form-group id="name-input-update-group"
            label="Name"
            label-for="name-input-update">
                <b-form-input
                id="name-input-update"
                name="name-input-update"
                v-model="$v.form.name.$model"
                :state="validateState('name')"
                aria-describedby="name-input-update-live-feedback"></b-form-input>
                <b-form-invalid-feedback id="name-input-update-live-feedback">
                    This is a required field and must be at least 8 characters.
                </b-form-invalid-feedback>
            </b-form-group>
            <!-- EMAIL -->
            <b-form-group id="email-input-update-group"
            label="Email"
            label-for="email-input-update">
                <b-form-input
                id="email-input-update"
                name="email-input-update"
                v-model="$v.form.email.$model"
                :state="validateState('email')"
                type="email"
                aria-describedby="email-input-update-live-feedback">
                </b-form-input>
                <b-form-invalid-feedback id="email-input-update-live-feedback">
                    This is a required e-mail field.
                </b-form-invalid-feedback>
            </b-form-group>

            <!-- AUTHORITY -->
            <b-form-group
            id="authority-input-update-group"
            label="Authority"
            label-for="authority-input-update">
                <b-form-select
                id="authority-input-update"
                name="authority-input-update"
                v-model="$v.form.authority.$model"
                :options="authority"
                :state="validateState('authority')"
                aria-describedby="authority-input-update-live-feedback">
                </b-form-select>
                <b-form-invalid-feedback id="authority-input-update-live-feedback">
                    This is a required authority field.
                </b-form-invalid-feedback>
            </b-form-group>

            <!-- PASSWORD -->
            <b-form-group
            id="password-input-update-group"
            label="Verify Password"
            label-for="password-input-update">
                <b-form-input
                id="password-input-update"
                name="password-input-update"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
                type="password"
                aria-describedby="password-input-update-live-feedback"
                required>
                </b-form-input>
                <b-form-invalid-feedback id="password-input-update-live-feedback">
                    This is a required password field.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-button class="btn-update-user-informations" type="submit" variant="success">Update</b-button>
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
                authority: [{
                        value: null,
                        text: "Choose..."
                    },
                    {
                        value: "admin",
                        text: "Admin"
                    },
                    {
                        value: "editor",
                        text: "Editor"
                    }
                ],
                form: {
                    name: this.$store.state.name,
                    email: this.$store.getters.getEmail,
                    authority: this.$store.getters.getAuthority,
                    password: null
                }
            };
        },
        methods: {
            onSubmit() {
                axios({
                    method: 'patch',
                    url: `${serverUrl}/edit-account`,
                    data: {
                        name: this.form.name,
                        email: this.form.email,
                        authority: this.form.authority,
                        password: this.form.password,
                        token: this.$store.getters.getToken
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        this.form.name = this.$store.state.name;
                        this.form.email = this.$store.getters.getEmail;
                        this.form.authority = this.$store.getters.getAuthority;
                        this.form.password = null;
                        this.$v.$reset();
                        this.$bvToast.toast("Account updated", {
                            title: 'Success',
                            autoHideDelay: 3000
                        })
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .update-user-informations-container {
        width: 85%;
        min-width: 390px;
        margin: 4rem auto;
    }

    @media screen and (max-width: 700px) {
        .btn-update-user-informations {
            width: 100%;
        }
    }
</style>