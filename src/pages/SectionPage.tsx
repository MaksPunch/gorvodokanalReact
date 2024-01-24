import NavigationSteps from "../components/NavigationSteps.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {HOME_ROUTE} from "../utils/consts.ts";
import {useAppSelector} from "../hooks/redux.ts";
import arrowRight from '../public/arrow-right.svg'

const SectionPage = () => {
    const {id} = useParams<'id'>();
    const navigate = useNavigate()
    const sections = useAppSelector(state => state.sectionReducer);
    if (!id) return navigate(HOME_ROUTE)
    const section = sections.find(el => el.id === Number(id));
    if (!section) return navigate('not_found');
    return (
        <div className="main-wrapper flex flex-col gap-12">
            <div className="flex justify-between items-center">
                <NavigationSteps/>
                <p className="">0/{section.steps} шагов пройдено</p>
            </div>
            <div className="section-container flex flex-col gap-7">
                <h1>{section.name}</h1>
                <div className="section-content">{section.content}</div>
            </div>
            <button className="self-end text-sm px-4 py-2 rounded border border-black border-opacity-25 flex justify-center items-center gap-2.5">
                Дальше <img src={arrowRight} alt="стрелка" className="size-3"/>
            </button>
        </div>
    );
};

export default SectionPage;