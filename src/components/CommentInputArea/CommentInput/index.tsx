import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../store/utils';
import {
  addComment,
  replyComment,
  editComment,
} from '../../../store/commentsSlice';

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
  onToggleIsEditing?: Function;
  onRemoveReplyId?: Function;
}

const CommentInput = (props: Props) => {
  const {
    isReplying,
    initialValue = '',
    isEditing,
    targetCommentId,
    onToggleIsEditing,
    replayToUser,
    onRemoveReplyId,
  } = props;

  const dispatch = useAppDispatch();
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
        dispatch(
          editComment({
            editedCommentId: targetCommentId as number,
            enteredComment: enteredContentEle.current!.value,
          })
        );
        onToggleIsEditing!();
      } else if (isReplying) {
        dispatch(
          replyComment({
            repliedCommentId: targetCommentId as number,
            replyingTo: replayToUser as string,
            enteredContent: enteredContentEle.current!.value,
          })
        );
        onRemoveReplyId!();
      } else {
        dispatch(
          addComment({ enteredContent: enteredContentEle.current!.value })
        );
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
      <Button
        type="submit"
        onHandleClick={() => {}}
        styleClasses={`${s['submit-btn']}`}
      >
        {btnText}
      </Button>
    </form>
  );
};

export default CommentInput;
