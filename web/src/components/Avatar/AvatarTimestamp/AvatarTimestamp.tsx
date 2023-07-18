import { Post } from 'types/graphql'

import Avatar from 'src/components/Avatar/Avatar'

interface Props {
  article: Post
}

const AvatarTimestamp = ({ article }: Props) => {
  const authorName =
    article.user.profile?.name || article.user.name || 'Anonymous'

  return (
    <div className="mb-2 flex flex-row items-center gap-2">
      <Avatar
        src={article.user?.profile?.avatar}
        alt={authorName}
        name={authorName}
      />
      <div>
        <span
          className="text-sm text-slate-500"
          title={article.user.name || article.user.email}
        >
          {authorName}
        </span>
        <span
          className="ml-2 text-sm text-slate-500"
          title={new Date(article.createdAt).toLocaleString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        >
          | {new Date(article.createdAt).toLocaleDateString('nl-NL')}{' '}
          {new Date(article.createdAt).toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}

export default AvatarTimestamp
