import { FC, ReactNode } from 'react';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4, 0)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
  maxWidth?: WidthType;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({
  children,
  maxWidth = 'lg'
}) => {
  return (
    <>
      <PageTitle>
        <Container maxWidth={maxWidth}>{children}</Container>
      </PageTitle>
    </>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

type WidthType = 'lg' | 'xl' | 'xs' | 'md' | 'sm';

export default PageTitleWrapper;
