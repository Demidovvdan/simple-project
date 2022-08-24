<template>
  <div>
    <div
      style="
        margin: 0px 0px 0px 0px;
        padding: 1px 1px 1px 1px;
        border: 1px solid;
        display: inline-block;
      "
    >
      <tr v-for="row in data" :key="row.index">
        <td
          v-for="col in row.cols"
          :key="[col.row_ind, col.col_ind]"
          :row="col.row_ind"
          :col="col.col_ind"
          @click="OnCellClick"
          class="data-cell"
          :class="{
            'dc-top': col.isTop,
            'dc-left': col.isLeft,
            'dc-bottom': col.isBottom,
            'dc-right': col.isRight,
            'dc-active_cell': col.isActive(),
            'dc-valued': col.isValued(),
            'dc-fixed': col.isFixed,
            'dc-cursor': col.isCursor(),
            'dc-same': col.isSame(),
            'dc-error': col.isError(),
          }"
        >
          {{ col.val }}
        </td>
      </tr>
    </div>
    <div>
      <div
        class="buttons"
        style="
          margin: 0px 0px 0px 0px;
          padding: 1px 1px 1px 1px;
          border: 1px solid;
          display: inline-block;
        "
      >
        <tr>
          <td
            v-for="button in buttons"
            :key="button.val"
            class="data-cell"
            :val="button.val"
            @click="OnButtonClick"
            :class="{
              'dc-top': button.isTop,
              'dc-left': button.isLeft,
              'dc-bottom': button.isBottom,
              'dc-right': button.isRight,
              'dc-active_button': button.isActive(),
            }"
          >
            {{ button.val }}
          </td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useSudokuStore } from "../stores/sudoku";
const cells = [
  "004710000",
  "072806500",
  "000005007",
  "010690200",
  "390050000",
  "000000085",
  "001230804",
  "003504002",
  "240900000",
];
export default defineComponent({
  name: "SudokuView2",
  setup() {
    const store = useSudokuStore();
    store.setCells(cells);
    return {
      data: store.data,
      // active_cell,
      OnCellClick: store.OnCellClick,
      buttons: store.buttons,
      // active_button,
      OnButtonClick: store.OnButtonClick,
    };
  },
});
</script>

<style scoped>
.data-cell {
  margin: 0;
  border: 1px solid;
  width: 45px;
  height: 45px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  font-size: 1.5rem;
}
.dc-top {
  border-top: 2px solid;
}
.dc-fixed {
  font-weight: bold;
}
.dc-valued {
  font-weight: normal;
}
.dc-left {
  border-left: 2px solid;
}
.dc-error {
  background-color: rgb(229, 151, 197);
  color: white;
}
.dc-bottom {
  border-bottom: 2px solid;
}
.dc-right {
  border-right: 2px solid;
}
.dc-active_cell {
  background-color: rgb(163, 163, 206);
  border-color: black;
  color: white;
}
.dc-active_button {
  background-color: rgb(163, 163, 206);
  border-color: black;
  color: white;
}
.dc-cursor {
  background-color: rgb(211, 211, 233);
  border-color: black;
}
.dc-same {
  background-color: rgb(163, 163, 206);
  border-color: black;
}
.buttons {
  margin-top: 1rem;
}
</style>
