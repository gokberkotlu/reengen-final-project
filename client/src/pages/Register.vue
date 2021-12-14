<template>
    <div>
        <div class="register-container">
            <h1 class="register-container-header">REGISTRATION</h1>
            <b-form @submit.stop.prevent="onSubmit">
                <!-- NAME -->
                <b-form-group id="name-input-group" label="Name" label-for="name-input">
                    <b-form-input id="name-input" name="name-input" v-model="$v.form.name.$model"
                        :state="validateState('name')" aria-describedby="name-input-live-feedback"></b-form-input>

                    <b-form-invalid-feedback id="name-input-live-feedback">
                        This is a required field and must be at least 3 characters.
                    </b-form-invalid-feedback>
                </b-form-group>

                <!-- EMAIL -->
                <b-form-group id="email-input-group" label="Email" label-for="email-input">
                    <b-form-input id="email-input" name="email-input" v-model="$v.form.email.$model"
                        :state="validateState('email')" aria-describedby="email-input-live-feedback">
                    </b-form-input>

                    <b-form-invalid-feedback id="email-input-live-feedback">
                        This is a required e-mail field.
                    </b-form-invalid-feedback>
                </b-form-group>

                <!-- PASSWORD -->
                <b-form-group id="password-input-group" label="Password" label-for="password-input">
                    <b-form-input id="password-input" name="password-input" v-model="$v.form.password.$model"
                        :state="validateState('password')" aria-describedby="password-input-live-feedback">
                    </b-form-input>

                    <b-form-invalid-feedback id="password-input-live-feedback">
                        This is a required password field.
                    </b-form-invalid-feedback>
                </b-form-group>

                <!-- AUTHORITY -->
                <b-form-group id="authority-input-group" label="Authority" label-for="authority-input">
                    <b-form-select id="authority-input" name="authority-input" v-model="$v.form.authority.$model"
                        :options="authority" :state="validateState('authority')" aria-describedby="authority-input-live-feedback">
                    </b-form-select>

                    <b-form-invalid-feedback id="authority-input-live-feedback">
                        This is a required authority field.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    import { validation } from '../mixins/validation'

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
                    name: null,
                    email: null,
                    authority: null,
                    password: null
                }
            };
        }
    };
</script>

<style scoped>
    .register-container {
        width: 45%;
        min-width: 360px;
        padding: 3rem 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        border: 3px solid #ccc;
    }

    .register-container-header {
        font-size: 1.5rem;
        text-align: right;
        margin-bottom: 1rem;
    }
</style>