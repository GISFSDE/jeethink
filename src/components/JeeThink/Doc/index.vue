<template>
  <div>
    <svg-icon icon-class="link" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'JeeThinkDoc',
  data() {
    return {
      url: 'http://jeethink.vip/JeeThinkDoc'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>