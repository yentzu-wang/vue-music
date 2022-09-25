<template>
  <button type="button" @click="click">Press Me!</button>
</template>

<script setup>
const click = () => console.log("This is a global component")
</script>
