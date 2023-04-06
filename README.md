# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [What I learned](#what-i-learned)

## Overview

### Screenshot

![Screenshot 2023-04-06 at 20-20-03 React App](https://user-images.githubusercontent.com/77038018/230377026-5098fc91-8af3-47b2-ad11-b393b742a520.png)

![Screenshot 2023-04-06 at 20-21-03 React App](https://user-images.githubusercontent.com/77038018/230377182-8904fb40-07d0-40c0-a717-0fa109dfb6a2.png)

### Links

- Solution URL: [repo](https://github.com/LunZaiZai0223/FM-interactive-comments-section)
- Live Site URL: [demo](https://lunzaizai0223.github.io/FM-interactive-comments-section/)

## My process

### What I learned

1. recursive component

```typescript
const CommentList = (props: Props) => {
 // ...

  return (
    <section className={`${s.container} ${isNested ? s['reply-list'] : ''}`}>
      {commentList.map((comment) => {
        const { id, replies } = comment;
        // recursive 
        if (replies && replies.length > 0) {
          return (
            // Fragment 可以塞 key，避免觸發 key 必須不同的錯誤
            <Fragment key={id}>
              <Comment
                {...comment}
                popupState={popupIsActivated}
                replyingIds={replyingIds}
                onTogglePopup={setPopupIsActivated}
                onSetReplyingIds={setReplyingIds}
              />
              <CommentList commentList={replies} isNested />
            </Fragment>
          );
        } else {
          return (
            <Comment
              key={`${id}-comment`}
              {...comment}
              popupState={popupIsActivated}
              replyingIds={replyingIds}
              onTogglePopup={setPopupIsActivated}
              onSetReplyingIds={setReplyingIds}
            />
          );
        }
      })}
    </section>
  );
};
```

2. Redux toolkit

```typescript
// src/store/currentUserSlice.ts
const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
});

// src/store/commentsSlice.ts
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
```
