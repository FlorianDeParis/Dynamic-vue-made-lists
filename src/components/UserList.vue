<template>
  <div>
    <Splashscreen />
    <section id='app'>
        <div class="container">
            <div class="filters">
                <span class="counter">{{ counter }} résultats</span>
                <div class="fltList" @click="toggleFilter" v-bind:opened="filterState">
                    Trier
                        <div>
                            <span>A-Z</span>
                            <span>Z-A</span>
                        </div>
                </div>
            </div>
            <ul v-if="!failed">
                <li v-for="user in users" :userId="user.id" :key="user.id" @click="selectUser">
                  <div>
                    <h3>{{ user.name }}</h3>
                    <span data-type="phone">{{ user.phone }}</span>
                  </div>
                  <span data-type="city">{{ user.address.city }}</span>
                  <span data-type="email">@ {{ user.email }}</span>
                </li>
            </ul>
            <ul v-else>Oops ! Something went wrong !</ul>
        </div>
    </section>
  </div>
</template>

<script>
import Splashscreen from './Splashscreen'
require('../assets/css/userList.css')

export default {
  components: {
    Splashscreen
  },
  data () {
    return {
      users: [],
      counter: 0,
      filterState: false,
      usersAPI: 'https://jsonplaceholder.typicode.com/users',
      failed: false
    }
  },
  methods: {
    toggleFilter: function () {
      this.filterState = !(this.filterState)
    },
    selectUser: function (user) {
      this.$store.state.current_user.id = user.id
      this.$store.state.current_user.name = user.name
      this.$store.state.current_user.phone = user.phone
      this.$store.state.current_user.email = user.email
      this.$store.state.current_user.address = user.address.street + ', ' + user.address.suite + ', ' + user.address.zipcode + ' ' + user.address.city
    },
    setUsers: function (data) {
      this.$store.user_collection = data
    }
  },
  created () {
    var th = this
    var request = new XMLHttpRequest()
    request.open('GET', this.usersAPI, true)
    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      if (request.status >= 200 && request.status < 400) {
        console.log('success')
        let users = {}
        th.counter = data.length
        th.users = data
        console.log(th)

        data.forEach((x) => {
          users[x.id] = x
        })
        th.setUsers(users)
        th.failed = false

        console.log(th.$store)
      } else {
        console.log('error')
        th.counter = 0
        th.failed = true
      }
    }
    request.send()
  }
}
</script>
