// utils
import getUserAvatar from '../../utils/getUser';

// style
import s from './index.module.scss';

interface Props {
  userName: string;
  styleClasses?: string;
}

const Avatar = (props: Props) => {
  const { userName, styleClasses } = props;
  return (
    <div className={`${s['avatar-wrapper']} ${styleClasses || ''}`}>
      <img
        src={getUserAvatar(userName)}
        alt={`${userName}'s avatar`}
        className={s.avatar}
      />
    </div>
  );
};

export default Avatar;
