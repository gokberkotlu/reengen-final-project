<template>
    <b-modal id="modal-edit-factory" title="BootstrapVue">
        <p class="my-4">Edit Factory Information</p>

        <b-form @submit.prevent="editFactoryInformation()">
            <b-form-group id="input-group-factory-name" label="Name:" label-for="input-edit-factory-name">
                <b-form-input id="input-edit-factory-name" type="text" placeholder="Enter name"
                v-model="factoryInfoEdit.name"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-start-date" label="Start Date:"
                label-for="input-edit-factory-start-date">
                <b-form-input id="input-edit-factory-start-date" type="text" placeholder="Enter start date"
                :value="factoryInfoEdit.start_date ? factoryInfoEdit.start_date : ''" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-expirationt-date" label="Expiration Date:"
                label-for="input-edit-factory-expiration-date">
                <b-form-input id="input-edit-factory-expiration-date" type="text" placeholder="Enter expiration date"
                :value="factoryInfoEdit.expiration_date ? factoryInfoEdit.expiration_date : ''"
                    required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-employee-number" label="Employee Number:"
                label-for="input-edit-factory-employee-number">
                <b-form-input id="input-edit-factory-employee-number" type="text" placeholder="Enter employee number"
                :value="factoryInfoEdit.employee_number ? factoryInfoEdit.employee_number : ''"
                    required></b-form-input>
            </b-form-group>


            <b-form-group id="input-group-factory-special-member" label="Special Member:"
                label-for="input-edit-factory-special-member">
                <b-form-select id="input-edit-factory-special-member" :options="[true, false]"
                :value="factoryInfoEdit.special_member ? factoryInfoEdit.special_member : ''" required></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../utils/serverUrl'

export default {
    props: ['factoryInfoEdit'],
    methods: {
        editFactoryInformation() {
            axios({
                method: 'put',
                url: `${serverUrl}/update-factory`,
                data: this.factoryInfoEdit
            })
            .then(res => {
                if(res.status === 200) {
                    this.$emit('updated');
                }
            });
        }
    }
}
</script>