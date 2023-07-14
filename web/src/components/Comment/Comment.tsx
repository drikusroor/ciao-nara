import { useMemo } from 'react'

import type { Comment } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as FindArticleQuery } from 'src/components/ArticleCell'

import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import Thumbs from '../Thumbs/Thumbs'

interface ICommentProps {
  comment: Comment
}

const CREATE_UPDATE_OR_DELETE_THUMB = gql`
  mutation CreateUpdateOrDeleteMutation(
    $input: CreateUpdateOrDeleteThumbInput!
  ) {
    createUpdateOrDeleteThumb(input: $input) {
      commentId
      up
    }
  }
`

const DELETE_COMMENT = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

export default ({ comment }: ICommentProps) => {
  const [createUpdateOrDeleteThumb] = useMutation(
    CREATE_UPDATE_OR_DELETE_THUMB,
    {
      onCompleted: (data) => {
        toast.success(
          `You voted this comment ${
            data.createUpdateOrDeleteThumb.up ? 'up' : 'down'
          }`
        )
      },
      refetchQueries: [
        {
          query: FindArticleQuery,
          variables: { id: comment.postId, $id: comment.postId },
        },
      ],
    }
  )

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: () => {
      toast.success('Comment deleted')
    },
    refetchQueries: [
      {
        query: FindArticleQuery,
        variables: { id: comment.postId, $id: comment.postId },
      },
    ],
  })

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      deleteComment({ variables: { id: comment.id } })
    }
  }

  const rating = useMemo(() => {
    if (comment.thumbs.filter((t) => !t.up).length === 0) {
      return 1
    }

    const rating =
      comment.thumbs.filter((t) => t.up).length -
        comment.thumbs.filter((t) => !t.up).length >
      0
        ? 0
        : -1

    return rating
  }, [comment.thumbs])

  const ratingOpacity = useMemo(() => {
    if (rating === 0) {
      return 'opacity-90'
    }

    if (rating < 0) {
      return 'opacity-75'
    }

    return ''
  }, [rating])

  const handleThumbClick = (up: boolean) => {
    createUpdateOrDeleteThumb({
      variables: { input: { commentId: comment.id, up } },
    })
  }

  return (
    <div
      className={`rounded-lg bg-slate-100 p-4 transition-opacity ${ratingOpacity} group relative ${
        comment.deleted ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-row items-center gap-4">
        <Avatar
          src={comment.user?.profile?.avatar}
          alt={comment.user.name}
          name={comment.user.name || comment.user.email}
        />

        <div>
          <span className="text-base font-semibold text-slate-700">
            {comment.user.name
              ? comment.user.name
              : comment.user.email
              ? comment.user.email
              : 'Anonymous'}
          </span>
          <span className="ml-2 text-sm text-slate-500">
            |{' '}
            {new Date(comment.createdAt).toLocaleString('nl-NL', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className="ml-auto">
          <Thumbs
            thumbs={comment.thumbs}
            entityId={comment.id}
            onThumb={handleThumbClick}
          />
        </div>
      </div>
      <div className="ml-14 mt-4 text-sm leading-relaxed text-slate-600">
        {comment.body}
      </div>
      <Button
        onClick={handleDelete}
        className="user-select-none absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100"
        color="monza-red"
      >
        Delete
      </Button>
    </div>
  )
}
