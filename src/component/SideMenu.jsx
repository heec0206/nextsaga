import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CONST from "/src/utils/constant";
import { useDispatch } from "react-redux";
import "react-simple-tree-menu/dist/main.css";
import * as ActionTypes from "/src/modules/actionTypes";

const SideMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const baseClassName = "rstm-tree-item rstm-tree-item-level";
  const [sideMenuArry, setSideMenuArry] = useState([...CONST.SIDE_MENU]);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  const staa = (item, idx) => (
    <li
      key={item.label}
      className={
        baseClassName +
        item.level +
        (item.route ? " hover" : "") +
        //(item.url === router.pathname ? " active" : "") +
        (item.url && 
          (router.asPath.includes(item.url) || item.includeUrl.length > 0 && router.asPath.includes(item.includeUrl))
          ? " active" : "") + (item.hide ? " hide" : "")
      }
      onClick={(e) => fnClickRouteEvt(e, item, idx)}
    >
      <span>{item.label} {JSON.stringify(router.origin  )}</span>
      {item.more && (
        <button
          className={"rstm-toggle-icon" + (item.active ? " active" : "")}
          onClick={(e) => fnClickToggleEvt(e, item, idx)}
        >
          <span></span>
        </button>
      )}
      {item.route && (
        <button
          className="rstm-router"
          onClick={(e) => fnClickNewRouteEvt(e, item)}
        ></button>
      )}
    </li>
  );

  const toggle = (item, type) =>
    item.node.map((item, idx) => {
      type ? ((item.hide = true), (item.active = false)) : (item.hide = false);
      item?.node?.map((item, idx) => {
        type
          ? ((item.hide = true), (item.active = false))
          : (item.hide = false);
        item?.node?.map((item, idx) => {
          type
            ? ((item.hide = true), (item.active = false))
            : (item.hide = false);
        });
      });
    });

  const fnClickToggleEvt = (e, item, idx) => {
    e.stopPropagation();
    item.active = !item.active;
    item.active === true ? toggle(item, true) : toggle(item, false);
    setSideMenuArry([...sideMenuArry]);
  };

  const fnClickRouteEvt = (e, item, idx) => {
    e.stopPropagation();
    if(item.url.includes("/searchRank")){
      dispatch({
        type: ActionTypes.SHOW_POPUP,
        isPopup: {
          isOpen: true,
          //title: "Login",
          contentType: ActionTypes.ALERT_POPUP,
          message: "개발 중입니다.",
        },
      });
    }else{
      item.route && router.push({
        pathname: item.url,
      });
    }
  };

  const fnClickNewRouteEvt = (e, item) => {
    e.stopPropagation();
    //item.url !== "" && window.open(item.url, "_blank");
    window.open(
      item.url,
      "",
      "location=yes, directories=yes, resizable=no, status=yes, toolbar=yes, menubar=yes"
    );
  };

  return (
    <>
      <div className={`sideMenuLayer ${isActive ? "active" : ""}`}>
        <button className="lnb-open" onClick={handleButtonClick}>
          버튼
        </button>
        <ul className="rstm-tree-item-group">
          {sideMenuArry.map((item, idx) => {
            return (
              <div key={item.label}>
                {staa(item, idx)}
                {item?.node?.map((item, idx) => {
                  return (
                    <div key={item.label}>
                      {staa(item, idx)}
                      {item?.node?.map((item, idx) => {
                        return (
                          <div key={item.label}>
                            {staa(item, idx)}
                            {item?.node?.map((item, idx) => {
                              return (
                                <div key={item.label}>{staa(item, idx)}</div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
