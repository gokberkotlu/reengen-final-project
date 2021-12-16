<template>
    <b-modal id="modal-add-factory-details" title="NEW">
        <p class="my-4">Add Factory Details</p>

        <b-form @submit.prevent="addFactoryDetailsInformation()">
            <b-form-group id="input-group-factory-details-name-edit" label="Name:" label-for="input-edit-factory-details-name">
                <b-form-select id="input-edit-factory-details-name"
                :options="factories"
                v-model="newFactoryDetailsData.name"
                required>
                </b-form-select>
            </b-form-group>

            <b-form-group id="input-group-factory-details-department-edit" label="Departmant:"
                label-for="input-edit-factory-details-department">
                <b-form-input id="input-edit-factory-details-department" type="text" placeholder="Enter department"
                v-model="newFactoryDetailsData.department" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-date-range-edit" label="Date Range:"
                label-for="input-edit-factory-details-date-range">
                <b-form-input id="input-edit-factory-details-date-range" type="text" placeholder="Enter date range"
                v-model="newFactoryDetailsData.date_range"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-consumption-edit" label="Consumption:"
                label-for="input-edit-factory-details-consumption">
                <b-form-input id="input-edit-factory-details-consumption" type="number" placeholder="Enter consumption"
                v-model="newFactoryDetailsData.consumption" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-invoice-edit" label="Invoice:"
                label-for="input-edit-factory-details-invoice">
                <b-form-input id="input-edit-factory-details-invoice" type="number" placeholder="Enter invoice"
                v-model="newFactoryDetailsData.invoice" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-discount-edit" label="Discount:"
                label-for="input-edit-factory-details-discount">
                <b-form-select id="input-edit-factory-details-discount"
                :options="[true, false]"
                v-model="newFactoryDetailsData.discount" required></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../../utils/serverUrl'

export default {
    props: ['factories'],
    data() {
        return {
            newFactoryDetailsData : {}
        }
    },
    methods: {
        addFactoryDetailsInformation() {
            axios({
                method: 'post',
                url: `${serverUrl}/add-factory-details`,
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