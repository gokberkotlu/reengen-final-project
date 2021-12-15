<template>
    <b-modal id="modal-add-factory-details" title="NEW">
        <p class="my-4">Add Factory Information</p>

        <b-form @submit.prevent="addFactoryInformation()">
            <b-form-group id="input-group-factory-details-name-edit" label="Name:" label-for="input-edit-factory-details-name-edit">
                <b-form-input id="input-edit-factory-details-name-edit" type="text" placeholder="Enter name"
                v-model="newFactoryDetailsData.name"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-start-date-edit" label="Start Date:"
                label-for="input-edit-factory-details-start-date-edit">
                <b-form-input id="input-edit-factory-details-start-date-edit" type="text" placeholder="Enter start date"
                v-model="newFactoryDetailsData.start_date" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-expirationt-date-edit" label="Expiration Date:"
                label-for="input-edit-factory-details-expiration-date-edit">
                <b-form-input id="input-edit-factory-details-expiration-date-edit" type="text" placeholder="Enter expiration date"
                v-model="newFactoryDetailsData.expiration_date" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-employee-number-edit" label="Employee Number:"
                label-for="input-edit-factory-details-employee-number-edit">
                <b-form-input id="input-edit-factory-details-employee-number-edit" type="text" placeholder="Enter employee number"
                v-model="newFactoryDetailsData.employee_number" required></b-form-input>
            </b-form-group>


            <b-form-group id="input-group-factory-details-special-member-edit" label="Special Member:"
                label-for="input-edit-factory-details-special-member-edit">
                <b-form-select id="input-edit-factory-details-special-member-edit" :options="[true, false]"
                v-model="newFactoryDetailsData.special_member" required></b-form-select>
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
            newFactoryDetailsData : {}
        }
    },
    methods: {
        addFactoryInformation() {
            axios({
                method: 'post',
                url: `${serverUrl}/add-factory`,
                data: this.newFactoryDetailsData
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