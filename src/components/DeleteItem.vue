<template>
  <div>
    <transition-group name="bounce" tag="ul">
      <div
        class="card wid-85 m-auto bg-light "
        v-for="(item, index) in DeletedTodos"
        :key="item.id"
        style="animation-duration: 0.5s"
      >
        <div class="card-body">
          <div class="row">
            <div
              class="col col-7  d-flex justify-content-center align-items-center"
            >
              <p class="marg-bottom lead text-center">
                {{ item.textTodo }}
              </p>
            </div>

            <div class="col col-5">
              <div
                class="btn btn-danger mr-2 ml-2 mb-1"
                @click.prevent="DeletdeletedItemlocalFuction(index)"
              >
                <i class="fas fa-trash"></i>
              </div>
              <div
                class="btn btn-success mr-2 ml-2 mb-1"
                @click.prevent="undeleteTaskStoreFunction({ item, index })"
              >
                un-delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["DeletedTodos"]),
  },
  created() {
    this.$store.dispatch("getDeletedListLocal");
  },
  methods: {
    undeleteTaskStoreFunction(item, index) {
      this.$store.dispatch("undeleteTaskStore", { item, index });
    },
    DeletdeletedItemlocalFuction(index) {
      this.$store.dispatch("DeletdeletedItemlocal", index);
    },
  },
};
</script>

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
.hello {
  overflow: hidden;
}
.w-10 {
  width: 100%;
  display: block;
}
.w-8 {
  width: 80%;
  display: inline-block !important;
  margin-right: 10px;
}
.wid-85 {
  width: 85%;
  margin-bottom: 10px !important;
}
.marg-bottom {
  margin-bottom: 0px;
  margin-top: 0px;
}
.w-4 {
  width: 40%;
}

@media (min-width: 300px) and (max-width: 575.98px) {
  .container {
    padding-right: 3px !important;
    padding-left: 3px !important;
  }
  .w-8 {
    width: 74% !important;
  }
  .wid-85 {
    width: 95% !important;
  }
  .w-4 {
    width: 100% !important;
  }
}
@media (min-width: 576px) and (max-width: 767.98px) {
}
@media (min-width: 768px) and (max-width: 991.98px) {
  .w-8 {
    width: 90% !important;
  }
  .wid-85 {
    width: 100% !important;
  }
}
@media (min-width: 992px) and (max-width: 1199.98px) {
}
</style>
