import {useNavigate, useParams} from "react-router-dom";
import {HOME_ROUTE} from "../utils/consts.ts";

const TestPage = () => {
    const {id} = useParams<'id'>();
    const navigate = useNavigate();
    if (!id) return navigate(HOME_ROUTE);

    return (
        <div>

        </div>
    );
};

export default TestPage;