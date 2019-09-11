<template>
  <div id="articleList">
    <nav>
      <div class="container">
        <span class="logo"></span>
      </div>
    </nav>

    <section id="currentUser">
      <div class="container">
        <router-link to="/">Retour à la liste des auteurs</router-link>
        <h2>{{ this.current_user.name }}</h2>
        <div>
          <span data-type='address'>{{ this.current_user.address }}</span>
          <span data-type='phone'>{{ this.current_user.phone }}</span>
          <span data-type='mail'>{{ this.current_user.email }}</span>
        </div>
      </div>
    </section>
    <section id="articles">
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
          <li v-for="article in articles" :userId="article.userId" :key="article.id">
            <h3>{{ article.title }}</h3>
            <p>{{ article.body }}</p>
          </li>
        </ul>
        <ul v-else>Oops ! Something went wrong !</ul>
      </div>
    </section>
  </div>
</template>

<script>
require('../assets/css/articleList.css')

export default {
  data () {
    return {
      articles: [],
      currentUserId: null,
      current_user: {
        id: null,
        name: null,
        address: null,
        phone: null,
        email: null
      },
      counter: 0,
      failed: false,
      filterState: false,
      articlesAPI: 'https://jsonplaceholder.typicode.com/posts?userId=USER_ID',
      userAPI: 'https://jsonplaceholder.typicode.com/users/USER_ID'
    }
  },
  methods: {
    toggleFilter: function () {
      this.filterState = !(this.filterState)
    },
    callAPIUsers: function () {
      let th = this
      let request = new XMLHttpRequest()
      request.open('GET', this.userAPI.replace('USER_ID', this.$route.params.userId), true)
      request.onload = function () {
        let data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
          th.setCurrentUser(data)
          th.failed = false
        } else {
          th.counter = 0
          th.failed = true
        }
      }
      request.send()
    },
    setCurrentUser: function (user) {
      this.current_user.id = user.id
      this.current_user.name = user.name
      this.current_user.address = user.address.street + ', ' + user.address.suite + ', ' + user.address.zipcode + ', ' + user.address.city
      this.current_user.phone = user.phone
      this.current_user.email = user.email
    }
  },
  created () {
    // If User Collection is not set or if it's a direct navigation without store datas
    if (typeof this.$store.user_collection === 'undefined' || Object.keys(this.$store.user_collection).length === 0) {
      this.callAPIUsers()
    } else { // If User Collection is set
      console.log(this.$store.user_collection[this.$route.params.userId])
      this.setCurrentUser(this.$store.user_collection[this.$route.params.userId])
    }

    let th = this
    let request = new XMLHttpRequest()
    request.open('GET', this.articlesAPI.replace('USER_ID', this.$route.params.userId), true)
    request.onload = function () {
      let data = JSON.parse(this.response)
      if (request.status >= 200 && request.status < 400) {
        th.articles = data
        th.counter = data.length
        th.failed = false
      } else {
        th.counter = 0
        th.failed = true
      }
    }
    request.send()
  }
}

</script>
