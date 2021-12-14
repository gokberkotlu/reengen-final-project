import {
    required,
    minLength,
    email,
    // helpers
  } from "vuelidate/lib/validators";

export const validation = {
    validations: {
        form: {
            authority: {
                required
            },
            name: {
                required,
                minLength: minLength(8)
            },
            email: {
                required,
                email
            },
            password: {
                required
            }
        }
    },
    methods: {
        validateState(name) {
            const {
                $dirty,
                $error
            } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }

            alert("Form submitted!");
        }
    }
}