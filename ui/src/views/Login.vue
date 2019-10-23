<template>
  <div class="login">
    <LoginForm/>
  </div>
</template>

<script>

  import LoginForm from '@/components/Login.vue'

  export default {
    name: 'Login',
    components: {
      LoginForm
    }
  }
</script>
