<template>
  <div class="deleted">
    <img src="../assets/finished.png" alt="" />
    <FinishItem />
  </div>
</template>

<script>
import FinishItem from "@/components/FinishItem.vue";

export default {
  components: {
    FinishItem,
  },
};
</script>

<style scoped>
img{
    width: 20%;
}
</style>
