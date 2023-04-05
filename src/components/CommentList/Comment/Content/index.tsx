// style
import s from './index.module.scss';

interface Props {
  replayToUser?: string;
  content: string;
}

const Content = (props: Props) => {
  const { replayToUser, content } = props;

  return (
    <p className={s.content}>
      {replayToUser && (
        <span className={`${s['reply-to']}`}>@{replayToUser}&ensp;</span>
      )}
      {content}
    </p>
  );
};

export default Content;
