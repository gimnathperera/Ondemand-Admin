import QRCode from 'react-qr-code';

type QRComponentProps = {
  value: string;
};

const QRComponent = ({ value }: QRComponentProps) => {
  return <QRCode value={value} size={100} />;
};

export default QRComponent;
