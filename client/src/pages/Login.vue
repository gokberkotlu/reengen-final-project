<template>
    <div class="login-container">
        <h1 class="login-container-header">LOGIN</h1>
        <b-form @submit.stop.prevent="onSubmit">
                <!-- EMAIL -->
                <b-form-group id="email-input-group" label="Email" label-for="email-input">
                    <b-form-input id="email-input" name="email-input" v-model="$v.form.email.$model"
                        :state="validateState('email')" type="email" aria-describedby="email-input-live-feedback">
                    </b-form-input>

                    <b-form-invalid-feedback id="email-input-live-feedback">
                        This is a required e-mail field.
                    </b-form-invalid-feedback>
                </b-form-group>

                <!-- PASSWORD -->
                <b-form-group id="password-input-group" label="Password" label-for="password-input">
                    <b-form-input id="password-input" name="password-input" v-model="$v.form.password.$model"
                        :state="validateState('password')" type="password" aria-describedby="password-input-live-feedback">
                    </b-form-input>

                    <b-form-invalid-feedback id="password-input-live-feedback">
                        This is a required password field.
                    </b-form-invalid-feedback>
                </b-form-group>

                <button type="submit">Login</button>

                <b-form-checkbox
                id="checkbox-remember"
                v-model="remember"
                name="checkbox-remember"
                class="mt-2"
                checked="checked"
                >
                Remember me
                </b-form-checkbox>

                <div @click="goToRegisterPage" style="background-color: #fff; text-align: right">
                    <div class="btn register-btn w-25">Register</div>
                </div>
            </b-form>
    </div>
</template>

<script>
    import { validation } from '../mixins/validation'

    import { validationMixin } from "vuelidate";
    export default {
        mixins: [validationMixin, validation],
        data() {
            return {
                form: {
                    name: null,
                    email: null,
                    authority: null,
                    password: null,
                },
                remember: true
            };
        },
        methods: {
            goToRegisterPage() {
                this.$router.push('/register');
            },
            onSubmit() {
                this.$store.dispatch('login', { form: this.form, remember: this.remember});
            }
        }
    }
</script>

<style>
    .login-container {
        width: 45%;
        min-width: 360px;
        border: 3px solid #f1f1f1;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 1rem 2rem;
    }

    .login-container form input[type=email],
    .login-container form input[type=password] {
        width: 100%;
        padding: 1.4rem 1.1rem;
        margin: 6px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    .login-container form button {
        background-color: #04AA6D !important;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    .login-container form button:hover {
        opacity: 0.8;
    }

    .login-container form label {
        font-weight: 600;
    }

    .register-btn {
        background-color: rgb(40, 75, 228);
        color: white;
    }

    .register-btn:hover {
        opacity: .9;
        color: #f3f3f3;
    }

    .login-container-header {
        font-size: 1.5rem;
        text-align: right;
        margin-bottom: 1rem;
    }

    @media screen and (max-width: 1000px) {
        .register {
            width: 30% !important;
        }
    }

    @media screen and (max-width: 380px) {
        .register {
            width: 100% !important;
        }
    }
</style>