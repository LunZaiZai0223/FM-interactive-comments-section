import { useReducer } from 'react';

// components
import CommentInputArea from '../CommentInputArea';
import CommentList from '../CommentList';

import s from './index.module.scss';

import data from '../../data.json';

interface User {
  username: string;
}

interface Reply extends CommentItem, Score {
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
  replies?: Reply[];
  currentUsername?: string;
  isReplying?: boolean;
  isEditing?: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const COMMENTS = JSON.parse(JSON.stringify(data.comments));
const CURRENT_USERNAME = JSON.parse(JSON.stringify(data.currentUser.username));

const generateComment = ({
  isParent,
  enteredContent,
  replyingTo,
}: {
  isParent?: boolean;
  enteredContent: string;
  replyingTo?: string;
}): any => {
  return {
    id: Math.floor(Date.now() / 100),
    content: enteredContent,
    replyingTo,
    createdAt: '1 month ago',
    score: 0,
    user: {
      image: {
        png: './images/avatars/image-juliusomo.png',
        webp: './images/avatars/image-juliusomo.webp',
      },
      username: 'juliusomo',
    },
    ...(isParent && { replies: [] }),
  };
};

const reducerFunc = (state: CommentItem[], action: Action): CommentItem[] => {
  const { type, payload = {} } = action;
  const { targetCommentId, enteredContent, replyingTo } = payload;

  switch (type) {
    case 'DELETE_COMMENT':
      const deleteById = (
        data: CommentItem[],
        targetCommentId: number
      ): any => {
        // filter callback 回傳 true / false 決定該 element 是否保留，回傳非 boolean 會被無視
        // -> [1, 2, 3, 4].filter((e) => ({ order: e })) -> [1, 2, 3, 4]
        return data.filter((comment) => {
          // 父層 id 相同，因此直接拔掉
          if (comment.id === targetCommentId) {
            return false;

            // 有 replies 及其 length > 0 才再跑遞迴
          } else if (comment.replies && comment.replies.length > 0) {
            const newReplies = deleteById(comment.replies, targetCommentId);
            // 必須  mutable 改變，因為 filter 只會管 callback 是否回傳 boolean
            comment.replies = newReplies;
          }
          // id 不相同就回傳該 element，遞迴的情況下是回傳需保留的 replies，然後再回去跑該父層輪次的遞迴，所以就是父層 + 子層都會拿到
          return true;
        });
      };
      return deleteById(state, targetCommentId);

    case 'INCREASE_SCORE':
      const increaseScoreById = (
        data: CommentItem[],
        targetId: number
      ): any => {
        return data.map((comment) => {
          if (comment.id === targetId) {
            return { ...comment, score: comment.score + 1 };
          } else {
            const replies = comment.replies
              ? increaseScoreById(comment.replies, targetId)
              : null;
            return replies ? { ...comment, replies } : comment;
          }
        });

        // 這樣子寫會讓子層無法遞迴，因為函式沒有接著讀取陣列 element 的能力
        // if (data.id === targetId) {
        //   return { ...data, score: data.score + 1 };
        // } else {
        //   const testResult = data.replies
        //     ? testFunc(data.replies, targetId)
        //     : null;
        //   return testResult ? { ...data, testResult } : data;
        // }

        // if (data.replies.length > 0) {
        //   return testFunc(data.replies, targetId);
        // }

        // return data;
      };
      return increaseScoreById(state, targetCommentId);

    case 'DECREASE_SCORE':
      const decreaseScoreById = (
        state: CommentItem[],
        targetCommentId: number
      ): any => {
        return state.map((comment) => {
          if (comment.id === targetCommentId) {
            return { ...comment, score: comment.score - 1 };
          } else {
            const replies = comment.replies
              ? decreaseScoreById(comment.replies, targetCommentId)
              : null;
            return replies ? { ...comment, replies } : comment;
          }
        });
      };
      return decreaseScoreById(state, targetCommentId);

    case 'ADD_COMMENT':
      const newComment = generateComment({ isParent: true, enteredContent });
      return [...state, newComment];

    case 'EDIT_COMMENT':
      const updateById = (data: CommentItem[], targetCommentId: number) => {
        return data.map((comment): any => {
          if (comment.id === targetCommentId) {
            return { ...comment, content: enteredContent };
          } else {
            const replies = comment.replies
              ? updateById(comment.replies, targetCommentId)
              : null;
            return replies ? { ...comment, replies } : comment;
          }
        });
      };
      return updateById(state, targetCommentId);

    case 'REPLY_COMMENT':
      const newReply = generateComment({ enteredContent, replyingTo });

      const replyById = (data: CommentItem[], targetCommentId: number): any => {
        let updatedCommentList: undefined | CommentItem[];
        let updatedCommentItem: undefined | CommentItem;
        updatedCommentList = [...data];

        for (const comment of updatedCommentList) {
          if (comment.id === targetCommentId) {
            const index = updatedCommentList.findIndex(
              (comment) => comment.id === targetCommentId
            );
            updatedCommentItem = { ...comment };
            updatedCommentItem.replies = [
              ...updatedCommentItem.replies!,
              newReply,
            ];
            updatedCommentList[index] = updatedCommentItem;
          } else {
            if (comment.replies && comment.replies.length > 0) {
              for (const reply of comment.replies) {
                if (reply.id === targetCommentId) {
                  updatedCommentItem = comment;
                  updatedCommentItem.replies = [
                    ...updatedCommentItem.replies!,
                    newReply,
                  ];
                }
              }
            }
          }
        }

        return updatedCommentList;
      };
      return replyById(state, targetCommentId);

    default:
      return state;
  }
};

const RootLayout = () => {
  const [reducerCommentList, commentListDispatchFunc] = useReducer(
    reducerFunc,
    COMMENTS
  );

  return (
    <main className={s.container}>
      <CommentList
        commentList={reducerCommentList}
        currentUsername={CURRENT_USERNAME}
        commentReducerFunc={commentListDispatchFunc}
      />
      <CommentInputArea commentReducerFunc={commentListDispatchFunc} />
    </main>
  );
};

export default RootLayout;
