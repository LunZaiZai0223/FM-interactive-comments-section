import { Fragment, useState } from 'react';

// components
import Comment from './Comment';

// style
import s from './index.module.scss';

// interface
import { CommentItem } from '../../store/commentsSlice';

interface Props {
  commentList: CommentItem[];
  isNested?: boolean;
}

const CommentList = (props: Props) => {
  const { commentList, isNested } = props;
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
                popupState={popupIsActivated}
                replyingIds={replyingIds}
                onTogglePopup={setPopupIsActivated}
                onSetReplyingIds={setReplyingIds}
              />
              <CommentList commentList={replies} isNested />
            </Fragment>
          );
        } else {
          return (
            <Comment
              key={`${id}-comment`}
              {...comment}
              popupState={popupIsActivated}
              replyingIds={replyingIds}
              onTogglePopup={setPopupIsActivated}
              onSetReplyingIds={setReplyingIds}
            />
          );
        }
      })}
    </section>
  );
};

export default CommentList;
