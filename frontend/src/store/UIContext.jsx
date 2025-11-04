import { useState } from "react";
import { createContext } from "react";



export const UIContext = createContext(null);

const UIProvider = ({ children }) => {
      
      
      const [menuOpen, setMenuOpen] = useState(false);

      return(
        <UIContext.Provider value={{ menuOpen, setMenuOpen}}>
            {children}
        </UIContext.Provider>
      )

}


export default UIProvider;