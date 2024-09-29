import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setActiveModal, setModalName } from "../store/mainReducer"

const Overlay = (props) => {
    const dispatch = useDispatch();
    const activeModal = useSelector(state => state.main.activeModal);
    function overlayHandler() {
        dispatch(setActiveModal(false));
        dispatch(setModalName(''));
    }

    return (
        <div className={activeModal ? 'overlay overlay_active' : 'overlay'} onClick={overlayHandler}>
            {props.children}
        </div>
    );
}

export default Overlay;

