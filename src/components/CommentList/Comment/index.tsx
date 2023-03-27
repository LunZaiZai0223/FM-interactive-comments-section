// components
import Card from '../../../UI/Card';
import Button from '../../../UI/Button';
import Avatar from '../../../UI/Avatar';
import Rating from './Rating';

// svgs
import { ReactComponent as ReplyIcon } from '../../../assets/icons/icon-reply.svg';

// style
import s from './index.module.scss';

// interfaces
import { CommentItem } from '../../RootLayout';

const Comment = (props: CommentItem) => {
  const { content, createdAt, id, score, user, replies } = props;
  return (
    <Card>
      <div className={`${s['comment-container']}`}>
        <Rating score={score} />
        <div className={`${s['comment-info']}`}>
          <div className={`${s['comment-header']}`}>
            <div className={`${s['user-info']}`}>
              <Avatar userName={user.username} />
              <span className={s.username}>{user.username}</span>
              <span className={`${s['comment-time']}`}>{createdAt}</span>
            </div>
            <Button
              type="button"
              onHandleClick={() => {}}
              styleClasses={`${s['action-btn']}`}
            >
              <ReplyIcon />
              Reply
            </Button>
          </div>
          <p>{content}</p>
        </div>
      </div>
    </Card>
  );
};

export default Comment;
