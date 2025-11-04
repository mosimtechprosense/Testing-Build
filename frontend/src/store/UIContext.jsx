import { useState } from "react";
import { createContext } from "react";



export const UIContext = createContext(null);

const UIProvider = ({ children }) => {
      const [venuesOpen, setVenuesOpen] = useState(false);
      const [popupOpen, setPopupOpen] = useState(true);

      return(
        <UIContext.Provider value={{venuesOpen, setVenuesOpen, popupOpen, setPopupOpen}}>
            {children}
        </UIContext.Provider>
      )

}


export default UIProvider;