import NavigationSteps from "../components/NavigationSteps.tsx";
import {Link, useParams} from "react-router-dom";
import {SECTION_PAGE_ROUTE, TEST_PAGE_ROUTE} from "../utils/consts.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import arrowRight from '../public/img/arrow-right.svg'
import {useEffect} from "react";
import {changeSection, fetchSections, selectSectionById} from "../store/reducers/sectionSlice.ts";
import {changeCourse} from "../store/reducers/courseSlice.ts";

const SectionPage = () => {
    const {id} = useParams<'id'>();
    const dispatch = useAppDispatch();
    const section = useAppSelector((state) => selectSectionById(state, Number(id)));
    useEffect(() => {
        dispatch(fetchSections());
    }, []);

    useEffect(() => {
        dispatch(changeSection(Number(id)));
        dispatch(changeCourse(section?.courseId));
    }, [id]);
    return (
        <div className="main-wrapper flex flex-col gap-12">
            <div className="flex justify-between items-center">
                <NavigationSteps/>
                <p>0 / {section?.steps} шагов пройдено</p>
            </div>
            <div className="section-container flex flex-col gap-7">
                <h1>{section?.name}</h1>
                <div className="section-content">{section?.content}</div>
            </div>
            <Link to={SECTION_PAGE_ROUTE + '/' + id + TEST_PAGE_ROUTE + "/1"} className="self-end text-sm px-4 py-2 rounded border border-black border-opacity-25 flex justify-center items-center gap-2.5">
                Дальше <img src={arrowRight} alt="стрелка" className="size-3"/>
            </Link>
        </div>
    );
};

export default SectionPage;