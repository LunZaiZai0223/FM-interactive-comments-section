# 此 branch 記錄單純只用 `useReducer` 傳遞 `props`

## state flow

```typescript
// main state
const [reducerCommentList, commentListDispatchFunc] = useReducer(
    reducerFunc,
    COMMENTS
  );
```

<img width="1113" alt="截圖 2023-04-06 21 49 36" src="https://user-images.githubusercontent.com/77038018/230398725-61f34dc9-95c0-46f4-935f-0d7abacbdf31.png">

## 遞迴的思考

也是遵從 event loop 先進後出（first in last out）的原則，所以遞迴叫用的會先執行，並且堆疊在第一次叫用時的 stack 上

```typescript
const updateById = (data: CommentItem[], targetCommentId: number) => {
  return data.map((comment): any => {
    if (comment.id === targetCommentId) {
      return { ...comment, content: enteredContent };
    } else {
      const replies = comment.replies ? updateById(comment.replies, targetCommentId) : null;
      return replies ? { ...comment, replies } : comment;
    }
  });
};
const result = updateById(state, targetCommentId);
```
<img width="917" alt="截圖 2023-04-06 22 07 54" src="https://user-images.githubusercontent.com/77038018/230402722-cd330188-75a5-454c-9a9f-b4ab00737656.png">

