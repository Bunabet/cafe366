import * as React from "react";

/**
 * https://ramonak.io/posts/react-context-api-update-from-nested-component
 */
import { createContext }  from "react";
import { useState } from "react";

const setting = {
  menu_small_is: false,
	swap_menu_small:()=>{},
	swicth_off_menu_small:()=>{}
};

export const ContextMenu = createContext(setting);

export const ProviderMenu = ({children}) => {
	/**
   * WARNING
	 * This variable `open_menu_is` must have the same name in the useState and in the Context
   * */
	const [menu_small_is, set_open] = useState(false);

	const swap_menu_small = () => {
		set_open(!menu_small_is);
		// set_open(menu_small_is === true ? false : true);
	}

	const switch_off_menu_small = () => {
		set_open(false);
	}
 
	const setting = {
		menu_small_is,
		swap_menu_small,
		switch_off_menu_small,
	};

	return(<ContextMenu.Provider value={setting}>{children}</ContextMenu.Provider>)
}