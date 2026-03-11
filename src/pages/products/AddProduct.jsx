import * as Icons from "react-icons/tb";
import React, { useState } from "react";
import Categories from "../../api/Categories.json";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import FileUpload from "../../components/common/FileUpload.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";
import { useCreateProductMutation, useGetCategoriesQuery } from "../../store/products/productApi.js";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data } = useGetCategoriesQuery()
 
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: null,
    brand: "",
    model: "",
    isActive: true,
    images: [], // [{ imageUrl, isPrimary, displayOrder }]
    specs: [],  // [{ specKey, specValue }]
  });

  
  const [newSpec, setNewSpec] = useState({ key: "", value: "" });

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

 
  const addSpec = () => {
    if (newSpec.key && newSpec.value) {
      setProduct({
        ...product,
        specs: [...product.specs, { specKey: newSpec.key, specValue: newSpec.value }],
      });
      setNewSpec({ key: "", value: "" });
    }
  };

  const removeSpec = (index) => {
    const updatedSpecs = product.specs.filter((_, i) => i !== index);
    setProduct({ ...product, specs: updatedSpecs });
  };

  const onSubmit = async () => {
    try {
      const payload = {
        ...product,
        price: Number(product.price),
        categoryId: Number(product.categoryId),
      };

      console.log("SUBMITTING PAYLOAD >>>", payload);
      await createProduct(payload).unwrap();
      navigate("/catalog/product/manage");
    } catch (err) {
      console.error("Create product failed:", err);
    }
  };

  const isDisabled = !product.name || !product.price || !product.categoryId || product.images.length === 0;

  const categoryOptions = data?.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            {/* THÔNG TIN CƠ BẢN */}
            <div className="content_item">
              <h2 className="sub_heading">Product Info</h2>
              <div className="column">
                <Input
                  label="Product Name"
                  placeholder="e.g iPhone 17"
                  value={product.name}
                  onChange={(val) => handleInputChange("name", val)}
                />
              </div>
              <div className="column">
                <Textarea
                  label="Description"
                  placeholder="Latest Apple phone..."
                  value={product.description}
                  onChange={(val) => handleInputChange("description", val)}
                />
              </div>
              <div className="column_2">
                <Input
                  label="Brand"
                  placeholder="Apple"
                  value={product.brand}
                  onChange={(val) => handleInputChange("brand", val)}
                />
              </div>
              <div className="column_2">
                <Input
                  label="Model"
                  placeholder="A17 Pro"
                  value={product.model}
                  onChange={(val) => handleInputChange("model", val)}
                />
              </div>
            </div>

            {/* HÌNH ẢNH */}
            <div className="content_item">
              <h2 className="sub_heading">Images</h2>
              <FileUpload
                onChange={(file) => {
                  setProduct((prev) => ({
                    ...prev,
                    images: file ? [{ imageUrl: file.base64, isPrimary: true, displayOrder: 1 }] : [],
                  }))
                }}
              />
            </div>

            {/* THÔNG SỐ KỸ THUẬT (SPECS) */}
            <div className="content_item">
              <h2 className="sub_heading">Specifications</h2>
              <div className="column_3">
                <Input 
                  placeholder="Key (e.g RAM)" 
                  value={newSpec.key} 
                  onChange={(v) => setNewSpec({...newSpec, key: v})} 
                />
              </div>
              <div className="column_3">
                <Input 
                  placeholder="Value (e.g 8GB)" 
                  value={newSpec.value} 
                  onChange={(v) => setNewSpec({...newSpec, value: v})} 
                />
              </div>
              <div className="column_3">
                <Button label="Add Spec" icon={<Icons.TbPlus />} onClick={addSpec} className="sm" />
              </div>

              {product.specs.length > 0 && (
                <table className="bordered" style={{ marginTop: "15px" }}>
                  <thead>
                    <tr>
                      <th>Spec Key</th>
                      <th>Spec Value</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={i}>
                        <td>{s.specKey}</td>
                        <td>{s.specValue}</td>
                        <td>
                          <Icons.TbTrash 
                            style={{ cursor: "pointer", color: "red" }} 
                            onClick={() => removeSpec(i)} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="sidebar">
            <div className="sidebar_item">
              <h2 className="sub_heading">Publish</h2>
              <div className="column">
                <Input
                  type="number"
                  label="Price"
                  icon={<Icons.TbCoin />}
                  value={product.price}
                  onChange={(val) => handleInputChange("price", val)}
                />
              </div>
              <Button
                label="Create Product"
                icon={<Icons.TbCircleCheck />}
                onClick={onSubmit}
                className="success"
                disabled={isDisabled || isLoading}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </div>

            <div className="sidebar_item">
              <h2 className="sub_heading">Category</h2>
              <MultiSelect
                placeholder="Select Category"
                options={categoryOptions}
                value={product.categoryId}
                onChange={(id) => handleInputChange("categoryId", id)}
              />
            </div>

            <div className="sidebar_item">
              <h2 className="sub_heading">Status</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input 
                  type="checkbox" 
                  checked={product.isActive} 
                  onChange={(e) => handleInputChange("isActive", e.target.checked)} 
                />
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;