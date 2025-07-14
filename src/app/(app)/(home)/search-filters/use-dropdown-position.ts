
import { RefObject } from "react";

export const useDropdownPosition = ( 
    ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement> 
) => {
    const getDropdownPosition = () => {
        if (!ref.current) return{top: 0, left: 0};

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth= 240; //width of dropdown (w-60 = 15rem = 240px)

        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // checking if the dropdown wouuld go off the right edge of the viewport
        if (left + dropdownWidth > window.innerWidth) {
            left = rect.right + window.scrollX - dropdownWidth; //alligning to the right edge of the button

            //if still off-screen, aliging to the right edge of the viewport
            if (left < 0) {
                left = window.innerWidth - dropdownWidth - 16; //16 - padding
            }
        }        

        //ensure it doesnt go off the left edge
        if (left < 0) {
            left = 16; //16 - padding
        }

        return {top, left};
        
    }

    

    return { getDropdownPosition };
}