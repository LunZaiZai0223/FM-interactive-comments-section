// components
import Button from '../../../../UI/Button';

// style
import s from './index.module.scss';

// svgs
import { ReactComponent as PlusIcon } from '../../../../assets/icons/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../../../../assets/icons/icon-minus.svg';

// interfaces
import { Score } from '../../../RootLayout';

const SCORE_ACTION_MAP = {
  increase: 1,
  decrease: 2,
};

interface Props extends Score {
  commentId: number;
  commentReducerFunc: Function;
}

const Rating = (props: Props) => {
  const { score, commentId, commentReducerFunc } = props;

  const handleUpdateScore = (scoreAction: number) => () => {
    switch (scoreAction) {
      case SCORE_ACTION_MAP.increase:
        commentReducerFunc({
          type: 'INCREASE_SCORE',
          payload: { targetCommentId: commentId },
        });
        break;

      case SCORE_ACTION_MAP.decrease:
        commentReducerFunc({
          type: 'DECREASE_SCORE',
          payload: { targetCommentId: commentId },
        });
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
