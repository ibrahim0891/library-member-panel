import { Outlet } from "react-router-dom"; 
import StickyNavbar from "../ui/Nav";





const Application = () => {
    return (
        <div> 
            <StickyNavbar />
            <Outlet/>
        </div>
    );
}

export default Application;