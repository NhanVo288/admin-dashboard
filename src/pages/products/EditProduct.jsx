import * as Icons from "react-icons/tb";
import React, { useEffect, useState } from "react";
import Categories from "../../api/Categories.json";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Textarea from "../../components/common/Textarea.jsx";
import FileUpload from "../../components/common/FileUpload.jsx";
import MultiSelect from "../../components/common/MultiSelect.jsx";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../store/products/productApi.js"; // \
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductByIdQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: null,
    brand: "",
    model: "",
    isActive: true,
    images: [], // [{ imageUrl, isPrimary, displayOrder }]
    specs: [], // [{ specKey, specValue }]
  });

  const [newSpec, setNewSpec] = useState({ key: "", value: "" });

  useEffect(() => {
    if (data) {
      setProduct({
        name: data.name || "",
        description: data.description || "",
        price: data.price || 0,
        categoryId: data.categoryId || null,
        brand: data.brand || "",
        model: data.model || "",
        isActive: data.isActive ?? true,
        images: data.images || [],
        specs: data.specs || [],
      });
    }
  }, [data]);

  const handleInputChange = (key, value) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const addSpec = () => {
    if (newSpec.key && newSpec.value) {
      setProduct((prev) => ({
        ...prev,
        specs: [
          ...prev.specs,
          { specKey: newSpec.key, specValue: newSpec.value },
        ],
      }));
      setNewSpec({ key: "", value: "" });
    }
  };

  const removeSpec = (index) => {
    setProduct((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const onSubmit = async () => {
    try {
      const payload = {
        ...product,
        price: Number(product.price),
        categoryId: Number(product.categoryId),
      };

      await updateProduct({
        id: Number(productId),
        ...payload,
      }).unwrap();
    } catch (err) {
      console.error("Update product failed:", err);
    }
  };

  if (isLoading) return <div className="p-10">Loading product data...</div>;

  const categoryOptions = Categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            {/* THÔNG TIN CHÍNH */}
            <div className="content_item">
              <h2 className="sub_heading">Product Info</h2>
              <div className="column">
                <Input
                  label="Product Name"
                  value={product.name}
                  onChange={(val) => handleInputChange("name", val)}
                />
              </div>
              <div className="column">
                <Textarea
                  label="Description"
                  value={product.description}
                  onChange={(val) => handleInputChange("description", val)}
                />
              </div>
              <div className="column_2">
                <Input
                  label="Brand"
                  value={product.brand}
                  onChange={(val) => handleInputChange("brand", val)}
                />
              </div>
              <div className="column_2">
                <Input
                  label="Model"
                  value={product.model}
                  onChange={(val) => handleInputChange("model", val)}
                />
              </div>
            </div>

            {/* HÌNH ẢNH */}
            <div className="content_item">
              <h2 className="sub_heading">Images</h2>
              <div
                className="image_preview_list"
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="img_card"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={img.imageUrl}
                      alt="preview"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    {img.isPrimary && (
                      <span
                        style={{
                          fontSize: "10px",
                          background: "green",
                          color: "#fff",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      >
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <FileUpload
                onChange={(file) => {
                  if (file) {
                    const newImg = {
                      imageUrl: file.base64,
                      isPrimary: product.images.length === 0,
                      displayOrder: product.images.length + 1,
                    };
                    setProduct((prev) => ({
                      ...prev,
                      images: [...prev.images, newImg],
                    }));
                  }
                }}
              />
            </div>

            {/* THÔNG SỐ KỸ THUẬT */}
            <div className="content_item">
              <h2 className="sub_heading">Specifications</h2>
              <div className="column_3">
                <Input
                  placeholder="Key (e.g color)"
                  value={newSpec.key}
                  onChange={(v) => setNewSpec({ ...newSpec, key: v })}
                />
              </div>
              <div className="column_3">
                <Input
                  placeholder="Value (e.g black)"
                  value={newSpec.value}
                  onChange={(v) => setNewSpec({ ...newSpec, value: v })}
                />
              </div>
              <div className="column_3">
                <Button
                  label="Add Spec"
                  icon={<Icons.TbPlus />}
                  onClick={addSpec}
                  className="sm"
                />
              </div>

              {product.specs.length > 0 && (
                <table className="bordered" style={{ marginTop: "15px" }}>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
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
              <h2 className="sub_heading">Action</h2>
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
                label="Update Product"
                icon={<Icons.TbCircleCheck />}
                onClick={onSubmit}
                className="success"
                disabled={isUpdating || !product.name}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </div>

            <div className="sidebar_item">
              <h2 className="sub_heading">Category</h2>
              <MultiSelect
                placeholder="Select Category"
                options={categoryOptions}
                isSelected={product.categoryId} // Đổi tên prop tùy theo Component MultiSelect của bạn
                onChange={(id) => handleInputChange("categoryId", id)}
              />
            </div>

            <div className="sidebar_item">
              <h2 className="sub_heading">Status</h2>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="checkbox"
                  checked={product.isActive}
                  onChange={(e) =>
                    handleInputChange("isActive", e.target.checked)
                  }
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

export default EditProduct;
