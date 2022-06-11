import QRImg from 'src/assets/images/qr.png';
import { Avatar, Button } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import LogoImage from 'src/assets/images/Logo.svg';

const MapMarker2 = ({ size = 16, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ verticalAlign: 'bottom' }}
  >
    <circle cx="12" cy="10" r="3" />
    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
  </svg>
);
const Phone = ({ size = 16, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ verticalAlign: 'bottom' }}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const Mail = ({ size = 16, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ verticalAlign: 'bottom' }}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const Star = ({ size = 16, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ verticalAlign: 'bottom' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const BusinessCardFront = ({
  people,
  headerColor = '#fff',
  headerBg = '#4285F4',
  headerStyle = {},
  shadow = true,
  style = {},
  ...props
}) => {
  return (
    <div
      className="card-business"
      style={{
        background: '#fff',
        width: '100mm',
        height: '60mm',
        borderRadius: '5px',
        boxShadow: shadow !== false ? '#9E9E9E 0px 0px 10px' : '',
        ...style
      }}
      {...props}
    >
      <div
        style={{
          background: headerBg,
          minHeight: '20mm',
          padding: 10,

          borderTopRightRadius: '5px',
          borderTopLeftRadius: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...headerStyle
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '17pt',
              margin: 0,
              color: headerColor
            }}
          >
            {people.displayName}
          </h1>
          {people.tagline && (
            <p
              style={{
                margin: 0,
                fontSize: '10pt',
                color: '#fff'
              }}
            >
              <span>{people.tagline}</span>
            </p>
          )}
        </div>

        <Avatar
          sx={{ bgcolor: '#BCC1CB', width: 56, height: 56 }}
          src={people?.avatar}
        />
      </div>
      <div
        style={{
          padding: 20,
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <ul
          style={{
            fontSize: '10pt',
            listStyle: 'none',
            lineHeight: '15pt',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2
          }}
        >
          {people.title && (
            <li>
              <Star /> {people.title}
            </li>
          )}
          {people.phone && (
            <li>
              <Phone /> {people.phone}
            </li>
          )}
          {people.mail && (
            <li>
              <Mail /> {people.mail}
            </li>
          )}

          {people.location && (
            <li>
              <MapMarker2 /> {people.location}
            </li>
          )}
        </ul>
        <img alt="qr-code" src={QRImg} />
      </div>
    </div>
  );
};
const BusinessCardBack = () => {
  return (
    <div
      className="card-business"
      style={{
        background: '#fff',
        width: '100mm',
        height: '60mm',
        borderRadius: '5px',
        boxShadow: '#9E9E9E 0px 0px 10px'
      }}
    >
      <div>
        <img
          src={LogoImage}
          width="100%"
          style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
        />
      </div>
      <div
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex'
        }}
      >
        <div
          style={{
            borderBottom: '1px dashed black',
            width: '50%',
            marginTop: '25px'
          }}
        ></div>
      </div>
    </div>
  );
};

const BizCardComponent = ({ data }) => {
  const { name, type, mobile, email, address, avatar } = data;

  return (
    <div
      style={{
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: 20
      }}
    >
      <BusinessCardFront
        people={{
          avatar: avatar,
          displayName: name,
          tagline: type,
          title: 'Ondemand Pvt (LTD)',
          phone: mobile,
          mail: email,
          location: address
        }}
      />
      <BusinessCardBack />

      <Button
        startIcon={<LocalPrintshopIcon />}
        variant="contained"
        sx={{ width: '70%' }}
      >
        Print Card
      </Button>

      <style>
        {`
        @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
        .card-business * {
          font-family:  'Quicksand',sans-serif;
        }
     `}
      </style>
    </div>
  );
};

export default BizCardComponent;
