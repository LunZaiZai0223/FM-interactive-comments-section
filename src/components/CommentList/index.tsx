// components
import Comment from './Comment';

// style
import s from './index.module.scss';

// interface
import { CommentItem } from '../RootLayout';

interface Props {
  commentList: CommentItem[];
  isNested?: boolean;
}

const CommentList = (props: Props) => {
  const { commentList, isNested } = props;
  console.log(commentList, '[commentList]');

  // TODO: 用遞迴處理巢狀 comment -> reply
  return (
    <section className={`${s.container} ${isNested ? s['reply-list'] : ''}`}>
      {commentList.map((comment) => {
        const { id, replies } = comment;
        console.log(replies);
        // if (replies && replies.length > 0) {
        //   return <CommentList key={id} commentList={replies} />;
        // }

        if (replies && replies.length > 0) {
          return (
            <>
              <Comment key={id} {...comment} />
              <CommentList key={id} commentList={replies} isNested />
            </>
          );
        } else {
          return <Comment key={id} {...comment} />;
        }
      })}
    </section>
  );
};

export default CommentList;
