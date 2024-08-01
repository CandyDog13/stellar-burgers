import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedInfoSelectors, fetchFeedInfo } from '../../services/feedInfoSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(feedInfoSelectors.getFeedInfoOrders);

  useEffect(() => {
    dispatch(fetchFeedInfo());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(fetchFeedInfo());
        }}
      />
    </>
  );
};
