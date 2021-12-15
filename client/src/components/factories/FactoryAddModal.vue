<template>
    <b-modal id="modal-add-factory" title="NEW">
        <p class="my-4">Add Factory Information</p>

        <b-form @submit.prevent="addFactoryInformation()">
            <b-form-group id="input-group-factory-name-edit" label="Name:" label-for="input-edit-factory-name-edit">
                <b-form-input id="input-edit-factory-name-edit" type="text" placeholder="Enter name"
                v-model="newFactoryData.name"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-start-date-edit" label="Start Date:"
                label-for="input-edit-factory-start-date-edit">
                <b-form-input id="input-edit-factory-start-date-edit" type="text" placeholder="Enter start date"
                v-model="newFactoryData.start_date" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-expirationt-date-edit" label="Expiration Date:"
                label-for="input-edit-factory-expiration-date-edit">
                <b-form-input id="input-edit-factory-expiration-date-edit" type="text" placeholder="Enter expiration date"
                v-model="newFactoryData.expiration_date" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-employee-number-edit" label="Employee Number:"
                label-for="input-edit-factory-employee-number-edit">
                <b-form-input id="input-edit-factory-employee-number-edit" type="text" placeholder="Enter employee number"
                v-model="newFactoryData.employee_number" required></b-form-input>
            </b-form-group>


            <b-form-group id="input-group-factory-special-member-edit" label="Special Member:"
                label-for="input-edit-factory-special-member-edit">
                <b-form-select id="input-edit-factory-special-member-edit" :options="[true, false]"
                v-model="newFactoryData.special_member" required></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../../utils/serverUrl'

export default {
    data() {
        return {
            newFactoryData : {}
        }
    },
    methods: {
        addFactoryInformation() {
            axios({
                method: 'post',
                url: `${serverUrl}/add-factory`,
                data: this.newFactoryData
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