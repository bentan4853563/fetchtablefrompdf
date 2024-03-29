import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import Select from "react-select";

import ViewTable from "../components/ViewTable";
import { useNavigate } from "react-router-dom";

export default function CustomizedTable() {
  const navigate = useNavigate();

  const { table } = useSelector((state) => state.table);
  const { metaData } = useSelector((state) => state.table);
  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedTable, setSelectedTable] = useState({});
  const [tableData, setTableData] = useState({});

  const categoryOptions = Object.keys(table).map((category) => ({
    value: category,
    label: category,
  }));

  useEffect(() => {
    if (Object.keys(table).length > 0) {
      setselectedCategory(Object.keys(table)[0]);
      setTableData(table);
    }
  }, [table]);

  useEffect(() => {
    if (tableData && selectedCategory !== null) {
      setSelectedTable(tableData[selectedCategory]);
    }
  }, [tableData, selectedCategory]);

  const handleClickEdit = () => {
    navigate("/tb/edit");
  };

  const handleCategoryChange = (selectedOption) => {
    setselectedCategory(selectedOption.value);
  };

  return (
    <div className="w-full h-full bg-gray-100 px-8 md:px-16 xl:px-24 flex flex-col items-start justify-start">
      <div className="w-full px-8 py-4 my-4 flex justify-between items-center bg-white rounded-lg">
        <span className="text-2xl">Documents</span>
        <button
          onClick={handleClickEdit}
          className="w-32 py-2 bg-indigo-600 text-white border-none focus:outline-none"
        >
          Edit
        </button>
      </div>
      <div className="w-full py-2 flex flex-col items-start bg-white rounded-lg divide-y divide-gray-300">
        <div className="py-2 px-8">
          <span className="text-xl font-bold font-sans">View Document</span>
        </div>
        <div className="w-full px-8 py-4 flex flex-col gap-3">
          {metaData.tobType && (
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium" htmlFor="client">
                Type of TOB
              </label>
              <span className="ml-4">
                {metaData.tobType ? metaData.tobType : "None"}
              </span>
            </div>
          )}
          {metaData.client && (
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium" htmlFor="client">
                Client
              </label>
              <span className="ml-4">
                {metaData.client ? metaData.client : "None"}
              </span>
            </div>
          )}
          {metaData.insurer && (
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium" htmlFor="insurer">
                Insurer
              </label>
              <span className="ml-4">
                {metaData.insurer ? metaData.insurer : "None"}
              </span>
            </div>
          )}

          {metaData.broker && (
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium" htmlFor="broker">
                Broker
              </label>
              <span className="ml-4">
                {metaData.broker ? metaData.broker : "None"}
              </span>
            </div>
          )}

          {metaData.sourceTOB && (
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium" htmlFor="sourceTOB">
                Source TOB
              </label>
              <span className="ml-4">
                {metaData.sourceTOB ? metaData.sourceTOB : "None"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-4 flex items-end gap-8">
        <div className="w-1/2 flex flex-col items-start gap-2">
          <label htmlFor="category" className="font-bold">
            Category
          </label>
          <Select
            id="category"
            options={categoryOptions}
            onChange={handleCategoryChange}
            value={categoryOptions.find(
              (option) => option.value === selectedCategory
            )}
            className="w-full"
          />
        </div>
        {selectedTable && (
          <span className="text-lg bg-white px-4 py-1 rounded-md" disabled>
            {selectedTable["status"]}
          </span>
        )}
      </div>

      {/* Table Group */}
      <div className="w-full flex flex-col gap-4 my-4">
        {selectedTable &&
          Object.keys(selectedTable).map((tableName, index) => {
            if (
              tableName !== "status" &&
              tableName !== "comment" &&
              tableName !== "version" &&
              tableName !== "resultTOB" &&
              tableName !== "check"
            ) {
              let table = Object.values(selectedTable[tableName]);
              return (
                <div
                  key={index}
                  className="w-full p-4 bg-white flex flex-col items-start"
                >
                  <h1 className="text-3xl text-black font-bold m-4">
                    {tableName}
                  </h1>
                  <ViewTable tableData={table} />
                </div>
              );
            }
          })}
      </div>

      <ScrollToTop
        className="scroll-to-top flex fixed focus:outline-none text-black shadow-md shadow-gray-800 justify-center items-center rounded-full"
        smooth
        height={18}
        style={{ zIndex: 999, fontSize: 4 }}
      />
    </div>
  );
}
