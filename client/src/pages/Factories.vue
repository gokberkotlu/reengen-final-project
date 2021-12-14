<template>
  <div class="factory-table">
    <b-table striped hover :items="items" :fields="fields">
        <template #cell(actions)="row">
            <b-button @click="editFactory(row.item)" size="sm" class="mr-1">
                Edit
            </b-button>
            <b-button  @click="deleteFactory(row.item.id)" size="sm">
                Delete
            </b-button>
        </template>
    </b-table>
    <factory-edit-modal v-if="factoryInfoEdit" :factoryInfoEdit="factoryInfoEdit" />
  </div>
</template>

<script>
import { serverUrl } from '../utils/serverUrl'
import axios from 'axios'
import FactoryEditModal from '../components/FactoryEditModal.vue'

  export default {
    data() {
      return {
        factoryInfoEdit: {},
        fields: [
            {
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
                if(res.status === 200) {
                    this.getFactoryList();
                }
            });
        },
        editFactory(row) {
            this.factoryInfoEdit = row;
            if(this.factoryInfoEdit) {
                this.$bvModal.show('modal-edit-factory');
            }
        },
        submitFactoryChanges() {}
    },
    mounted() {
        this.getFactoryList();
    },
    components: {
        FactoryEditModal
    }
  }
</script>

<style scoped>
    .factory-table {
        width: 80%;
        min-width: 390px;
        margin: 4rem auto 0 auto;
        border-radius: 5px;
        border: 1px solid rgb(192, 183, 183);
        overflow: hidden;
    }
</style>