<template>
    <div class="factories-container">
        <div class="factory-table">
            <b-table striped hover :items="items" :fields="fields">
                <template #cell(actions)="row">
                    <b-button :disabled="$store.state.authority !== 'admin'" @click="editFactory(row.item)" size="sm" class="btn btn-info mr-1">
                        Edit
                    </b-button>
                    <b-button :disabled="$store.state.authority !== 'admin'" @click="deleteFactory(row.item.id)" size="sm" class="btn btn-danger">
                        Delete
                    </b-button>
                </template>
            </b-table>
        </div>

        <div class="d-flex justify-content-end mt-3">
            <b-button @click="openAddFactoryModal"
            :disabled="$store.state.authority !== 'admin'"
            class="btn btn-success">Add</b-button>
        </div>

        <factory-edit-modal v-if="factoryInfoEdit" :factoryInfoEdit="factoryInfoEdit" @updated="getFactoryList" />

        <factory-add-modal @updated="getFactoryList" />
    </div>
</template>

<script>
    import {
        serverUrl
    } from '../utils/serverUrl'
    import axios from 'axios'
    import FactoryEditModal from '../components/factories/FactoryEditModal.vue'
    import FactoryAddModal from '../components/factories/FactoryAddModal.vue'

    export default {
        data() {
            return {
                factoryInfoEdit: {},
                fields: [{
                        key: 'name',
                        sortable: true
                    },
                    {
                        key: 'start_date',
                        sortable: true
                    },
                    {
                        key: 'expiration_date',
                        sortable: true
                    },
                    {
                        key: 'employee_number',
                        sortable: true
                    },
                    {
                        key: 'special_member',
                        sortable: true
                    },
                    {
                        key: 'actions',
                        label: 'Actions'
                    }
                ],
                items: []
            }
        },
        methods: {
            getFactoryList() {
                axios.get(`${serverUrl}/list-factories`)
                    .then(res => {
                        this.items = res.data;
                        this.$bvModal.hide('modal-edit-factory');
                        this.$bvModal.hide('modal-add-factory');
                    });
            },
            deleteFactory(id) {
                axios({
                        method: 'delete',
                        url: `${serverUrl}/delete-factory`,
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
            editFactory(row) {
                this.factoryInfoEdit = {
                    ...row
                };
                if (this.factoryInfoEdit) {
                    this.$bvModal.show('modal-edit-factory');
                }
            },
            openAddFactoryModal() {
                this.$bvModal.show('modal-add-factory');
            }
        },
        mounted() {
            this.getFactoryList();
        },
        components: {
            FactoryEditModal,
            FactoryAddModal
        }
    }
</script>

<style scoped>
    .factories-container {
        width: 80%;
        min-width: 390px;
        margin: 4rem auto 0 auto;
    }

    .factory-table {
        border-radius: 5px;
        border: 1px solid rgb(192, 183, 183);
        overflow: hidden;
    }

    .add-btn {
        margin-left: auto;
    }
</style>