import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "../routes.ts";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, element}) =>
                <Route key={path} path={path} Component={() => element()}/>
            )}
            <Route path="*" Component={() => <Navigate to={'/'}/>}/>
        </Routes>
    );
};

export default AppRouter;