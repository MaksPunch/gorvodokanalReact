import NavigationSteps from "../components/NavigationSteps.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {HOME_ROUTE, SECTION_PAGE_ROUTE, TEST_PAGE_ROUTE} from "../utils/consts.ts";
import {useAppSelector} from "../hooks/redux.ts";
import arrowRight from '../public/arrow-right.svg'
import {useEffect, useState} from "react";
import {ISection} from "../utils/types.ts";

const SectionPage = () => {
    const {id} = useParams<'id'>();
    const [section, setSection] = useState<ISection>({name: '', id: 1, content: "", steps: 4, testId: 1})
    const navigate = useNavigate()
    const sections = useAppSelector(state => state.sectionReducer);
    useEffect(() => {
        if (!id) return navigate(HOME_ROUTE)
        const sectionFound = sections.find(el => el.id === Number(id))
        if (!sectionFound) return navigate('not_found');
        setSection(sectionFound);
    }, []);
    return (
        <div className="main-wrapper flex flex-col gap-12">
            <div className="flex justify-between items-center">
                <NavigationSteps/>
                <p>0/{section.steps} шагов пройдено</p>
            </div>
            <div className="section-container flex flex-col gap-7">
                <h1>{section.name}</h1>
                <div className="section-content">{section.content}</div>
            </div>
            <Link to={SECTION_PAGE_ROUTE + '/' + id + TEST_PAGE_ROUTE + "/1"} className="self-end text-sm px-4 py-2 rounded border border-black border-opacity-25 flex justify-center items-center gap-2.5">
                Дальше <img src={arrowRight} alt="стрелка" className="size-3"/>
            </Link>
        </div>
    );
};

export default SectionPage;