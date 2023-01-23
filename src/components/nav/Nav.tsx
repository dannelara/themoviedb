import React, { useRef, useState } from "react";
import "./Styles.css";
import burger_menu_open_image from "assets/images/MenuIcon.png";
import burger_menu_close_image from "assets/images/Union.png";
import sections from "assets/data/sections";

export const Nav: React.FC = ({}) => {
  const [is_nav_active, set_is_nav_active] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    set_is_nav_active(!is_nav_active);
    menuRef.current?.getAttribute("toggle")
      ? menuRef.current?.removeAttribute("toggle")
      : menuRef.current?.setAttribute("toggle", "true");
  };

  return (
    <div className="nav">
      <div className="nav_content">
        <div className="title_wrapper">
          <h1 className="header_title">Movies</h1>
        </div>

        {!is_nav_active && (
          <div
            className="burger_menu"
            // onClick={() => set_is_nav_active(!is_nav_active)}
            onClick={onClick}
          >
            <img src={`${burger_menu_open_image}`} alt="burger_menu_open" />
          </div>
        )}

        <div className="nav_items_big" ref={menuRef}>
          <div className="nav_items_left">
            <div className="nav_links_container">
              <div>
                {sections.map((section, key) => (
                  <div className="nav_link_wrapper" key={key}>
                    <img src={`${section.icon_path}`} alt="link icon" />
                    <a href={`${section.href}`} key={key} className="nav_link">
                      {section.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {is_nav_active && (
            <div className="nav_active_right">
              <div className="burger_menu_active" onClick={onClick}>
                <img
                  src={`${burger_menu_close_image}`}
                  alt="burger_menu_close"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    // <div className="nav_small">
    //   <div className="nav_content">
    //     <div>
    //       <h1 className="header_title">Movies</h1>
    //     </div>
    //     <div>
    //       {!is_nav_active && (
    //         <div
    //           className="burger_menu"
    //           onClick={() => set_is_nav_active(!is_nav_active)}
    //         >
    //           <img src={`${burger_menu_open_image}`} alt="burger_menu_open" />
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {is_nav_active && (
    //     <div className="nav_active_wrapper">
    //       <div className="nav_active_left">
    //         <div className="nav_items_wrapper">
    //           {sections.map((section, key) => (
    //             <div className="nav_link_wrapper">
    //               <img src={`${section.icon_path}`} alt="link icon" />
    //               <a href={`${section.href}`} key={key} className="nav_link">
    //                 {section.name}
    //               </a>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       <div className="nav_active_right">
    //         <div
    //           className="burger_menu_active"
    //           onClick={() => set_is_nav_active(!is_nav_active)}
    //         >
    //           <img src={`${burger_menu_close_image}`} alt="burger_menu_close" />
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};
