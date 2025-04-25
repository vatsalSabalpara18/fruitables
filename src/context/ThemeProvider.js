import { createContext, useReducer } from "react";
import { ThemeReducer } from "./reducer/ThemeReducer";
import { TOOGLE_THEME } from "./reducer/ActionType";

const initialState = {
    theme: "light",
}

export const ThemeContext = createContext(initialState);

const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialState)

    const themeToggle = (data) => {
        const newTheme = data === 'light' ? 'dark' : 'light';

        dispatch({ type: TOOGLE_THEME, payload: newTheme })

    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                themeToggle
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

