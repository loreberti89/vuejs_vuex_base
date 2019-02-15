<template>
<div>
  <label>username</label>
  <input v-model="username" />
  <label>password</label>
  <input type="password" v-model="password" />
  <button @click="login(username, password)">click me</button>
</div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      username : "",
      password : ""
    }

  },
  methods:{

    login: function(username, password){
      this.$store.dispatch('login', { username, password })
       .then(() => this.$router.push('/about'))
       .catch(err => console.log(err));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
