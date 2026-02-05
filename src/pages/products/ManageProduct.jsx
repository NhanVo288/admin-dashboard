import * as Icons from "react-icons/tb";
import Products from "../../api/Products.json";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Offcanvas from "../../components/common/Offcanvas.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import RangeSlider from "../../components/common/RangeSlider.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/common/Loader.jsx";
import {
  useGetProductsQuery,
  useSearchProductsQuery,
  useDeleteProductMutation,
} from "../../store/products/productApi.js";
import { setPage,setSize } from "../../store/products/product.slice.js";

const ManageProduct = () => {
  const [fields, setFields] = useState({
    name: "",
    sku: "",
    store: "",
    status: "",
    priceRange: [0, 100],
  });
  const { page, size } = useSelector((state) => state.product);
  const { data, isLoading } = useGetProductsQuery({ page, size });
  const products = data?.content || [];
  const totalPages = data?.totalPages || 0;

  const dispatch = useDispatch();
  const [bulkCheck, setBulkCheck] = useState(false);
  const [specificChecks, setSpecificChecks] = useState({});
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedValue, setSelectedValue] = useState(5);
  const [tableRow, setTableRow] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { data: searchResults } = useSearchProductsQuery(
    { query: searchTerm },
    { skip: !showResults },
  );

  const tableRowOptions = [
    { value: 2, label: "2" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ];
  const handleInputChange = (key, value) => {
    setFields({
      ...product,
      [key]: value,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(searchTerm.trim().length > 0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const onPageChange = (newPage) => {
    dispatch(setPage(newPage-1))
  };

  const handleBulkCheckbox = (isCheck) => {
    setBulkCheck(isCheck);
    if (isCheck) {
      const updateChecks = {};
      products.forEach((product) => {
        updateChecks[product.id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckProduct = (isCheck, id) => {
    setSpecificChecks((prevSpecificChecks) => ({
      ...prevSpecificChecks,
      [id]: isCheck,
    }));
  };

  const showTableRow = (selectedOption) => {
    dispatch(setSize((selectedOption.value)));
  };

  const actionItems = ["Delete", "edit"];

  const handleActionItemClick = (item, itemID) => {
    var updateItem = item.toLowerCase();
    if (updateItem === "delete") {
      alert(`#${itemID} item delete`);
    } else if (updateItem === "edit") {
      navigate(`/catalog/product/manage/${itemID}`);
    }
  };

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const handleToggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const handleSliderChange = (newValues) => {
    setFields({
      ...fields,
      priceRange: newValues,
    });
  };

  const stores = [
    { label: "FashionFiesta" },
    { label: "TechTreasures" },
    { label: "GadgetGrove" },
    { label: "HomeHarbor" },
    { label: "HealthHaven" },
    { label: "BeautyBoutique" },
    { label: "Bookworm's Haven" },
    { label: "PetParadise" },
    { label: "FoodieFinds" },
  ];
  const status = [
    { label: "In Stock" },
    { label: "Out of Stock" },
    { label: "Available Soon" },
    { label: "Backorder" },
    { label: "Refurbished" },
    { label: "On Sale" },
    { label: "Limited Stock" },
    { label: "Discontinued" },
    { label: "Coming Soon" },
    { label: "New Arrival" },
    { label: "Preorder" },
  ];
  const handleSelectStore = (selectedValues) => {
    setFields({
      ...fields,
      store: selectedValues,
    });
  };

  const handleSelectStatus = (selectedValues) => {
    setFields({
      ...fields,
      status: selectedValues.label,
    });
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <section className="products">
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
                <Button
                  label="Advance Filter"
                  className="sm"
                  icon={<Icons.TbFilter />}
                  onClick={handleToggleOffcanvas}
                />
                <Input
                  placeholder="Search Product..."
                  className="sm table_search"
                  value={searchTerm}
                  onChange={(value) => setSearchTerm(value)}
                />
                <Offcanvas
                  isOpen={isOffcanvasOpen}
                  onClose={handleCloseOffcanvas}
                >
                  <div className="offcanvas-head">
                    <h2>Advance Search</h2>
                  </div>
                  <div className="offcanvas-body">
                    <div className="column">
                      <Input
                        type="text"
                        placeholder="Enter the product name"
                        label="Name"
                        value={fields.name}
                        onChange={(value) => handleInputChange("name", value)}
                      />
                    </div>
                    <div className="column">
                      <Input
                        type="text"
                        label="Price"
                        value={fields.price}
                        placeholder="Enter the product price"
                        onChange={(value) => handleInputChange("price", value)}
                      />
                    </div>
                    <div className="column">
                      <MultiSelect
                        options={stores}
                        placeholder="Select Store"
                        label="Store"
                        isSelected={fields.store}
                        onChange={handleSelectStore}
                      />
                    </div>
                    <div className="column">
                      <Dropdown
                        options={status}
                        placeholder="Select Store"
                        label="Store"
                        selectedValue={fields.status}
                        onClick={handleSelectStatus}
                      />
                    </div>
                    <div className="column">
                      <RangeSlider
                        label="Price range"
                        values={fields.priceRange}
                        onValuesChange={handleSliderChange}
                      />
                    </div>
                  </div>
                  <div className="offcanvas-footer">
                    <Button
                      label="Discard"
                      className="sm outline"
                      icon={<Icons.TbX />}
                      onClick={handleCloseOffcanvas}
                    />
                    <Button
                      label="Filter"
                      className="sm"
                      icon={<Icons.TbFilter />}
                      onClick={handleCloseOffcanvas}
                    />
                  </div>
                </Offcanvas>
                <div className="btn_parent">
                  <Link to="/catalog/product/add" className="sm button">
                    <Icons.TbPlus />
                    <span>Create Product</span>
                  </Link>
                  <Button
                    label="Reload"
                    icon={<Icons.TbRefresh />}
                    className="sm"
                  />
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

                        <th className="td_id">ID</th>

                        <th className="td_image">Image</th>

                        <th colSpan="4">Name</th>

                        <th>Price</th>

                        <th>Brand</th>

                        <th>Category</th>

                        <th className="td_status">Status</th>

                        <th className="td_action">#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const thumbnail =
                          product.images?.find((img) => img.isPrimary)
                            ?.imageUrl ||
                          product.images?.[0]?.imageUrl ||
                          "/no-image.png";

                        return (
                          <tr key={product.id}>
                            <td className="td_checkbox">
                              <CheckBox
                                onChange={(isCheck) =>
                                  handleCheckProduct(isCheck, product.id)
                                }
                                isChecked={specificChecks[product.id] || false}
                              />
                            </td>

                            <td className="td_id">{product.id}</td>

                            <td className="td_image">
                              <img src={thumbnail} alt={product.name} />
                            </td>

                            <td colSpan="4">
                              <Link to={String(product.id)}>
                                {product.name}
                              </Link>
                            </td>

                            <td>
                              {product.price.toLocaleString()} <b>VND</b>
                            </td>

                            <td>
                              <Link>{product.brand}</Link>
                            </td>
                             <td className="td_id">{product.categoryName}</td>   
                            <td className="td_status">
                              {product.isActive ? (
                                <Badge
                                  label="Active"
                                  className="light-success"
                                />
                              ) : (
                                <Badge
                                  label="Inactive"
                                  className="light-danger"
                                />
                              )}
                            </td>

                            <td className="td_action">
                              <TableAction
                                actionItems={actionItems}
                                onActionItemClick={(item) =>
                                  handleActionItemClick(item, product.id)
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
                <Dropdown
                  className="top show_rows sm"
                  placeholder="please select"
                  selectedValue={size}
                  onClick={showTableRow}
                  options={tableRowOptions}
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
    </>
  );
};

export default ManageProduct;
