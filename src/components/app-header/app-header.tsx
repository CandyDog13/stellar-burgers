import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSliceSelectors } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const data = useSelector(userSliceSelectors.getUserData);
  return (
    <>
      <AppHeaderUI userName={data?.name || ''} />
      <Outlet />
    </>
  );
};
