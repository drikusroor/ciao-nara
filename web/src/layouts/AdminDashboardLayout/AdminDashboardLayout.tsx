import { useCallback } from 'react'

import {
  BsBoxArrowUp,
  BsFillHouseFill,
  BsFillJournalBookmarkFill,
  BsFillPersonFill,
  BsFillPersonVcardFill,
  BsJournals,
} from 'react-icons/bs'

import { Link, routes } from '@redwoodjs/router'
import { useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'

interface MenuItem {
  name: string
  path: string
  activeRoutePattern?: string
  roles?: string[]
  icon?: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: <BsFillHouseFill />,
  },
  {
    name: 'Posts',
    path: '/admin/posts',
    activeRoutePattern: '/posts',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsJournals />,
  },
  {
    name: 'My Posts',
    path: '/admin/my-posts',
    activeRoutePattern: '/my-posts',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsFillJournalBookmarkFill />,
  },
  {
    name: 'Account',
    path: '/admin/account',
    activeRoutePattern: '/account',
    icon: <BsFillPersonFill />,
  },
  {
    name: 'Profile',
    path: '/admin/profile/self',
    activeRoutePattern: '/profile',
    icon: <BsFillPersonVcardFill />,
  },
]

type AdminDashboardLayoutProps = {
  children?: React.ReactNode
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const { pathname } = useLocation()

  const getIsActiveClass = useCallback(
    (path: string) => {
      if (!pathname) return ''

      return pathname.includes(path) ? 'border-r-4 border-gray-700' : ''
    },
    [pathname]
  )

  return (
    <div className="flex flex-row">
      <div className="fixed flex h-screen w-14 flex-col justify-between bg-gray-200 lg:w-64">
        <div>
          <div className="p-1 lg:p-3 lg:text-center">
            <h1 className="flex items-center justify-between text-xl font-bold lg:text-3xl">
              <span className="hidden lg:inline">Dashboard</span>
              <img
                className="inline h-12 w-12"
                alt="Logo"
                src="/images/logo.png"
                width="48"
                height="48"
              />
            </h1>
          </div>
          <nav>
            <ul className="flex flex-col gap-1 py-2 lg:my-4">
              {menuItems.map((item) => {
                const isAllowed =
                  !item.roles ||
                  currentUser?.roles?.some((r) =>
                    item.roles.includes(r as string)
                  )

                if (!isAllowed) return null

                return (
                  <Link
                    key={item.name}
                    className={`dashboard-item flex items-center gap-2 ${getIsActiveClass(
                      item.activeRoutePattern
                    )}`}
                    to={item.path}
                  >
                    <span className="mx-auto text-lg lg:mx-0">{item.icon}</span>
                    <span className="hidden lg:inline-block">{item.name}</span>
                  </Link>
                )
              })}
            </ul>
          </nav>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center justify-between bg-slate-500 p-1 text-white lg:p-3">
            <span className="hidden lg:block">
              Logged in as {currentUser.email.split('@')[0]}
            </span>
            <Button
              onClick={logOut}
              color="monza-red"
              className="flex items-center gap-2 px-4 py-3 lg:text-sm"
            >
              <BsBoxArrowUp />
              <span className="hidden lg:block ">Uitloggen</span>
            </Button>
          </div>
        ) : (
          <Link to={routes.login()}>Inloggen</Link>
        )}
      </div>
      <div className=":pl-64 flex flex-1 flex-col overflow-auto pl-14">
        {children}
      </div>
    </div>
  )
}

export default AdminDashboardLayout
