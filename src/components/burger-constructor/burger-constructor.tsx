import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/burgerConstructorSlice';
import { userSliceSelectors } from '../../services/userSlice';
import {
  fetchCreateNewOrder,
  orderSliceActions,
  orderSliceSelectors
} from '../../services/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    burgerConstructorSelectors.getIngredientsFromConstructor
  );
  const userData = useSelector(userSliceSelectors.getUserData);

  const orderRequest = useSelector(orderSliceSelectors.getOrderLoading);

  const orderModalData = useSelector(orderSliceSelectors.getOrderState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData) {
      navigate('/login'), { replace: true };
      return;
    }
    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(fetchCreateNewOrder(data))
      .unwrap()
      .catch(() => {})
      .then(() => {
        dispatch(burgerConstructorActions.resetConstructor());
      });
  };

  const closeOrderModal = () => {
    dispatch(orderSliceActions.clearOrderState());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
