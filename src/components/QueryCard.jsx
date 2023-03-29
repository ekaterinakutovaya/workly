import React, { useState, useEffect, useRef } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { BsPeople, BsFileEarmarkText } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import { setTargets, addItem, deleteItem } from "../store/BoardsSlice";
import { priorities } from "../constants/constants";

export const QueryCard = ({ currentBoard, currentItem }) => {
  const dispatch = useDispatch();
  const { id, position, department, priorityIndex, peopleCount, docsCount, userId } = currentItem;
  const { users } = useSelector(state => state.users);
  const [userData, setUserData] = useState({});
  const itemRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setUserData(users && users.find(user => user.id == userId));
  }, [users])

  const onDragStart = (e) => {
    let ghost = e.target.cloneNode(true);
    ghost.classList.add('draggable');
    e.dataTransfer.setDragImage(ghost, 200, 100);
    ghost.id = 'ghost';
    document.body.appendChild(ghost);
    itemRef.current.classList.add('dragging');
  }

  const onDrag = (e) => {

  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDragEnd = (e) => {
    document.querySelector('#ghost').remove()
    dispatch(deleteItem({ currentBoard, currentItem }));
    dispatch(addItem({ currentItem }));
    itemRef.current.classList.remove('dragging');
  }

  const onDragEnter = (e) => {
    // e.currentTarget.classList.add('dragover')
    // wrapperRef.current.style.marginTop = "30px";

  }

  const onDragLeave = (e) => {
    // e.currentTarget.classList.remove('dragover')
    // wrapperRef.current.style.marginTop = "14px";
  }

  const onDrop = (e) => {
    let targetBoardId = e.currentTarget.getAttribute('data-boardid')
    let targetItemId = e.currentTarget.getAttribute('data-itemid');

    dispatch(setTargets({ targetBoardId, targetItemId }));
    // e.currentTarget.classList.remove('dragover');
    // wrapperRef.current.style.marginTop = "14px";
  }

  return (
    <>
      <div ref={wrapperRef}
        className="queryCard"
        draggable="true"
        data-itemid={id}
        data-boardid={currentBoard.id}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="queryCard__inner" ref={itemRef} >
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="queryCard_position">{position}</h6>
            <FiMoreVertical role="button" />
          </div>
  
          <div className="queryCard__department text-secondary text-truncate w-75">
            {department}
          </div>
  
          <div className="queryCard__info d-flex py-2">
            <span
              className="queryCard__status"
              style={{
                color: priorities[priorityIndex].color,
                backgroundColor: priorities[priorityIndex].bgColor
              }}
            >
              {priorities[priorityIndex].label}
            </span>
  
            <span className="queryCard__people mx-3 d-flex align-items-center">
              <BsPeople className="queryCard__people-icon me-1" />
              {peopleCount}
            </span>
  
            <span className="queryCard__people d-flex align-items-center">
              <BsFileEarmarkText className="queryCard__people-icon me-1" />
              {docsCount}
            </span>
          </div>
  
          <div className="queryCard__user d-flex align-items-center">
            <div className="queryCard__avatar">
              <img src={userData?.userAvatar} alt="avatar" />
            </div>
  
            <div className="mx-3">
              <div className="queryCard__user-position text-secondary">{userData?.userPosition}</div>
              <div className="queryCard__username">{userData?.userName}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

