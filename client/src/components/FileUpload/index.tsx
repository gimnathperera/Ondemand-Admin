import { ReactElement, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';

const DropContainer = styled('div')(
  ({ theme }) => `
  border: 1px solid #121a4f !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  column-gap:15px;
  padding: 0px 20px;
`
);

interface OwnProps {
  classNames?: string;
  fileType: string;
  owner: string;
  onFileSubmit: Function;
  placeholder?: string;
}

const FileUploadComponent = ({
  classNames,
  fileType,
  owner,
  onFileSubmit,
  placeholder
}: OwnProps): ReactElement => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const onDrop = (acceptedFiles: any) => {
    const renamedAcceptedFiles = acceptedFiles.map(
      (file: any) =>
        new File([file], `${fileType}_${owner}.${file.name.split('.')[1]}`, {
          type: file.type
        })
    );

    setSelectedFile({
      owner: owner,
      fileType: fileType,
      file: renamedAcceptedFiles[0]
    });

    onFileSubmit(renamedAcceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropContainer {...getRootProps()} className={classNames}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <>
          <FileUploadIcon />{' '}
          <p style={{ color: '#A17575' }}>Drop the files here ...</p>
        </>
      ) : selectedFile ? (
        <p style={{ color: '#A17575' }}>{selectedFile.file.name}</p>
      ) : (
        <>
          <FileUploadIcon />
          <p style={{ color: '#A17575' }}>
            {placeholder || 'Drag here or click to browse files'}
          </p>
        </>
      )}
    </DropContainer>
  );
};

export default FileUploadComponent;
