import { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import fileDownload from 'js-file-download';
import axios from 'axios';
import _ from 'lodash';
import { styled } from '@mui/material/styles';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { fetchDocumentsByOwner } from 'src/store/actions/document.action';
import FileUpload from 'src/components/FileUpload';
import { DOC_TYPE } from 'src/constants/common-configurations';
import { uploadDocument } from 'src/store/actions/document.action';
import { BASE_URL } from 'src/constants/common-configurations';

type WorkerDocProps = {
  workerId?: string;
  employeeId?: string;
};


const WorkerDocuments = ({ workerId, employeeId }: WorkerDocProps) => {
  const dispatch = useDispatch();
  const documents = useSelector(
    ({ document }: RootStateOrAny) => document.list
  );

  const dox = _.reject(documents, { isProfilePic: true }) || [];

  useEffect(() => {
    workerId &&
      dispatch(
        fetchDocumentsByOwner({
          owner: workerId
        })
      );
  }, []);

  const handleFileDownload = async (docKey: string) => {
    try {
      const DOWNLOAD_URL = `${BASE_URL}/documents/${docKey}`;
      await handleDownload(DOWNLOAD_URL, docKey);
    } catch (err) {}
  };

  const handleDownload = async (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob'
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const handleSingleFileSubmit = async (selectedFile: any) => {
    const formData = new FormData();

    formData.append('owner', workerId);
    formData.append(`files`, selectedFile);

    dispatch(uploadDocument(formData));
  };

  return (
    <Card>
      <Box
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Applicant Files & Documents
          </Typography>
          <Typography variant="subtitle2">
            Manage applicant documents and files
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid
            container
            spacing={0}
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}
          >
            <Grid item xs={3} sm={3} md={3}>
              <FileUpload
                fileType={DOC_TYPE.LICENSE}
                owner={employeeId}
                onFileSubmit={handleSingleFileSubmit}
                placeholder={'Upload License'}
              />
              <FileUpload
                fileType={DOC_TYPE.PROOF_OF_ID}
                owner={employeeId}
                onFileSubmit={handleSingleFileSubmit}
                placeholder={'Upload Proof of ID'}
              />
              <FileUpload
                fileType={DOC_TYPE.PROOF_OF_ADDRESS}
                owner={employeeId}
                onFileSubmit={handleSingleFileSubmit}
                placeholder={'Upload Proof of address'}
              />
              <FileUpload
                fileType={DOC_TYPE.POLICE_CLEARENCE}
                owner={employeeId}
                onFileSubmit={handleSingleFileSubmit}
                placeholder={'Upload Police Clearence'}
              />
              <FileUpload
                fileType={DOC_TYPE.CURRENT_VISA}
                owner={employeeId}
                onFileSubmit={handleSingleFileSubmit}
                placeholder={'Upload Current visa'}
              />
              <FileUpload
                fileType={DOC_TYPE.VACCINE}
                owner={employeeId}
                onFileSubmit={handleSingleFileSubmit}
                placeholder={'Upload vaccine'}
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              {dox.length > 0 ? (
                dox.map((doc: any) => (
                  <div
                    style={{
                      width: '270px',
                      height: '36px',
                      border: '1px solid #4CAF50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      borderRadius: '3px'
                    }}
                  >
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
                        {doc?.docName}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        width: '50px',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleFileDownload(doc?.docKey)}
                    >
                      <FileDownloadRoundedIcon />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <p>No files were uploaded</p>
                </div>
              )}
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkerDocuments;
