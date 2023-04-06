import { useCallback, useState } from 'react';

import { formatDistanceToNow } from 'date-fns';

// components
import Card from '../../../UI/Card';
import Button from '../../../UI/Button';
import Avatar from '../../../UI/Avatar';
import Popup from '../../../UI/PopUp';
import Rating from './Rating';
import Content from './Content';
import CommentInputArea from '../../CommentInputArea';
import CommentInput from '../../CommentInputArea/CommentInput';

// svgs
import { ReactComponent as ReplyIcon } from '../../../assets/icons/icon-reply.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/icon-delete.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/icon-edit.svg';

// style
import s from './index.module.scss';

// interfaces
import { CommentItem } from '../../RootLayout';

interface Props extends CommentItem {
  popupState: boolean;
  replyingIds: number[];
  onTogglePopup: Function;
  onSetReplyingIds: Function;
  commentReducerFunc: Function;
  replyingTo?: string;
}

const Comment = (props: Props) => {
  const {
    content,
    createdAt,
    id,
    score,
    user,
    currentUsername,
    popupState,
    replyingIds,
    onTogglePopup,
    onSetReplyingIds,
    commentReducerFunc,
    replyingTo = '',
  } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isCurrentUser = useCallback(
    (username: string) => {
      return username === currentUsername;
    },
    [currentUsername]
  );

  const handleConfirmDelete = () => {
    onTogglePopup(!popupState);
  };

  const handleStartReply = (targetId: number) => () => {
    return onSetReplyingIds([...replyingIds, targetId]);
  };

  // 透過 scope + HOF 封裝函式，讓子層叫用時也可以讀取到正確的 id
  const handleRemoveReplyId = (targetId: number) => () => {
    return onSetReplyingIds(replyingIds.filter((id) => id !== targetId));
  };

  return (
    <>
      <Card>
        <div
          className={`${s['comment-container']} ${
            score < 0 ? s['bad-comment'] : ''
          }`}
        >
          <Rating
            score={score}
            commentReducerFunc={commentReducerFunc}
            commentId={id}
          />
          <div className={`${s['comment-info']}`}>
            <div className={`${s['comment-header']}`}>
              <div className={`${s['user-info']}`}>
                <Avatar userName={user.username} />
                <span className={s.username}>{user.username}</span>
                {isCurrentUser(user.username) && (
                  <span className={s['current-user-hit']}>you</span>
                )}
                <span className={`${s['comment-time']}`}>
                  {typeof createdAt === 'number'
                    ? `${formatDistanceToNow(createdAt)} ago`
                    : createdAt}
                </span>
              </div>
              <div className={`${s['action-btn-wrapper']}`}>
                {isCurrentUser(user.username) ? (
                  <>
                    <Button
                      type="button"
                      onHandleClick={handleConfirmDelete}
                      styleClasses={`${s['action-btn']} ${s.danger}`}
                    >
                      <DeleteIcon /> Delete
                    </Button>
                    <Button
                      type="button"
                      styleClasses={`${s['action-btn']}`}
                      onHandleClick={() => setIsEditing((prev) => !prev)}
                    >
                      <EditIcon /> Edit
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    onHandleClick={
                      replyingIds.includes(id) ? () => {} : handleStartReply(id)
                    }
                    styleClasses={`${s['action-btn']}`}
                  >
                    <ReplyIcon />
                    Reply
                  </Button>
                )}
              </div>
            </div>
            {isEditing ? (
              <CommentInput
                initialValue={content}
                commentReducerFunc={commentReducerFunc}
                isEditing
                onToggleIsEditing={() => setIsEditing((prev) => !prev)}
                targetCommentId={id}
              />
            ) : (
              <Content replayToUser={replyingTo} content={content} />
            )}
          </div>
        </div>
      </Card>
      {!isCurrentUser(user.username) && replyingIds.includes(id) && (
        <CommentInputArea
          styleClasses={`${s['reply-container']}`}
          isReplying
          commentReducerFunc={commentReducerFunc}
          replyToUser={user.username}
          targetCommentId={id}
          onRemoveReplyId={handleRemoveReplyId(id)}
        />
      )}
      {popupState && (
        <Popup
          onTogglePopup={handleConfirmDelete}
          commentReducerFunc={commentReducerFunc}
          targetCommentId={id}
        />
      )}
    </>
  );
};

export default Comment;
