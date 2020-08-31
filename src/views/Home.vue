<template>
  <div class="home">
    <img src="../assets/unnamed-2.png" alt="" />
    <CreateItem />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateItem from "@/components/createItem.vue";

export default {
  name: "Home",
  components: {
    CreateItem,
  },
};
</script>
