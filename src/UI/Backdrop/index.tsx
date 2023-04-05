// style
import s from './index.module.scss';

interface Props {
  onTogglePopup: Function;
}

const Backdrop = (props: Props) => {
  const { onTogglePopup } = props;

  return (
    <div className={s['back-drop']} onClick={() => onTogglePopup(false)}></div>
  );
};

export default Backdrop;
