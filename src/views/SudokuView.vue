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
import { defineComponent, ref } from "vue";
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
  name: "SudokuView",
  setup() {
    let buttons = ref(
      Array.from({ length: 9 }, (element, index_col) => {
        const dt = {
          val: index_col + 1,
          isTop: true,
          isLeft: index_col % 3 == 0,
          isBottom: true,
          isRight: index_col == 8,
          isActive: () => {
            return index_col + 1 == active_button.value;
          },
        };
        return dt;
      })
    );
    let data = ref(
      Array.from(cells, (element, index_row) => {
        const row = { index: index_row, cols: [] };
        row.cols = Array.from(cells[index_row], (element, index_col) => {
          function isCursor() {
            return (
              !(
                index_row == active_cell.value.row &&
                index_col == active_cell.value.col
              ) &&
              (index_row == active_cell.value.row ||
                index_col == active_cell.value.col ||
                (Math.floor(index_col / 3) ==
                  Math.floor(active_cell.value.col / 3) &&
                  Math.floor(index_row / 3) ==
                    Math.floor(active_cell.value.row / 3)))
            );
          }
          function isSame() {
            return (
              data.value[index_row].cols[index_col].val > 0 &&
              data.value[index_row].cols[index_col].val ==
                data.value[active_cell.value.row].cols[active_cell.value.col]
                  .val
            );
          }
          const dt = {
            //index: index_col,
            col_ind: index_col,
            row_ind: index_row,
            val: element > 0 ? element : null,
            isFixed: element > 0 ? true : false,
            isTop: index_row % 3 == 0,
            isLeft: index_col % 3 == 0,
            isBottom: index_row == 8,
            isRight: index_col == 8,
            isValued: () => {
              if (!data.value[index_row].cols[index_col].isFixed) {
                return data.value[index_row].cols[index_col].val > 0;
              }
              return false;
            },
            isActive: () => {
              return (
                index_row == active_cell.value.row &&
                index_col == active_cell.value.col
              );
            },
            isCursor: () => {
              return isCursor() && !isSame();
            },
            isSame: () => {
              return !isCursor() && isSame();
            },
            isError: () => {
              return isCursor() && isSame();
            },
          };
          return dt;
        });
        return row;
      })
    );
    let active_cell = ref({ row: 0, col: 0 });
    let active_button = ref(0);
    function OnCellClick(event) {
      active_cell.value.row = event.target.attributes.row.value;
      active_cell.value.col = event.target.attributes.col.value;
    }
    function OnButtonClick(event) {
      if (
        !data.value[active_cell.value.row].cols[active_cell.value.col].isFixed
      ) {
        if (
          active_button.value == event.target.attributes.val.value &&
          data.value[active_cell.value.row].cols[active_cell.value.col].val !==
            null
        ) {
          data.value[active_cell.value.row].cols[active_cell.value.col].val =
            null;
        } else {
          active_button.value = event.target.attributes.val.value;
          data.value[active_cell.value.row].cols[active_cell.value.col].val =
            active_button.value;
        }
      }
    }
    return {
      data,
      active_cell,
      OnCellClick,
      buttons,
      active_button,
      OnButtonClick,
    };
  },
});
</script>

<style scoped>
.data-cell {
  margin: 0;
  border: 1px solid;
  width: 50px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
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
