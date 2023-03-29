import React, { useEffect } from 'react';

import { QueryCard, Empty } from "../components";

export const QueryBoard = ({ board }) => {
  const {id, title, items} = board;


  return (
    <div className="queryBoard me-4">
      <div className="queryBoard__header w-100 d-flex justify-content-start align-items-center px-2">
        {title} &ensp;&middot;&ensp;
        <span className="text-secondary">{items.length}</span>
      </div>

      

      <div className="queryBoard__content d-flex flex-column align-items-center py-1">
        {items.length > 0 ? items.map((item, index) => (
          <QueryCard currentBoard={board} currentItem={item} key={item.id} />
        )) : (
            <Empty currentBoard={board} currentItem={{}} />
        )}

      </div>
    </div>
  );
};
