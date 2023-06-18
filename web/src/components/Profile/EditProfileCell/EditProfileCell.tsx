import type { EditProfileById, UpdateProfileInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProfileForm from 'src/components/Profile/ProfileForm'

export const QUERY = gql`
  query EditProfileById($id: Int!) {
    profile: profile(id: $id) {
      id
      bio
      userId
      createdAt
      updatedAt
      avatar
    }
  }
`
const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfileMutation($id: Int!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      id
      bio
      userId
      createdAt
      updatedAt
      avatar
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ profile }: CellSuccessProps<EditProfileById>) => {
  const [updateProfile, { loading, error }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Profile updated')
        navigate(routes.profiles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateProfileInput,
    id: EditProfileById['profile']['id']
  ) => {
    updateProfile({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Profile {profile?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProfileForm
          profile={profile}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
