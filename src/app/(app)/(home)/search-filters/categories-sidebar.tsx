import { CustomCategory } from "../types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useState } from "react";
import { ChevronsLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[]
}

export const CategoriesSidebar = ({open, onOpenChange, data}: Props) => {

    const router = useRouter();

    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

    // if we have parent categories, show those, or else show root categories
    const currentCategory = parentCategories ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        setParentCategories(null);
        setSelectedCategory(null);
        onOpenChange(open);
    }

    const handleCategoryClick = (category: CustomCategory) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategories(category.subcategories as CustomCategory[]);
            setSelectedCategory(category);
        }
        else {
            // This is a leaf category (no subcategory)
            if (parentCategories && selectedCategory) {
                // This is sub-category - navigate to /category/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                // This is main category - navigate to /category
                if (category.slug === "all") {
                    router.push("/");
                } else {
                    router.push(`/${category.slug}`);
                }
            }

            handleOpenChange(false);
        }
    }

    const handleBackClick = () => {
        if (parentCategories) {
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }

    const backgroundColor = selectedCategory?.color || "white";

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>

            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{backgroundColor}}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (
                        <button
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                            onClick={handleBackClick}
                        >
                            <ChevronsLeftIcon className="size-4 mr-2" /> 
                            Back  
                        </button>
                    )}

                    {currentCategory.map((category) => (
                        <button
                            key={category.slug}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className="size-4" />
                            )}
                        </button>
                    ))}

                </ScrollArea>

            </SheetContent>
        </Sheet>
        );
}