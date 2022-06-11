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
import moment from 'moment';
import _ from 'lodash';
import { styled } from '@mui/material/styles';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
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

const DownloadContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: 'hidden';
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0px 0px 4px 0px;
  padding: 5px;
  margin-bottom: 10px;
  width: 90%;
`;

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
                  <DownloadContainer
                    onClick={() => handleFileDownload(doc.docKey)}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: 5
                      }}
                    >
                      <InsertDriveFileIcon />

                      <div
                        style={{ maxWidth: '250px', wordBreak: 'break-all' }}
                      >
                        <p style={{ color: '#A17575', margin: 3 }}>
                          {doc.docName}
                        </p>
                        <p
                          style={{
                            color: '#A17575',
                            fontSize: '10px',
                            margin: 3
                          }}
                        >
                          {moment(doc.createdAt).format('YYYY-MM-DD HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div>
                      <DownloadForOfflineIcon />
                    </div>
                  </DownloadContainer>
                ))
              ) : (
                <p>No files were uploaded</p>
              )}
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkerDocuments;
