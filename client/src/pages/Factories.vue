<template>
  <div class="factory-table">
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import { serverUrl } from '../utils/serverUrl'
import axios from 'axios'
  export default {
    data() {
      return {
        // fields: [
        //   {
        //     key: 'last_name',
        //     sortable: true
        //   },
        //   {
        //     key: 'first_name',
        //     sortable: true
        //   },
        //   {
        //     key: 'age',
        //     sortable: true
        //   }
        // ],
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
          }
        ],
        // items: [
        //   { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        //   { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        //   { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        //   { age: 38, first_name: 'Jami', last_name: 'Carney' }
        // ]
        items: []
      }
    },
    mounted() {
        axios.get(`${serverUrl}/list-factories`)
        .then(res => {
            console.log(res);
            this.items = res.data.data;
        });
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