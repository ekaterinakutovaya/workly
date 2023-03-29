import { useDispatch } from "react-redux";

import { setTargets, addItem, deleteItem } from "../store/BoardsSlice";

export const Empty = ({ currentBoard, currentItem = {} }) => {
  const dispatch = useDispatch();

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e) => {
    let targetBoardId = e.currentTarget.getAttribute('data-boardid')
    let targetItemId = '';

    dispatch(setTargets({ targetBoardId, targetItemId }));
  }

  const onDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
    dispatch(deleteItem({ currentBoard, currentItem }));
    dispatch(addItem({ currentItem }));
  }

  return (
    <div
      data-boardid={currentBoard.id}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className="empty d-flex flex-column align-items-center text-center"
    >
      <div className="empty__inner">
        <div className="empty__image">
          <img src="assets/add-files.png" alt="add files" />
        </div>

        <button className="btn add-files-btn" type="button">
          <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.5474 23.569C38.1549 25.2372 37.5661 27.0035 36.8792 28.4754C35.0148 32.1061 32.071 34.9518 28.4402 36.8163C24.7114 38.6807 20.2956 39.4657 15.8799 38.4844C5.47834 36.3256 -1.19434 26.1203 0.964468 15.7188C3.12328 5.31724 13.2304 -1.45358 23.632 0.80336C27.3608 1.58838 30.5991 3.45281 33.3466 6.00413C37.9586 10.6161 39.9212 17.2888 38.5474 23.569Z" fill="url(#paint0_linear_1_1858)" />
            <path d="M25.8889 17.9756H21.4732V13.5599C21.4732 12.6767 20.7863 11.8917 19.805 11.8917C18.9218 11.8917 18.1368 12.5786 18.1368 13.5599V17.9756H13.7211C12.8379 17.9756 12.0529 18.6625 12.0529 19.6438C12.0529 20.6251 12.7398 21.312 13.7211 21.312H18.1368V25.7277C18.1368 26.6109 18.8237 27.3959 19.805 27.3959C20.6881 27.3959 21.4732 26.709 21.4732 25.7277V21.312H25.8889C26.7721 21.312 27.5571 20.6251 27.5571 19.6438C27.5571 18.6625 26.7721 17.9756 25.8889 17.9756Z" fill="white" />
            <defs>
              <linearGradient id="paint0_linear_1_1858" x1="0.541243" y1="19.6434" x2="38.9849" y2="19.6434" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7E92B7" />
                <stop offset="1" stopColor="#969EAE" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>

      <p className="pt-2">Если есть подходящие заявки, перетащите их сюда 🤓</p>
    </div>
  );
};
