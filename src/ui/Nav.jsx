import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
    Collapse,
} from "@material-tailwind/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/reserve'}>
                    My books
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Account
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Blocks
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Docs
                </a>
            </Typography>
        </ul>
    );

    return (
        <div className=" max-h-[768px] sticky top-0 z-10 h-max w-full">
            <Navbar className="sticky top-0 z-10 max-w-full px-4 py-2 rounded-none h-max lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to="/">
                        <Typography
                            className="mr-4 cursor-pointer py-1.5 font-medium"
                        >
                            <img src="https://img.freepik.com/free-vector/gradient-blue-futuristic-technology-background_53876-137746.jpg?w=2000" alt="logo" className="w-10 h-10 rounded-full" />
                        </Typography>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/search" className='py-3'><MagnifyingGlass></MagnifyingGlass></Link>

                        <div className="hidden mr-4 lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <Button
                                variant="text"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Log In</span>
                            </Button>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Sign in</span>
                            </Button>
                        </div>
                        <IconButton
                            variant="text"
                            className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm" className="">
                            <span>Log In</span>
                        </Button>
                        <Button fullWidth variant="gradient" size="sm" className="">
                            <span>Sign in</span>
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
        </div>
    );
}