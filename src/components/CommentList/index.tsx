import { Fragment, useState } from 'react';

// components
import Comment from './Comment';

// style
import s from './index.module.scss';

// interface
import { CommentItem } from '../RootLayout';

interface Props {
  commentList: CommentItem[];
  currentUsername: string;
  isNested?: boolean;
  commentReducerFunc: Function;
}

const CommentList = (props: Props) => {
  const { commentList, isNested, currentUsername, commentReducerFunc } = props;
  const [popupIsActivated, setPopupIsActivated] = useState<boolean>(false);
  const [replyingIds, setReplyingIds] = useState<number[]>([]);

  return (
    <section className={`${s.container} ${isNested ? s['reply-list'] : ''}`}>
      {commentList.map((comment) => {
        const { id, replies } = comment;
        if (replies && replies.length > 0) {
          return (
            // Fragment 可以塞 key，避免觸發 key 必須不同的錯誤
            <Fragment key={id}>
              <Comment
                {...comment}
                currentUsername={currentUsername}
                popupState={popupIsActivated}
                replyingIds={replyingIds}
                onTogglePopup={setPopupIsActivated}
                onSetReplyingIds={setReplyingIds}
                commentReducerFunc={commentReducerFunc}
              />
              <CommentList
                commentList={replies}
                isNested
                currentUsername={currentUsername}
                commentReducerFunc={commentReducerFunc}
              />
            </Fragment>
          );
        } else {
          return (
            <Comment
              key={`${id}-comment`}
              {...comment}
              currentUsername={currentUsername}
              popupState={popupIsActivated}
              replyingIds={replyingIds}
              onTogglePopup={setPopupIsActivated}
              onSetReplyingIds={setReplyingIds}
              commentReducerFunc={commentReducerFunc}
            />
          );
        }
      })}
    </section>
  );
};

export default CommentList;
