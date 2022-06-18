import { ReactElement, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const DropContainer = styled('div')(
  ({ theme }) => `
  border: 1px solid #42a5f5 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  width:247px;
  height:36px;
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
          <p style={{ color: '#A17575' }}>Drop the files here ...</p>
          <FileUploadIcon />
        </>
      ) : selectedFile ? (
        <p style={{ color: '#A17575' }}>{selectedFile.file.name}</p>
      ) : (
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex' }}>
              <InsertDriveFileIcon />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '5px',
                fontSize: '11pt',
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              {placeholder || 'Drag here or click to browse files'}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#42a5f5',
              color: 'white',
              width: '50px',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <FileUploadIcon />
          </div>
        </>
      )}
    </DropContainer>
  );
};

export default FileUploadComponent;
