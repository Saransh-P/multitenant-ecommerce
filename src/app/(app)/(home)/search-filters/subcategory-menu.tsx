import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
    category: Category;
    isOpen: boolean;
    position: {top: number, left: number};
}

export const SubcategoryMenu = ({category, isOpen, position}: Props) => {
    if (!isOpen || !category.subcategories || category.subcategories?.length === 0) {
        return
    }

    const backgroundColor = category.color || "#f4f4f0";

    // ORIGINAL CODE (before fix):
    // const { top, left } = position();
    // style={{ top, left }}

    // FIX EXPLANATION: Since position is a function that returns {top, left},
    // we need to call it first: const { top, left } = position();
    // Then use the destructured values in the style object

    return (
        <div
            className="fixed z-100"
            style={{
                top: position.top,
                left: position.left
            }}
        >
            {/* invisible bridge to add hover*/}
            <div className="w-60 h-3 invisible" />

            <div
                style={{backgroundColor}} 
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
            >
                <div>
                    {category.subcategories?.map((subcategory: Category) => (
                        <Link 
                            key={subcategory.id} 
                            href="/"
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
                        >
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        );
}

