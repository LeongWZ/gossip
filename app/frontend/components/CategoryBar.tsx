import { Category } from "./types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";

type CategoryBarProps = {
    categories: Category[];
    categoryIdFilter: number;
    filterPostsByCategory: (category_id: number) => void;
};

function CategoryBar(props: CategoryBarProps) {
    const { categories, categoryIdFilter, filterPostsByCategory } = props;

    const handleChange = (event: React.MouseEvent<HTMLElement>, newCategoryIdFilter: number | null) => {
        if (newCategoryIdFilter !== null) {
            filterPostsByCategory(newCategoryIdFilter);
        }
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={categoryIdFilter}
            exclusive
            onChange={handleChange}
            aria-label="Category"
            sx={{
                border: 1,
                borderColor: "divider",
                display: "flex",
                flexWrap: "wrap",
                bgcolor: "background.paper",
                borderRadius: 1,
            }}
        >
            <ToggleButton value={0} key={0} sx={{ flexGrow: 1, color: "inherit" }}>
                All
            </ToggleButton>
            {categories.map((category) => (
                <ToggleButton value={category.id} key={category.id} sx={{ flexGrow: 1, color: "inherit" }}>
                    {category.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

export default CategoryBar;
