import React, { useContext } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
    Collapse,
} from "@material-tailwind/react";
import { Books, House, List, MagnifyingGlass, SignOut, X } from "@phosphor-icons/react";
import { Link, NavLink } from "react-router-dom";
import Context from "../context";

export default function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const user = useContext(Context);
    console.log(user);
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);


    return (
        <div className=" sticky top-0 z-10 h-max w-full">
            <Navbar className="sticky top-0 z-10 max-w-full px-6 py-3 rounded-none h-max lg:px-10 lg:py-4 shadow-md bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <div className="flex items-center gap-6">
                        <IconButton
                            variant="text"
                            className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <List className="h-6 w-6" weight="bold" />
                            )}
                        </IconButton>
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            Home
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center gap-8">
                        <NavLink to="/search" className={({isActive}) => `flex items-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${isActive ? 'bg-gray-100 text-gray-900' : ''}`}>
                            <MagnifyingGlass className="w-5 h-5" weight="bold" />
                            <span className="font-medium">Search</span>
                        </NavLink>
                        <NavLink to='/reserve' className={({isActive}) => `flex items-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${isActive ? 'bg-gray-100 text-gray-900' : ''}`}>
                            <Books className="w-5 h-5" weight="bold" />
                            <span className="font-medium">My Books</span>
                        </NavLink>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            className="flex items-center gap-2 py-2.5 px-5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                            <SignOut className="w-5 h-5" weight="bold" />
                            <span className="font-medium md:hidden">Logout</span>
                        </button>
                    </div>
                    <Typography className="cursor-pointer py-1.5 font-medium">
                        <Link to={'/userDetails'} className="flex items-center gap-4 hover:opacity-90 transition-opacity">
                            <img
                                src={user.avater}
                                alt="logo"
                                className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded-full shadow-lg hover:scale-105 transition-all duration-300 ring-2 ring-blue-100"
                            />

                            {/* <span className="font-bold text-2xl capitalize text-gray-800"> {user.name} </span> */}
                        </Link>
                    </Typography>
                </div>
                <Collapse open={openNav}>
                    <div className="lg:hidden flex flex-col gap-4 mt-6 mb-2">
                        <Link to="/search" className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 text-gray-700 rounded-lg transition-all duration-200">
                            <MagnifyingGlass className="w-5 h-5" weight="bold" />
                            <span className="font-medium">Search</span>
                        </Link>
                        <Link to='/reserve' className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 text-gray-700 rounded-lg transition-all duration-200">
                            <Books className="w-5 h-5" weight="bold" />
                            <span className="font-medium">My Books</span>
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            className="flex items-center gap-3 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-all duration-200"
                        >
                            <SignOut className="w-5 h-5" weight="bold" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </Collapse>

            </Navbar>
        </div>
    );
}