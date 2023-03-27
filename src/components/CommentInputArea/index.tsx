// components
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import Avatar from '../../UI/Avatar';

// style
import s from './index.module.scss';

const CommentInputArea = () => {
  return (
    <Card>
      <form className={s.form}>
        <Avatar userName="juliusomo" />
        {/* <div className={`${s['avatar-wrapper']}`}>
          <img
            src={getUserAvatar('juliusomo')}
            alt="author avatar"
            className={s.avatar}
          ></img>
        </div> */}
        <textarea placeholder="Add a comment..."></textarea>
        <Button type="submit" onHandleClick={() => {}}>
          SEND
        </Button>
      </form>
    </Card>
  );
};

export default CommentInputArea;
