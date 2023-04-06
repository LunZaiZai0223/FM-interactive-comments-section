import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import data from '../data.json';

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
  createdAt: string | number;
  id: number;
  user: User;
  replies?: Reply[];
  currentUsername?: string;
  isReplying?: boolean;
  isEditing?: boolean;
}

const setLocalStorage = (key: string, value: CommentItem[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

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
    createdAt: new Date().getTime(),
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

const LOCAL_STORAGE_KEY = 'comments';

const initialState: CommentItem[] =
  JSON.parse(localStorage.getItem('comments')!) ??
  JSON.parse(JSON.stringify(data.comments));

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment(state, action: PayloadAction<{ deleteId: number }>) {
      const { deleteId } = action.payload;
      const deleteById = (comments: CommentItem[], deleteId: number) => {
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id === deleteId) {
            comments.splice(i, 1);
            return;
          }

          if (comments[i].replies && comments[i].replies!.length > 0) {
            deleteById(comments[i].replies!, deleteId);
          }
        }
      };

      deleteById(state, deleteId);
      setLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    increaseScore(state, action: PayloadAction<{ targetId: number }>) {
      const { targetId } = action.payload;
      const increaseScoreById = (comments: CommentItem[], targetId: number) => {
        for (const comment of comments) {
          if (comment.id === targetId) {
            comment.score += 1;
            return;
          }

          if (comment.replies && comment.replies!.length > 0) {
            increaseScoreById(comment.replies, targetId);
          }
        }
      };

      increaseScoreById(state, targetId);
      setLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    decreaseScore(state, action: PayloadAction<{ targetId: number }>) {
      const { targetId } = action.payload;
      const decreaseScoreById = (comments: CommentItem[], targetId: number) => {
        for (const comment of comments) {
          if (comment.id === targetId) {
            comment.score -= 1;
            return;
          }

          if (comment.replies && comment.replies!.length > 0) {
            decreaseScoreById(comment.replies!, targetId);
          }
        }
      };

      decreaseScoreById(state, targetId);
      setLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    addComment(state, action: PayloadAction<{ enteredContent: string }>) {
      const { enteredContent } = action.payload;
      const newComment = generateComment({ isParent: true, enteredContent });
      state.push(newComment);
      setLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    editComment(
      state,
      action: PayloadAction<{ editedCommentId: number; enteredComment: string }>
    ) {
      const { editedCommentId, enteredComment } = action.payload;
      const editCommentById = (
        comments: CommentItem[],
        editedCommentId: number
      ) => {
        for (const comment of comments) {
          if (comment.id === editedCommentId) {
            comment.content = enteredComment;
            return;
          }

          if (comment.replies && comment.replies!.length > 0) {
            editCommentById(comment.replies, editedCommentId);
          }
        }
      };

      editCommentById(state, editedCommentId);
      setLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    replyComment(
      state,
      action: PayloadAction<{
        repliedCommentId: number;
        enteredContent: string;
        replyingTo: string;
      }>
    ) {
      const { repliedCommentId, enteredContent, replyingTo } = action.payload;
      const repliedComment = generateComment({ enteredContent, replyingTo });
      const replyById = (comments: CommentItem[], repliedCommentId: number) => {
        for (const comment of comments) {
          if (comment.id === repliedCommentId) {
            comment.replies!.push(repliedComment);
            return;
          }

          if (comment.replies && comment.replies.length > 0) {
            for (const reply of comment.replies) {
              if (reply.id === repliedCommentId) {
                comment.replies.push(repliedComment);
                return;
              }
            }
          }
        }
      };

      replyById(state, repliedCommentId);
      setLocalStorage(LOCAL_STORAGE_KEY, state);
    },
  },
});

export const {
  addComment,
  replyComment,
  increaseScore,
  decreaseScore,
  editComment,
  deleteComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;
