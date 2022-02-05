import * as React from "react";

/**
 * https://ramonak.io/posts/react-context-api-update-from-nested-component
 */
import { createContext }  from "react";
import { useState } from "react";

const setting = {
  menu_small_is: false,
	set_open_menu_small: () => {},
};

export const ContextMenu = createContext(setting);

export const ProviderMenu = ({children}) => {
	/**
   * WARNING
   * open_menu_is need to keep the same name as CreateContext
   * */
	 const [menu_small_is, set_open] = useState(false);

	 const set_open_menu_small = () => {
		 set_open(!menu_small_is);
		 // set_open(menu_small_is === true ? false : true);
	 }
 
	 const setting = {
		 menu_small_is,
		 set_open_menu_small,
	 };

	return(<ContextMenu.Provider value={setting}>{children}</ContextMenu.Provider>)
}