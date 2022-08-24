import { defineStore } from "pinia";
import { ref } from "vue";
export const useSudokuStore = defineStore("sudoku", () => {
  const active_cell = ref({ row: 0, col: 0 });
  const active_button = ref(0);
  const data = ref([]);
  const buttons = ref(
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
  function setCells(cells) {
    data.value = Array.from(cells, (element, index_row) => {
      const row = { index: index_row, cols: [] };
      row.cols = Array.from(cells[index_row], (element, index_col) => {
        function isActive() {
          return (
            index_row == active_cell.value.row &&
            index_col == active_cell.value.col
          );
        }
        function isCursor() {
          return (
            !isActive() &&
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
              data.value[active_cell.value.row].cols[active_cell.value.col].val
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
          isActive: isActive,
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
    });
  }
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
    buttons,
    setCells,
    OnCellClick,
    OnButtonClick,
  };
});
