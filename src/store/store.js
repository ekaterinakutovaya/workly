import { configureStore } from "@reduxjs/toolkit";

import BoardsReducer from "./BoardsSlice";
import UsersReducer from "./UsersSlice";

export default configureStore({
    reducer: {
        boards: BoardsReducer,
        users: UsersReducer
    }
});