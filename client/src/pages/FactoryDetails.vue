<template>
    <div class="factory-details-container">
        <div class="factory-details-table">
            <b-table striped hover :items="items" :fields="fields">
                <template #cell(actions)="row">
                    <b-button :disabled="$store.state.authority !== 'admin'" @click="editFactoryDetails(row.item)" size="sm" class="btn btn-info mr-1">
                        Edit
                    </b-button>
                    <b-button :disabled="$store.state.authority !== 'admin'" @click="deleteFactoryDetails(row.item.id)" size="sm" class="btn btn-danger">
                        Delete
                    </b-button>
                </template>
            </b-table>
        </div>

        <div class="d-flex justify-content-end mt-3">
            <b-button @click="openAddFactoryDetailsModal"
            :disabled="$store.state.authority !== 'admin'"
            class="btn btn-success">Add</b-button>
        </div>

        <factory-details-edit-modal :factories="factories" v-if="factoryInfoEdit" :factoryDetailsInfoEdit="factoryInfoEdit" @updated="getFactoryDetailsList" />

        <factory-details-add-modal :factories="factories" @updated="getFactoryDetailsList" />
    </div>
</template>

<script>
    import {
        serverUrl
    } from '../utils/serverUrl'
    import axios from 'axios'
    import FactoryDetailsEditModal from '../components/factory-details/FactoryDetailsEditModal.vue'
    import FactoryDetailsAddModal from '../components/factory-details/FactoryDetailsAddModal.vue'

    export default {
        data() {
            return {
                factoryInfoEdit: {},
                fields: [{
                        key: 'name',
                        sortable: true
                    },
                    {
                        key: 'department',
                        sortable: true
                    },
                    {
                        key: 'date_range',
                        sortable: true
                    },
                    {
                        key: 'consumption',
                        sortable: true
                    },
                    {
                        key: 'invoice',
                        sortable: true
                    },
                    {
                        key: 'discount',
                        label: 'Discount'
                    },
                    {
                        key: 'actions',
                        label: 'Actions'
                    }
                ],
                items: [],
                factories: []
            }
        },
        methods: {
            getFactoryDetailsList() {
                axios.get(`${serverUrl}/list-factory-details`)
                    .then(res => {
                        this.items = res.data;
                        this.$bvModal.hide('modal-edit-factory-details');
                        this.$bvModal.hide('modal-add-factory-details');
                    });
            },
            getFactoryList() {
                axios.get(`${serverUrl}/list-factories`)
                    .then(res => {
                        this.factories = res.data.map(item => item.name);
                    });
            },
            deleteFactoryDetails(id) {
                axios({
                        method: 'delete',
                        url: `${serverUrl}/delete-factory-details`,
                        data: {
                            id
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.getFactoryList();
                        }
                    });
            },
            editFactoryDetails(row) {
                this.factoryInfoEdit = {
                    ...row
                };
                if (this.factoryInfoEdit) {
                    this.$bvModal.show('modal-edit-factory-details');
                }
            },
            openAddFactoryDetailsModal() {
                this.$bvModal.show('modal-add-factory-details');
            }
        },
        mounted() {
            this.getFactoryList();
            this.getFactoryDetailsList();
        },
        components: {
            FactoryDetailsEditModal,
            FactoryDetailsAddModal
        }
    }
</script>

<style scoped>
    .factory-details-container {
        width: 80%;
        min-width: 390px;
        margin: 4rem auto 0 auto;
    }

    .factory-details-table {
        border-radius: 5px;
        border: 1px solid rgb(192, 183, 183);
        overflow: hidden;
    }

    .add-btn {
        margin-left: auto;
    }
</style>