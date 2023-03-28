// style
import s from './index.module.scss';

interface Props {
  children?: React.ReactNode;
}

const Backdrop = (props: Props) => {
  const { children } = props;

  return <div className={s['back-drop']}>{children}</div>;
};

export default Backdrop;
