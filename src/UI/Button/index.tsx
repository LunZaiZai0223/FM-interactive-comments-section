// style
import s from './index.module.scss';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onHandleClick: Function;
  children: React.ReactNode;
  styleClasses?: string;
}

const Button = (props: Props) => {
  const { type = 'button', onHandleClick, children, styleClasses = '' } = props;

  const handleClick = () => {
    onHandleClick();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${s.btn} ${styleClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;
