<template>
  <slot name="item">
    <img :src="imgUrl">
  </slot>
</template>

<script>
export default {
  name:'navbaritem',
  props:['imgUrl'],  
}
</script>

<style>

</style>