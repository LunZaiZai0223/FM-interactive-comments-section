import { useAppDispatch } from '../../../../store/utils';
import { increaseScore, decreaseScore } from '../../../../store/commentsSlice';

// components
import Button from '../../../../UI/Button';

// style
import s from './index.module.scss';

// svgs
import { ReactComponent as PlusIcon } from '../../../../assets/icons/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../../../../assets/icons/icon-minus.svg';

// interfaces
import { Score } from '../../../../store/commentsSlice';

const SCORE_ACTION_MAP = {
  increase: 1,
  decrease: 2,
};

interface Props extends Score {
  commentId: number;
}

const Rating = (props: Props) => {
  const { score, commentId } = props;
  const dispatch = useAppDispatch();

  const handleUpdateScore = (scoreAction: number) => () => {
    switch (scoreAction) {
      case SCORE_ACTION_MAP.increase:
        dispatch(increaseScore({ targetId: commentId }));
        break;

      case SCORE_ACTION_MAP.decrease:
        dispatch(decreaseScore({ targetId: commentId }));
        break;
    }
  };

  return (
    <div className={`${s['rating-wrapper']}`}>
      <Button
        type="button"
        onHandleClick={handleUpdateScore(SCORE_ACTION_MAP.increase)}
        styleClasses={s.btn}
      >
        <PlusIcon />
      </Button>
      <span>{score}</span>
      <Button
        type="button"
        onHandleClick={handleUpdateScore(SCORE_ACTION_MAP.decrease)}
        styleClasses={s.btn}
      >
        <MinusIcon />
      </Button>
    </div>
  );
};

export default Rating;
