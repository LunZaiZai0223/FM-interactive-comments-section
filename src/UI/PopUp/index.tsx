// components
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop';
import Button from '../Button';

// style
import s from './index.module.scss';

interface Props {
  children?: React.ReactNode;
}

const backDropContainerEle = document.getElementById(
  'back-drop-container'
) as HTMLDivElement;

const Popup = (props: Props) => {
  const { children } = props;
  return ReactDOM.createPortal(
    <Backdrop>
      <div className={`${s['popup-container']}`}>
        <strong className={s.header}>Delete Comment</strong>
        <p className={s.content}>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className={`${s['action-btn-wrapper']}`}>
          <Button type="button" onHandleClick={() => {}} styleClasses={s.info}>
            NO, CANCEL
          </Button>
          <Button
            type="button"
            onHandleClick={() => {}}
            styleClasses={s.danger}
          >
            YES, DELETE
          </Button>
        </div>
      </div>
    </Backdrop>,
    backDropContainerEle
  );
};

export default Popup;
