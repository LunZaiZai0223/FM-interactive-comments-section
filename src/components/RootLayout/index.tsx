import { useAppSelector } from '../../store/utils';

// components
import CommentInputArea from '../CommentInputArea';
import CommentList from '../CommentList';

import s from './index.module.scss';

const RootLayout = () => {
  const comments = useAppSelector((state) => state.comments);

  return (
    <main className={s.container}>
      <CommentList commentList={comments} />
      <CommentInputArea />
    </main>
  );
};

export default RootLayout;
