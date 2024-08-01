import { FC, ReactNode } from 'react';
import styles from './centering-component.module.css';

interface ICenteringComponent {
  children: ReactNode;
  title: string;
}

export const CenteringComponent: FC<ICenteringComponent> = ({
  title,
  children
}) => (
  <div className={styles.wrapper}>
    <h1 className={'text text_type_main-large'}>{title}</h1>
    {children}
  </div>
);
