import Button from '@mui/material/Button';
import React, { FC } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type UploadFileType = {
  files: any;
  setFiles: (data: any) => void;
  maxFiles?: number;
  accepted?: string;
  isMultiply?: boolean;
}

export const UploadFile: FC<UploadFileType> = ({files, setFiles, maxFiles = 15, accepted = "image/jpeg, image/png", isMultiply = false}) => {
  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      maxFiles={maxFiles}
      allowMultiple={isMultiply}
      accepted-file-types={accepted}
      name="files"
      labelIdle='Ператащите изображения либо <span class="filepond--label-action">Откройте</span>'
    />
  );
};
