<template>
  <div>
    <div class="card-body">
      <div class="row">
        <div
          class="col col-7  d-flex justify-content-center align-items-center"
        >
          <p
            class="marg-bottom lead text-center"
            :class="{ finishTaskClass: item.completed }"
            v-if="forEdit !== index"
          >
            {{ item.textTodo }}
          </p>
          <input
            type="text"
            class="form-control w-4 col-lg-6"
            v-model="textEdited"
            v-else-if="forEdit == index"
            @click.prevent="forEnable"
            :class="{ 'border-danger': error }"
            :placeholder="item.textTodo"
          />
        </div>
        <div class="col col-5">
          <div
            class="btn btn-primary mr-2 ml-2 mb-1"
            v-if="item.showButton"
            :disabled="validated == 1"
            :class="{ disabled: disableClass }"
            @click.prevent="done(textEdited, item)"
          >
            <i class="fas fa-check-square"></i>
          </div>
          <div
            class="btn btn-danger mr-2 ml-2 mb-1"
            v-if="item.showButton"
            @click.prevent="close(item)"
          >
            <i class="fas fa-window-close text-white"></i>
          </div>

          <div
            class="btn btn-primary mr-2 ml-2 mb-1"
            @click.prevent="editText(item, index)"
            :disabled="isEdit == true"
            :class="{ disabled: isEdit }"
            v-if="item.showEditButton"
          >
            <i class="fas fa-edit"></i>
          </div>
          <div
            class="btn btn-danger mr-2 ml-2 mb-1"
            @click.prevent="removeTaskStoreFunction({item, index})"
            v-if="item.showTrashButton"
          >
            <i class="fas fa-trash"></i>
          </div>
          <div
            class="btn btn-success mr-2 ml-2 mb-1"
            @click.prevent="finishTaskStoreFunction({item, index})"
            :disabled="item.doneTask"
            :class="{ disabled: item.doneTask }"
            v-if="!item.doneTask"
          >
            finish
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "text",
    "item",
    "index",
    "forEdit",
    "validated",
    "disableClass",
    "lineFinishClass",
    "error",
    "isEdit",
    "editText",
    "forEnable",
    "close",
    "done",
    "removeTaskStoreFunction",
    "finishTaskStoreFunction"
  ],
  data() {
    return {
      textEdited: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
.finishTaskClass {
  text-decoration: line-through;
}
</style>
