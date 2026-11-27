import { useEffect, useRef, useState } from 'react';

import { appConfig } from '../config/appConfig';
import { productFormLabels, validationLabels } from '../config/labels';

import AppButton from './AppButton';
import CakeImage from './CakeImage';
import FormField from './FormField';

import './ImageUploadField.css';

const BYTES_PER_MB = 1024 * 1024;

interface ImageUploadFieldProps {
  label: string;
  altText: string;
  currentImageUrl: string | null; // the saved image, shown until a new file is picked
  onFileChange: (file: File) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ label, altText, currentImageUrl, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Frees the memory of the previous preview when a new one replaces it or the screen closes.
  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    event.target.value = ''; // allows picking the same file again after an error
    if (!file) return;

    const maxSizeMb = appConfig.productRules.maxImageSizeMb;
    if (file.size > maxSizeMb * BYTES_PER_MB) {
      setErrorMessage(validationLabels.imageTooLarge(maxSizeMb));
      return;
    }

    setErrorMessage(null);
    setPreviewUrl(URL.createObjectURL(file));
    onFileChange(file);
  };

  const shownImageUrl = previewUrl ?? currentImageUrl;

  return (
    <FormField label={label} errorMessage={errorMessage}>
      <div className="image-upload-field">
        <CakeImage imageUrl={shownImageUrl} name={altText} />
        {/* The native file input is hidden; the styled button opens it. */}
        <input
          ref={fileInputRef}
          className="image-upload-field__input"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <AppButton variant="outline" size="small" onClick={() => fileInputRef.current?.click()}>
          {shownImageUrl ? productFormLabels.changeImage : productFormLabels.chooseImage}
        </AppButton>
      </div>
    </FormField>
  );
};

export default ImageUploadField;
