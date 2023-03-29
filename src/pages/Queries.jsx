import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { fetchBoards } from "../store/BoardsSlice";
import { fetchUsers } from "../store/UsersSlice";
import { QueryBoard } from '../components';

export const Queries = () => {
    const dispatch = useDispatch();
    const { boards } = useSelector(state => state.boards); 
    const [total, setTotal] = useState(0);

    useEffect(() => {
        dispatch(fetchBoards());
        dispatch(fetchUsers());
    }, [])

    useEffect(() => {
        let count = 0;
        boards.length && boards.map(el => count += el.items.length)
        setTotal(prevState => prevState + count);

        return () => setTotal(0)
    }, [boards])


    return (
        <div className="queries px-4 py-4">
            <h1 className="fs-4">Заявки&ensp;&middot;&ensp;<span className="text-secondary fs-4">{total}</span></h1>

            <div className="queries__wrapper d-flex position-relative">
                {boards?.map(board => (
                    <QueryBoard board={board} key={board.id}/>
                ))}
            </div>
        </div>
    );
};
