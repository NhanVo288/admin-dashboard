import * as Icons from "react-icons/tb";
import Customers from "../../api/Customers.json";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import SelectOption from "../../components/common/SelectOption.jsx";
import { useGetUserQuery } from "../../store/user/userApi.js";
import Loader from "../../components/common/Loader.jsx";
import { setPage, setSize } from "../../store/user/user.slice.js";
import { useDispatch, useSelector } from "react-redux";

const ManageCustomer = () => {
  const { page, size } = useSelector((state) => state.user);
  const { data, isLoading } = useGetUserQuery({ page, size });
  const dispatch = useDispatch();
  const customers = data?.data?.content ?? [];
  const totalPages = data?.data?.totalPages ?? 0;
  const [bulkCheck, setBulkCheck] = useState(false);
  const [specificChecks, setSpecificChecks] = useState({});
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(5);
  const [tableRow, setTableRow] = useState([
    { value: 2, label: "2" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ]);

  const customer = Customers;

  const bulkAction = [
    { value: "delete", label: "Delete" },
    { value: "category", label: "Category" },
    { value: "status", label: "Status" },
  ];

  const bulkActionDropDown = (selectedOption) => {
    console.log(selectedOption);
  };

  const onPageChange = (newPage) => {
    dispatch(setPage(newPage-1))
  };

  const handleBulkCheckbox = (isCheck) => {
    setBulkCheck(isCheck);
    if (isCheck) {
      const updateChecks = {};
      customers.forEach((c) => {
        updateChecks[c.id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckCustomer = (isCheck, id) => {
    setSpecificChecks((prevSpecificChecks) => ({
      ...prevSpecificChecks,
      [id]: isCheck,
    }));
  };

  const showTableRow = (selectedOption) => {
    dispatch(setSize((selectedOption.label)));
  };

  const actionItems = ["Delete", "edit"];

  const handleActionItemClick = (item, itemID) => {
    var updateItem = item.toLowerCase();
    if (updateItem === "delete") {
      alert(`#${itemID} item delete`);
    } else if (updateItem === "edit") {
      navigate(`/customers/manage/${itemID}`);
    }
  };
  if (isLoading) return <Loader />;

  return (
    <section className="customer">
      <div className="container">
        <div className="wrapper">
          <div className="content transparent">
            <div className="content_head">
              <Dropdown
                placeholder="Bulk Action"
                className="sm"
                onClick={bulkActionDropDown}
                options={bulkAction}
              />
              <Input
                placeholder="Search Customer..."
                className="sm table_search"
              />
              <div className="btn_parent">
                <Link to="/customers/add" className="sm button">
                  <Icons.TbPlus />
                  <span>Create Customer</span>
                </Link>
                <Button label="Advance Filter" className="sm" />
                <Button label="save" className="sm" />
              </div>
            </div>
            <div className="content_body">
              <div className="table_responsive">
                <table className="separate">
                  <thead>
                    <tr>
                      <th className="td_checkbox">
                        <CheckBox
                          onChange={handleBulkCheckbox}
                          isChecked={bulkCheck}
                        />
                      </th>
                      <th className="td_id">id</th>
                      {/* <th className="td_image">image</th> */}
                      <th colSpan="4">name</th>
                      <th>email</th>
                      <th>orders</th>
                      <th className="td_status">status</th>
                      <th className="td_date">created at</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="td_checkbox">
                          <CheckBox
                            onChange={(isCheck) =>
                              handleCheckCustomer(isCheck, customer.id)
                            }
                            isChecked={specificChecks[customer.id] || false}
                          />
                        </td>

                        <td className="td_id">{customer.id}</td>

                        {/* <td className="td_image">
                          <Icons.TbUser size={18} />
                        </td> */}

                        <td colSpan="4">
                          <Link to={customer.id.toString()}>
                            {customer.fullName || customer.email}
                          </Link>
                        </td>

                        <td>{customer.email}</td>

                        <td>—</td>

                        <td className="td_status">
                          <Badge
                            label={customer.actived ? "ACTIVE" : "LOCKED"}
                            className={
                              customer.actived
                                ? "light-success"
                                : "light-danger"
                            }
                          />
                        </td>

                        <td className="td_date">
                          {customer.createdAt
                            ? new Date(customer.createdAt).toLocaleDateString()
                            : "--"}
                        </td>

                        <td className="td_action">
                          <TableAction
                            actionItems={actionItems}
                            onActionItemClick={(item) =>
                              handleActionItemClick(item, customer.id)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="content_footer">
              <Dropdown
                className="top show_rows sm"
                placeholder="please select"
                selectedValue={size}
                onClick={showTableRow}
                options={tableRow}
              />
              <Pagination
                currentPage={page + 1}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageCustomer;
