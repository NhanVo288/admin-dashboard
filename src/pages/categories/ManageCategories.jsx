import * as Icons from "react-icons/tb";
import React, { useState, useEffect } from "react";
import Categories from "../../api/Categories.json";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import Toggler from "../../components/common/Toggler.jsx";
import Divider from "../../components/common/Divider.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Thumbnail from "../../components/common/Thumbnail.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/products/productApi.js";
const ManageCategories = () => {
  const categories = Categories;
  const navigate = useNavigate();
  const [bulkCheck, setBulkCheck] = useState(false);
  const [createCategory, deleteCategory] = useCreateCategoryMutation();
  const { data = [] } = useGetCategoriesQuery();
  const [specificChecks, setSpecificChecks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(5);
  const [tableRow, setTableRow] = useState([
    { value: 2, label: "2" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ]);

  const [fields, setCategories] = useState({
    name: "",
    description: "",
    parentId: 0,
    // status: "",
    // isFeatured: false
  });

  const handleInputChange = (key, value) => {
    setCategories({
      ...fields,
      [key]: value,
    });
  };
  const handleSave = async (field) => {
    try {
      await createCategory(field).unwrap;
    } catch (error) {
      console.error("Error", error);
    }
  };
  const statusOptions = [
    { value: "active", label: "active" },
    { value: "completed", label: "completed" },
    { value: "new", label: "new" },
    { value: "coming soon", label: "coming soon" },
    { value: "inactive", label: "inactive" },
    { value: "out of stock", label: "out of stock" },
    { value: "discontinued", label: "discontinued" },
    { value: "on sale", label: "on sale" },
    { value: "featured", label: "featured" },
    { value: "pending", label: "pending" },
    { value: "archive", label: "archive" },
    { value: "pause", label: "pause" },
  ];

  const parentCategories =
    data?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const selectParentCategory = (selectedOption) => {
    setCategories({
      ...fields,
      parentId: selectedOption.value,
    });
  };

  const selectSelect = (selectedOption) => {
    setCategories({
      ...fields,
      status: selectedOption.value,
    });
  };

  const bulkAction = [
    { value: "delete", label: "Delete" },
    { value: "category", label: "Category" },
    { value: "status", label: "Status" },
  ];

  const bulkActionDropDown = (selectedOption) => {
    console.log(selectedOption);
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleBulkCheckbox = (isCheck) => {
    setBulkCheck(isCheck);
    if (isCheck) {
      const updateChecks = {};
      fields.forEach((category) => {
        updateChecks[category.id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckCategory = (isCheck, id) => {
    setSpecificChecks((prevSpecificChecks) => ({
      ...prevSpecificChecks,
      [id]: isCheck,
    }));
  };

  const showTableRow = (selectedOption) => {
    setSelectedValue(selectedOption.label);
  };

  const handleFeaturedChange = (ischeck) => {
    setCategories({
      ...fields,
      isFeatured: ischeck,
    });
  };

  const actionItems = ["Delete", "edit"];

  const handleActionItemClick = (item, itemID) => {
    var updateItem = item.toLowerCase();
    if (updateItem === "delete") {
      alert(`#${itemID} item delete`);
    } else if (updateItem === "edit") {
      navigate(`/catalog/categories/manage/${itemID}`);
    }
  };

  return (
    <section className="categories">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar_item">
              <h2 className="sub_heading">add category</h2>
              <div className="column">
                {/* <Thumbnail /> */}
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the fields name"
                  label="Name"
                  value={fields.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
              </div>
              <div className="column">
                <Textarea
                  type="text"
                  placeholder="Description"
                  label="Name"
                  value={fields.description}
                  onChange={(value) => handleInputChange("description", value)}
                />
              </div>
              <Divider />
              <div className="column">
              
              </div>
              <div className="column">
                <Dropdown
                  label="Parent Category"
                  placeholder="Select parent"
                  onClick={selectParentCategory}
                  options={parentCategories}
                  selectedValue={fields.parentId}
                />
              </div>
              <div className="column">
                <Toggler
                  label="Is featured?"
                  checked={fields.isFeatured}
                  onChange={handleFeaturedChange}
                />
              </div>
              <Divider />
              <Button label="Discard" className="right outline" />
              <Button onClick={() => handleSave(fields)} label="save" />
            </div>
          </div>
          <div className="content transparent">
            <div className="content_head">
              <Dropdown
                placeholder="Bulk Action"
                className="sm"
                onClick={bulkActionDropDown}
                options={bulkAction}
              />
              <Input
                placeholder="Search Categories..."
                className="sm table_search"
              />
              <div className="btn_parent">
                <Link to="/catalog/category/add" className="sm button">
                  <Icons.TbPlus />
                  <span>Create Categories</span>
                </Link>
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
                      <th className="td_image">Description</th>
                      <th>name</th>
                      <th className="td_action">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((category, key) => {
                      return (
                        <tr key={key}>
                          <td className="td_checkbox">
                            <CheckBox
                              onChange={(isCheck) =>
                                handleCheckCategory(isCheck, category?.id)
                              }
                              isChecked={specificChecks[category?.id] || false}
                            />
                          </td>
                          <td className="td_id">{category?.id}</td>
                          <td className="td_image">
                            <p>{category?.description}</p>
                          </td>
                          <td>
                            <Link to={category?.id}>{category?.name}</Link>
                          </td>
                          <td className="td_action">
                            <TableAction
                              actionItems={actionItems}
                              onActionItemClick={(item) =>
                                handleActionItemClick(item, category?.id)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="content_footer">
              {/* <Dropdown
                className="top show_rows sm"
                placeholder="please select"
                selectedValue={selectedValue}
                onClick={showTableRow}
                options={tableRow}
              /> */}
              {/* <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={onPageChange}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageCategories;
