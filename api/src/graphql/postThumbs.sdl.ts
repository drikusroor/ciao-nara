export const schema = gql`
  type PostThumb {
    id: Int!
    createdAt: DateTime!
    user: User!
    userId: Int!
    post: Post!
    postId: Int!
  }

  type Query {
    postThumbs: [PostThumb!]! @requireAuth
    postThumb(id: Int!): PostThumb @requireAuth
  }

  input CreatePostThumbInput {
    userId: Int!
    postId: Int!
  }

  input UpdatePostThumbInput {
    userId: Int
    postId: Int
  }

  type Mutation {
    createPostThumb(input: CreatePostThumbInput!): PostThumb! @requireAuth
    updatePostThumb(id: Int!, input: UpdatePostThumbInput!): PostThumb!
      @requireAuth
    deletePostThumb(id: Int!): PostThumb! @requireAuth
  }
`
