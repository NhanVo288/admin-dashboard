import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as Icons from "react-icons/tb";
import Button from "./Button.jsx";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const DropZone = ({ value, onChange }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    const base64 = await fileToBase64(file);

    onChange({
      id: Date.now(),
      name: file.name,
      preview,   
      base64,    
    });
  }, [onChange]);

  const onDelete = () => {
    if (value?.preview) {
      URL.revokeObjectURL(value.preview); // tránh memory leak
    }
    onChange(null);
  };

  useEffect(() => {
    return () => {
      if (value?.preview) {
        URL.revokeObjectURL(value.preview);
      }
    };
  }, [value]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <div className="drop-zone-container">
      <div {...getRootProps()} className="drop-zone">
        <input {...getInputProps()} />
        <p>Drag & drop image here or click</p>
      </div>

      {value && (
        <div className="uploaded-images">
          <div className="uploaded-image-container">
            <figure className="uploaded-image">
              <img src={value.preview} alt={value.name} />
              <Button
                onClick={onDelete}
                icon={<Icons.TbTrash />}
                className="sm"
              />
            </figure>
            <span className="line_clamp">{value.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
