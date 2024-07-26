import { userSliceSelectors } from '../../services/userSlice';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(userSliceSelectors.getAuthChecked); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector(userSliceSelectors.getUserData); // userDataSelector — селектор получения пользователя из store
  const location = useLocation();
  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
