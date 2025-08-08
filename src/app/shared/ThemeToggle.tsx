import { BiMoon, BiSun } from "react-icons/bi";
import { useDarkMode } from "../hook/useDarkMode";

export const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-xl">
            {darkMode ? <BiSun className="text-yellow-400" /> : <BiMoon className="text-gray-800" />}
        </button>
    )
}