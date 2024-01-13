import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { IconButton, InputAdornment, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Sort";

const Search = styled("form")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    "&:hover": {
        backgroundColor: alpha(theme.palette.background.default, 0.85),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 0, 0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 0, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(3)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

type SearchBarProps = {
    isSortedByTop: boolean;
    searchQuery: string;
    handleSort: (sortByTop: boolean) => void;
    handleSearch: (query: string) => void;
};

function SearchBar(props: SearchBarProps) {
    const { isSortedByTop, searchQuery, handleSort, handleSearch } = props;

    const handleChange = (event: React.MouseEvent<HTMLElement>, newIsSortedByTop: boolean | null) => {
        if (newIsSortedByTop !== null) {
            handleSort(newIsSortedByTop);
        }
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const query = data.get("search");
        handleSearch(`${query}`);
    };

    const handleClickClear = () => {
        const searchInput = document.getElementById("search") as HTMLInputElement;
        searchInput.value = "";
        handleSearch("");
    };

    return (
        <Paper>
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: "rgba(0,0,0,0.05)",
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} marginLeft={0} marginRight={2} marginY={1}>
                    <SortIcon sx={{ justifyContent: "center" }} />
                    <ToggleButtonGroup
                        color="primary"
                        exclusive
                        value={isSortedByTop}
                        onChange={handleChange}
                        aria-label="SortBy"
                    >
                        <ToggleButton value={true} sx={{ paddingY: 1 }}>
                            Top
                        </ToggleButton>
                        <ToggleButton value={false} sx={{ paddingY: 1 }}>
                            New
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Search onSubmit={handleSearchSubmit}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        id="search"
                        name="search"
                        placeholder="Search…"
                        defaultValue={searchQuery}
                        inputProps={{
                            "aria-label": "search",
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickClear} size="small">
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Search>
            </Toolbar>
            {searchQuery && (
                <Toolbar sx={{ justifyContent: "flex-start" }}>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                        <Typography variant="inherit" paddingTop={1} paddingBottom={1}>
                            Search results for &quot;{searchQuery}&quot;
                        </Typography>
                        <Button onClick={handleClickClear} size="small">
                            Clear
                        </Button>
                    </Stack>
                </Toolbar>
            )}
        </Paper>
    );
}

export default SearchBar;
