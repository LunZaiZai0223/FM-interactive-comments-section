// style
import s from './index.module.scss';

interface Props {
  children: React.ReactNode;
  styleClasses?: string;
}

const Card = (props: Props) => {
  const { children, styleClasses = '' } = props;
  return <div className={`${s.card} ${styleClasses}`}>{children}</div>;
};

export default Card;
