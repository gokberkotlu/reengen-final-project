<template>
    <b-modal id="modal-edit-factory-details" title="EDIT">
        <p class="my-4">Edit Factory Details</p>

        <b-form @submit.prevent="editFactoryDetailsInformation()">
            <b-form-group id="input-group-factory-details-name-edit" label="Name:" label-for="input-edit-factory-details-name">
                <b-form-select id="input-edit-factory-details-name"
                :options="factories"
                v-model="factoryDetailsInfoEdit.name"
                required>
                </b-form-select>
            </b-form-group>

            <b-form-group id="input-group-factory-details-department-edit" label="Departmant:"
                label-for="input-edit-factory-details-department">
                <b-form-input id="input-edit-factory-details-department" type="text" placeholder="Enter department"
                v-model="factoryDetailsInfoEdit.department" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-date-range-edit" label="Date Range:"
                label-for="input-edit-factory-details-date-range">
                <b-form-input id="input-edit-factory-details-date-range" type="text" placeholder="Enter date range"
                v-model="factoryDetailsInfoEdit.date_range"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-consumption-edit" label="Consumption:"
                label-for="input-edit-factory-details-consumption">
                <b-form-input id="input-edit-factory-details-consumption" type="number" placeholder="Enter consumption"
                v-model="factoryDetailsInfoEdit.consumption" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-invoice-edit" label="Invoice:"
                label-for="input-edit-factory-details-invoice">
                <b-form-input id="input-edit-factory-details-invoice" type="number" placeholder="Enter invoice"
                v-model="factoryDetailsInfoEdit.invoice" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-factory-details-discount-edit" label="Discount:"
                label-for="input-edit-factory-details-discount">
                <b-form-select id="input-edit-factory-details-discount"
                :options="[true, false]"
                v-model="factoryDetailsInfoEdit.discount" required></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { serverUrl } from '../../utils/serverUrl'

export default {
    props: ['factoryDetailsInfoEdit', 'factories'],
    methods: {
        editFactoryDetailsInformation() {

            console.log(this.factoryDetailsInfoEdit);

            axios({
                method: 'put',
                url: `${serverUrl}/update-factory-details`,
                data: this.factoryDetailsInfoEdit
            })
            .then(res => {
                if(res.status === 200) {
                    this.$emit('updated');
                }
            });
            console.log(this.factoryDetailsInfoEdit);
        }
    }
}
</script>