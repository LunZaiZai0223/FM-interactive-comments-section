// components
import Card from '../../UI/Card';
import Avatar from '../../UI/Avatar';
import CommentInput from './CommentInput';

// style
import s from './index.module.scss';

interface Props {
  styleClasses?: string;
  isReplying?: boolean;
  replyToUser?: string;
  targetCommentId?: number;
  onRemoveReplyId?: Function;
}

const CommentInputArea = (props: Props) => {
  const {
    styleClasses = '',
    isReplying,
    replyToUser,
    targetCommentId,
    onRemoveReplyId,
  } = props;

  return (
    <Card styleClasses={styleClasses}>
      <div className={`${s['form-wrapper']}`}>
        <Avatar userName="juliusomo" styleClasses={`${s['mobile-avatar']}`} />
        <CommentInput
          isReplying={isReplying}
          replayToUser={replyToUser}
          targetCommentId={targetCommentId}
          onRemoveReplyId={onRemoveReplyId}
        />
      </div>
    </Card>
  );
};

export default CommentInputArea;
