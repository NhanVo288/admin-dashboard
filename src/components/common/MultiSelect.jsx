import React, { useState, useRef, useEffect } from "react";
import * as Icons from "react-icons/tb";

const MultiSelect = ({
  className,
  label,
  options,
  placeholder,
  isSelected, // Đây là object {label, value} từ parent truyền vào
  isMulti = false,
  onChange
}) => {
  const [value, setValue] = useState("");
  
  //  Khi khởi tạo, chỉ lấy label để hiển thị UI
  const [selected, setSelected] = useState(
    isSelected ? (Array.isArray(isSelected) ? isSelected.map(i => i.label) : [isSelected.label]) : []
  );

  const [bool, setBool] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);

  //  Đồng bộ lại khi props isSelected thay đổi từ bên ngoài (nếu cần)
  useEffect(() => {
    if (isSelected) {
       const initialSelected = Array.isArray(isSelected) 
          ? isSelected.map(i => i.label) 
          : [isSelected.label];
       setSelected(initialSelected);
    } else {
       setSelected([]);
    }
  }, [isSelected]);


  //  Nhận vào cả object option thay vì chỉ value text
  const selectedHandle = (option) => {
    const newLabel = option.label;
    const newValue = option.value;

    if (!isMulti) {
      // Single Select
      setSelected([newLabel]); // UI hiện Label
      setBool(false);
      setValue("");
      setFilteredOptions(options);
      
      //  Trả về newValue (ID) thay vì mảng [label]
      onChange(newValue); 
    } else {
      // Multi Select
      // Nếu đã chọn rồi thì không thêm nữa (tránh trùng)
      if (selected.includes(newLabel)) return;
      
      const newSelectedLabels = [...selected, newLabel];
      setSelected(newSelectedLabels);
      setBool(false);
      setValue("");
      setFilteredOptions(options);

      // Map từ Label -> Value để trả về danh sách ID cho Parent
      const newSelectedValues = newSelectedLabels.map(lbl => {
        const foundOption = options.find(o => o.label === lbl);
        return foundOption ? foundOption.value : null;
      });
      onChange(newSelectedValues);
    }
  };

  const inputClickHandle = () => {
    setBool(!bool);
  };

  const changeHandler = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setBool(false);
    }
  };

  //  Xử lý khi xóa tag (cho Multi select)
  const removeTagHandle = (tagLabel) => {
    const newSelectedLabels = selected.filter((selectedValue) => selectedValue !== tagLabel);
    setSelected(newSelectedLabels);
    setFilteredOptions(options);

    // Tìm lại ID tương ứng cho các label còn lại
    const newSelectedValues = newSelectedLabels.map(lbl => {
        const foundOption = options.find(o => o.label === lbl);
        return foundOption ? foundOption.value : null;
    });
    onChange(newSelectedValues);
  };

  const clearAllHandle = () => {
    setSelected([]);
    setFilteredOptions(options);
    onChange(isMulti ? [] : null); // Reset về null hoặc mảng rỗng
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`multi_select input_field ${className ? className : ""}`}
      ref={inputRef}
    >
      {label ? <label>{label}</label> : ""}
      <div className="selected_tags">
        {isMulti && selected.map((select, key) => (
          <span
            key={key}
            className={`${!isMulti ? "selected_tag single" : "selected_tag"}`}
          >
            {select}
            {!isMulti ? (
              ""
            ) : (
              <Icons.TbX
                className="remove_tags"
                onClick={() => removeTagHandle(select)}
              />
            )}
          </span>
        ))}
      </div>
      <div className="multi_input">
        {!isMulti && selected.length === 0 ? (
          <input
            type="text"
            className={bool ? "active" : ""}
            placeholder={placeholder}
            value={value}
            onChange={changeHandler}
            onClick={inputClickHandle}
          />
        ) : isMulti ? (
          <input
            type="text"
            className={bool ? "active" : ""}
            placeholder={placeholder}
            value={value}
            onChange={changeHandler}
            onClick={inputClickHandle}
          />
        ) : (
          // Hiển thị Label khi đã chọn (Single)
          <span className="default_select" onClick={inputClickHandle}>
            {selected[0]} 
          </span>
        )}
        <Icons.TbChevronDown className="chevron_down" />
        {selected.length !== 0 ? (
          <Icons.TbX className="remove_tags" onClick={clearAllHandle} />
        ) : null}
      </div>
      <ul className={`select_dropdown ${bool ? "active" : ""}`}>
        {filteredOptions.map((option, key) => {
          const isOptionSelected = selected.includes(option.label);
          return (
            <li
              key={key}
              className={`select_dropdown_item ${
                isOptionSelected ? "disabled" : ""
              }`}
              // Truyền cả object option vào selectedHandle
              onClick={() => !isOptionSelected && selectedHandle(option)}
            >
              <button>{option.label}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelect;