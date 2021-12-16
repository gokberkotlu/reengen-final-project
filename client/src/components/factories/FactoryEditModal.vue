<template>
    <b-modal id="modal-edit-factory" title="EDIT">
        <p class="my-4">Edit Factory Information</p>

        <b-form @submit.prevent="editFactoryInformation()">
            <b-form-group id="input-group-factory-name-edit" label="Name:" label-for="input-edit-factory-name-edit">
                <b-form-input id="input-edit-factory-name-edit" type="text" placeholder="Enter name"
                v-model="factoryInfoEdit.name"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-start-date-edit" label="Start Date:"
                label-for="input-edit-factory-start-date-edit">
                <b-form-input id="input-edit-factory-start-date-edit" type="text" placeholder="Enter start date"
                v-model="factoryInfoEdit.start_date" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-expiration-date-edit" label="Expiration Date:"
                label-for="input-edit-factory-expiration-date-edit">
                <b-form-input id="input-edit-factory-expiration-date-edit" type="text" placeholder="Enter expiration date"
                v-model="factoryInfoEdit.expiration_date" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-employee-number-edit" label="Employee Number:"
                label-for="input-edit-factory-employee-number-edit">
                <b-form-input id="input-edit-factory-employee-number-edit" type="number" placeholder="Enter employee number"
                v-model="factoryInfoEdit.employee_number" required></b-form-input>
            </b-form-group>


            <b-form-group id="input-group-factory-special-member-edit" label="Special Member:"
                label-for="input-edit-factory-special-member-edit">
                <b-form-select id="input-edit-factory-special-member-edit" :options="[true, false]"
                v-model="factoryInfoEdit.special_member" required></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../../utils/serverUrl'

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