<template>
  <div class="deleted">
    <img src="../assets/trash.png" alt="" />
    <DeleteItem />
  </div>
</template>

<script>
import DeleteItem from "@/components/DeleteItem.vue";

export default {
  components: {
    DeleteItem,
  },
};
</script>

<style scoped>

</style>
