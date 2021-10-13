import styled from 'styled-components';

import { ReactComponent as IconUser } from 'theme/icons/user.svg';
import LoadingLogo from 'components/LoadingLogo';
import Text, { TextLight } from 'components/Text';

export const Container = styled.main`
  margin: 42px auto;
  width: 100%;
  max-width: var(--layout-width);
`;

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 32px;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin: 0 8px 6px 0;
  }
`;

export const StyledIconUser = styled(IconUser)`
  fill: var(--colors-blank);
  margin-right: 10px;
`;

export const StyledLoadingLogo = styled(LoadingLogo)`
  display: flex;
  margin: 80px auto auto auto;
`;

export const StyledTextLight = styled(TextLight)`
  ${({ theme }) => theme.typography.bodyCaption};
`;

export const Filters = styled.div`
  display: flex;
  margin-bottom: 16px;

  justify-content: space-between;
`;

export const RightSide = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;

export const NotFound = styled(Text)`
  display: flex;
  padding: 18px 0;
`;
