import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function DefaultPagination({ currentPage, totalPages, onPageChange }) {
    const [active, setActive] = React.useState(currentPage || 1);

    const getItemProps = (index) =>
    ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => {
            setActive(index);
            onPageChange(index);
        },
    });

    const next = () => {
        if (active === totalPages) return;
        setActive(active + 1);
        onPageChange(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        onPageChange(active - 1);
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <IconButton key={i} {...getItemProps(i)}>{i}</IconButton>
            );
        }
        return buttons;
    };

    return (
        <div className="flex items-center gap-4 m-auto w-full justify-center">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />  
            </Button>
            <div className="flex items-center gap-2">
                {renderPageButtons()}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === totalPages}
            >
                 
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}