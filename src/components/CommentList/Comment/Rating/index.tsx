// components
import Button from '../../../../UI/Button';

// style
import s from './index.module.scss';

// svgs
import { ReactComponent as PlusIcon } from '../../../../assets/icons/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../../../../assets/icons/icon-minus.svg';

// interfaces
import { Score } from '../../../RootLayout';

interface Props extends Score {
  text?: number;
}

const Rating = (props: Props) => {
  const { score } = props;
  return (
    <div className={`${s['rating-wrapper']}`}>
      <Button type="button" onHandleClick={() => {}} styleClasses={s.btn}>
        <PlusIcon />
      </Button>
      <span>{score}</span>
      <Button type="button" onHandleClick={() => {}} styleClasses={s.btn}>
        <MinusIcon />
      </Button>
    </div>
  );
};

export default Rating;
