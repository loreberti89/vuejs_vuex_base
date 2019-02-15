<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout" >logout</button>
  </div>
</template>
<script>
export default {
  name: 'about',
  created(){
    
  },
  methods:{
    logout: function(){
      this.$store.dispatch('logout')
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err));
    }
  }
}
</script>
</script>
