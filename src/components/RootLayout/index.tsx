// components
import CommentInputArea from '../CommentInputArea';
import CommentList from '../CommentList';

import s from './index.module.scss';

import data from '../../data.json';
import { useState } from 'react';

interface User {
  username: string;
}

interface Reply extends CommentItem {
  replyingTo: string;
}

export interface Score {
  score: number;
}

export interface CommentItem extends Score {
  content: string;
  createdAt: string;
  id: number;
  user: User;
  replies: Reply[];
}

const COMMENTS = JSON.parse(JSON.stringify(data.comments));

const RootLayout = () => {
  const [commentList, setCommentList] = useState<CommentItem[]>(COMMENTS);

  console.log('[state]', commentList);
  return (
    <main className={s.container}>
      <CommentList commentList={commentList} />
      <CommentInputArea />
    </main>
  );
};

export default RootLayout;
