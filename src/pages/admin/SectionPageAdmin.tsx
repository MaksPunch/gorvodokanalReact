import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UploadAdapter } from "../../utils/UploadAdapter.ts";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  fetchSections,
  selectSectionById,
  setSectionContent,
  setSectionName,
} from "../../store/reducers/sectionSlice.ts";
import { useParams } from "react-router-dom";
import MyInput from "../../components/MyInput.tsx";
import MySelect from "../../components/MySelect.tsx";
import MyButton from "../../components/MyButton.tsx";
import Pagination from "../../components/Pagination.tsx";
import { fetchTests, selectTests } from "../../store/reducers/testSlice.ts";
import { PlusIcon } from "@heroicons/react/24/outline";
import {setAlertClassName, setAlertContent, setAlertOpen} from "../../store/reducers/alertSlice.ts";

const SectionPageAdmin = () => {
  const { sectionId } = useParams<"sectionId">();
  const dispatch = useAppDispatch();
  const section = useAppSelector((state) =>
    selectSectionById(state, Number(sectionId)),
  );
  const tests = useAppSelector((state) => selectTests(state));
  const { status: sectionStatus } = useAppSelector(
    (state) => state.sectionReducer,
  );
  const { status: testStatus } = useAppSelector((state) => state.testReducer);
  const [name, setName] = useState<string>(section?.name || "");
  const [content, setContent] = useState<string>(section?.content || "");

  useEffect(() => {
    if (sectionStatus === "idle") {
      dispatch(fetchSections());
    }
    if (testStatus === "idle") {
      dispatch(fetchTests());
    }
  }, [sectionId, dispatch, sectionStatus, testStatus]);

  useEffect(() => {
    if (section) {
      setName(section.name);
      setContent(section.content);
    }
  }, [section]);

  function saveSection() {
    dispatch(
      setSectionContent({
        sectionId: Number(sectionId),
        content,
      }),
    );

    dispatch(
      setSectionName({
        sectionId: Number(sectionId),
        name,
      }),
    );

    dispatch(setAlertOpen());
    dispatch(setAlertContent('Успешно сохранено'))
    dispatch(setAlertClassName('bg-green-500 text-white'))
  }

  return (
    <div className="main-wrapper flex flex-col gap-7 pb-16">
      <h1>Редактирование темы</h1>
      <MyInput
        name={"name"}
        type={"text"}
        label={"Название темы"}
        value={name}
        onChangeHandle={(e) => setName(e.target.value)}
      />
      <MySelect label={"Выбрать тест"} name={"test"} items={tests} />
      <div className="CKEditor">
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(_event, editor) => {
            setContent(editor.getData());
          }}
          onReady={(newEditor) => {
            newEditor.plugins.get("FileRepository").createUploadAdapter =
              function (loader) {
                return new UploadAdapter(loader);
              };
            newEditor.setData(content);
            console.log("Editor1 is ready to use!", newEditor);
          }}
        />
      </div>
      <div className="flex justify-between items-center gap-3 max-sm:flex-wrap">
        <div className="flex gap-2 items-end">
          <Pagination />
          <button className="rounded border border-black border-opacity-25 px-1 py-1.5 shadow">
            <PlusIcon className="size-6" />
          </button>
        </div>
        <div className="flex gap-7 items-center">
          <MyButton className="text-sm" onClick={() => saveSection()}>
            Сохранить
          </MyButton>
          <button className="bg-red-600 px-5 py-2 text-sm text-white rounded hover:bg-red-700 transition-colors">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionPageAdmin;
