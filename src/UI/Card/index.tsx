// style
import s from './index.module.scss';

interface Props {
  children: React.ReactNode;
}

const Card = (props: Props) => {
  const { children } = props;
  return <div className={s.card}>{children}</div>;
};

export default Card;
