import { useEffect, useRef } from 'react';

// components
import Button from '../../../UI/Button';

// style
import s from './index.module.scss';

interface Props {
  isReplying?: boolean;
  isEditing?: boolean;
  initialValue?: string;
  targetCommentId?: number;
  replayToUser?: string;
  commentReducerFunc: Function;
  onToggleIsEditing?: Function;
  onRemoveReplyId?: Function;
}

const CommentInput = (props: Props) => {
  const {
    isReplying,
    commentReducerFunc,
    initialValue = '',
    isEditing,
    targetCommentId,
    onToggleIsEditing,
    replayToUser,
    onRemoveReplyId,
  } = props;

  const enteredContentEle = useRef<HTMLTextAreaElement | null>(null);
  const placeHolderText = isEditing ? 'Editing comment...' : 'Add a comment...';
  const btnText = isReplying ? 'REPLY' : isEditing ? 'UPDATE' : 'SEND';

  useEffect(() => {
    if (initialValue) {
      enteredContentEle.current!.value = initialValue;
    }
  }, [initialValue]);

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredContent = enteredContentEle.current?.value;
    if (enteredContent && enteredContent.trim().length > 0) {
      if (isEditing) {
        commentReducerFunc({
          type: 'EDIT_COMMENT',
          payload: {
            targetCommentId,
            enteredContent: enteredContentEle.current?.value,
          },
        });
        onToggleIsEditing!();
      } else if (isReplying) {
        commentReducerFunc({
          type: 'REPLY_COMMENT',
          payload: {
            targetCommentId,
            replyingTo: replayToUser,
            enteredContent: enteredContentEle.current?.value,
          },
        });
        onRemoveReplyId!();
      } else {
        commentReducerFunc({
          type: 'ADD_COMMENT',
          payload: { enteredContent: enteredContentEle.current?.value },
        });
      }
      enteredContentEle.current!.value = '';
    }
  };
  return (
    <form
      className={`${s.form} ${isEditing ? s['form-is-editing'] : ''}`}
      onSubmit={handleSubmitComment}
    >
      <textarea
        placeholder={placeHolderText}
        ref={enteredContentEle}
      ></textarea>
      <Button type="submit" onHandleClick={() => {}}>
        {btnText}
      </Button>
    </form>
  );
};

export default CommentInput;
