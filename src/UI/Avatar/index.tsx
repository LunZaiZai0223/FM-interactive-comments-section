// utils
import getUserAvatar from '../../utils/getUser';

// style
import s from './index.module.scss';

interface Props {
  userName: string;
}

const Avatar = (props: Props) => {
  const { userName } = props;
  return (
    <div className={`${s['avatar-wrapper']}`}>
      <img
        src={getUserAvatar(userName)}
        alt={`${userName}'s avatar`}
        className={s.avatar}
      />
    </div>
  );
};

export default Avatar;
