import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../constants/constants";
import {db} from "../constants/db";

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async () => {
    // const response = await fetch(API_URL + `/boards`);
    // const data = await response.json();
    // return data;

    return db.boards;
  }
);

export const addItem = createAsyncThunk(
  "boards/addItem",
  async ({ currentItem }) => {

    // ...

    return currentItem;
  }
)

export const deleteItem = createAsyncThunk(
  "boards/deleteItem",
  async ({ currentBoard, currentItem }) => {
    const boardId = currentBoard.id;
    const itemId = currentItem.id;

    // ...

    return { boardId, itemId };
  }
)


const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    targets: [],
    loading: false
  },
  reducers: {
    setTargets: (state, action) => {
      state.targets = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.loading = false;
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.loading = false;
      state.boards = [];
    });

    builder.addCase(deleteItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.loading = false;
      let currentBoardIndex = state.boards.findIndex(
        board => board.id === action.payload.boardId
      );
      state.boards[currentBoardIndex].items = state.boards[currentBoardIndex].items.filter(item => item.id != action.payload.itemId);
    });
    builder.addCase(deleteItem.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.loading = false;
      let targetBoardIndex = state.boards.findIndex(
        board => board.id == state.targets.targetBoardId
      );

      let targetItemIndex = state.boards[targetBoardIndex].items.findIndex(
        item => item.id == state.targets.targetItemId
      )

      state.boards[targetBoardIndex].items.splice(targetItemIndex, 0, action.payload)

    });
    builder.addCase(addItem.rejected, (state, action) => {
      state.loading = false;
    });
  }
})

export const { setTargets } = boardsSlice.actions;
export default boardsSlice.reducer;