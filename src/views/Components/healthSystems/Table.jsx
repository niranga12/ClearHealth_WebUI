import React, { useState, useEffect } from "react";
import "@coreui/coreui/dist/css/coreui.css";
import { CDataTable, CCard, CPagination } from "@coreui/react";

const Table = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [columnFilterValue, setColumnFilterValue] = useState();
  const [tableFilterValue, setTableFilterValue] = useState("");
  const [sorterValue, setSorterValue] = useState();

  const [fetchTrigger, setFetchTrigger] = useState(0);

  const params = {
    page,
    columnFilterValue: JSON.stringify(columnFilterValue),
    tableFilterValue,
    sorterValue: JSON.stringify(sorterValue),
    itemsPerPage
  };

  const query = new URLSearchParams(params).toString();

  useEffect(() => {
    // code sandbox which is used as a backend: https://codesandbox.io/s/coreui-rest-api-407g3
    setLoading(true);
    fetch(`https://407g3.sse.codesandbox.io?${query}`)
      .then(function (data) {
        data.json().then((json) => {
          console.log(json);
          setItems(json.items);
          setPages(json.pages);
          setLoading(false);
        });
      })
      .catch((e) => {
        // wait for code sandbox server to unhibernate
        setTimeout(() => {
          setFetchTrigger(fetchTrigger + 1);
        }, 2000);
      });
  }, [query, fetchTrigger]);

  return (
      <>
     {/* <CCard className="p-5"> */}
      <CDataTable
        items={items}
        fields={["username", "registered", "role", "status"]}
        loading={loading}
        hover
        cleaner
        
        // columnFilter={{ external: false }}
        // columnFilterValue={columnFilterValue}
        onColumnFilterChange={setColumnFilterValue}
        tableFilter={{ external: false }}
        tableFilterValue={tableFilterValue}
        onTableFilterChange={setTableFilterValue}
        sorter
        sorterValue={sorterValue}
        onSorterValueChange={setSorterValue}
        itemsPerPageSelect={{ external: true }}
        itemsPerPage={itemsPerPage}
        onPaginationChange={setItemsPerPage}
      />
      <CPagination
        pages={pages}
        activePage={page}
        onActivePageChange={setPage}
        className={pages < 2 ? "d-none" : ""}
      />
     {/* </CCard> */}
    </>
  );
};

export default Table;