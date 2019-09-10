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
                <li v-for="user in users" :userId="user.id" :key="user.id" @click="selectUser(user)">
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
      this.$router.push('/articles/' + user.id)
    },
    setUsers: function (data) {
      this.$store.user_collection = data
    }
  },
  created () {
    let th = this
    let request = new XMLHttpRequest()
    request.open('GET', this.usersAPI, true)
    request.onload = function () {
      let data = JSON.parse(this.response)
      if (request.status >= 200 && request.status < 400) {
        let users = {}
        th.counter = data.length
        th.users = data

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
