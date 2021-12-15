<template>
    <b-modal id="modal-edit-factory-details" title="EDIT">
        <p class="my-4">Edit Factory Information</p>

        <b-form @submit.prevent="editFactoryInformation()">
            <b-form-group id="input-group-factory-details-name-edit" label="Name:" label-for="input-edit-factory-details-name-edit">
                <b-form-input id="input-edit-factory-details-name-edit" type="text" placeholder="Enter name"
                v-model="factoryDetailsInfoEdit.name"
                required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-department-edit" label="Departmant:"
                label-for="input-edit-factory-details-department-edit">
                <b-form-input id="input-edit-factory-details-department-edit" type="text" placeholder="Enter department"
                v-model="factoryDetailsInfoEdit.department" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-date-range-edit" label="Date Range:"
                label-for="input-edit-factory-details-date-range-edit">
                <b-form-input id="input-edit-factory-details-date-range-edit" type="text" placeholder="Enter date range"
                v-model="factoryDetailsInfoEdit.date_range" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-consumption-edit" label="Consumption:"
                label-for="input-edit-factory-details-consumption-edit">
                <b-form-input id="input-edit-factory-details-consumption-edit" type="text" placeholder="Enter consumption"
                v-model="factoryDetailsInfoEdit.consumption" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-invoice-edit" label="Invoice:"
                label-for="input-edit-factory-details-invoice-edit">
                <b-form-input id="input-edit-factory-details-invoice-edit" type="text" placeholder="Enter invoice"
                v-model="factoryDetailsInfoEdit.invoice" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-discount-edit" label="Discount:"
                label-for="input-edit-factory-details-discount-edit">
                <b-form-input id="input-edit-factory-details-discount-edit" type="text" placeholder="Enter discount"
                v-model="factoryDetailsInfoEdit.discount" required></b-form-input>
            </b-form-group>


            <b-form-group id="input-group-factory-details-special-member-edit" label="Special Member:"
                label-for="input-edit-factory-details-special-member-edit">
                <b-form-select id="input-edit-factory-details-special-member-edit" :options="[true, false]"
                v-model="factoryDetailsInfoEdit.special_member" required></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../../utils/serverUrl'

export default {
    props: ['factoryDetailsInfoEdit'],
    methods: {
        editFactoryInformation() {
            axios({
                method: 'put',
                url: `${serverUrl}/update-factory`,
                data: this.factoryDetailsInfoEdit
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