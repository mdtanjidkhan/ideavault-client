'use client';

import { useTheme } from "next-themes";
import {sun, Moon, Sun} from "@gravity-ui/icons";
import {Switch} from "@heroui/react";


const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();



    // <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    return (
        <Switch className={''} onChange={()=> setTheme(theme==="dark"? "light": "dark")}>
      {({isSelected}) => (
        <>
          <Switch.Control
            className={`h-[31px] w-[51px] bg-blue-500 ${isSelected ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
          >
            <Switch.Thumb
              className={`size-[27px] bg-white shadow-sm ${isSelected ? "ms-[22px] shadow-lg" : ""}`}
            >
              <Switch.Icon>
                {isSelected ? (
                  <Sun className="size-2 text-cyan-600" />
                ) : (
                  <Moon className="size-2 text-blue-600" />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </>
      )}
    </Switch>
    );
};

export default ThemeToggle;