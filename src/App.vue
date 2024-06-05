// eslint-disable-next-line to ignore the next line.
<template>
  <v-app>
  <NavBar v-if="!login" />
  <router-view/>
  </v-app>
</template>
<script>
import NavBar from "../src/components/NavBar"
// eslint-disable-line no-use-before-define
export default {
  components: {
    NavBar,
  },
  data () {
    return {
      login: true,
    }
  }
}
</script>

<style scoped>

</style>
