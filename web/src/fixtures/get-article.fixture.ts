import { Role } from 'src/types/role'

import { EPostType } from '../components/ArticleTypeIcon/ArticleTypeIcon'

export const getArticle = (overrides = {}) => ({
  id: 1,
  title: 'My First Article',
  body: 'Lorem ipsum dolor _sit_ amet, **consectetur** *adipiscing* __elit__. Donec a diam [lectus](https://example.com). \n\n Sed sit amet ipsum mauris. \n ## Little heading',
  type: EPostType.ARTICLE,
  comments: [
    {
      id: 1,
      name: 'John Doe',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
      createdAt: '2021-07-01T19:24:00.000Z',
      updatedAt: '2021-07-01T19:24:00.000Z',
      deleted: false,
      thumbs: [],
      postId: 1,
      children: [],
      user: {
        id: 1,
        email: 'info@example.com',
        name: 'John Doe',
        roles: [Role.ADMIN],
        profile: {
          id: 1,
          name: 'John Doe',
          userId: 1,
          user: null,
          posts: [],
          createdAt: '2021-07-01T19:24:00.000Z',
          updatedAt: '2021-07-01T19:24:00.000Z',
        },
        posts: [],
      },
      userId: 1,
      post: null,
    },
  ],
  createdAt: '2021-07-01T19:24:00.000Z',
  updatedAt: '2021-07-01T19:24:00.000Z',
  published: true,
  user: {
    id: 1,
    email: 'info@example.com',
    name: 'John Doe',
    profile: {
      id: 1,
      name: 'John Doe',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
      avatar: null,
      userId: 1,
      user: null,
      posts: [],
      createdAt: '2021-07-01T19:24:00.000Z',
      updatedAt: '2021-07-01T19:24:00.000Z',
    },
    posts: [],
    roles: [Role.ADMIN],
  },
  ...overrides,
})

export default getArticle
