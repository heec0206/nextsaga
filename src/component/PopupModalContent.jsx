import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import * as ActionTypes from "/src/modules/actionTypes";

const PopupModalContent = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.commonCodes.isPopup);
  const fnClickPopupHide = () => {
    dispatch({
      type: ActionTypes.HIDE_POPUP,
    });
    state.onClickEvt && state.onClickEvt();
  };

  const fnClickCancelEvt = () => {
    dispatch({
      type: ActionTypes.HIDE_POPUP,
    });
    state.onClickCancelEvt();
  }

  const fnClickAgreeEvt = () => {
    dispatch({
      type: ActionTypes.HIDE_POPUP,
    });
    state.onClickAgreeEvt();
  }

  return (
    <>
      {state.isOpen === true && (
        <div className="ui page modals dimmer transition visible active popup-show">
          <div className="ui modal transition visible active login-popup">
            <div className="content">
              {state.contentType === ActionTypes.ALERT_POPUP
                ? state.message
                : state.contentType === ActionTypes.CONFIRM_POPUP &&
                  state.message}
            </div>
            <div className="actions">
              {state.contentType === ActionTypes.CONFIRM_POPUP ? (
                <>
                  <Button className="btn red" onClick={() => fnClickCancelEvt()}>
                    취소
                  </Button>
                  <Button
                    className="btn blue"
                    onClick={() => fnClickAgreeEvt()}
                  >
                    적용
                  </Button>
                </>
              ) : (
                <Button className="btn blue" onClick={() => fnClickPopupHide()}>
                  닫기
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModalContent;
