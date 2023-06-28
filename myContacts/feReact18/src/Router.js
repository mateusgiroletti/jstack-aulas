import { Routes, Route, /* useRoutes */ } from "react-router-dom";

import Home from "./pages/Home";
import NewContact from "./pages/NewContact";
import EditContact from "./pages/EditContact";

export default function Router() {
    /* const routes = useRoutes([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/new",
            element: <NewContact />
        },
        {
            path: "/edit/:id",
            element: <EditContact />
        }
    ]);

    return routes; */


    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
    );
}