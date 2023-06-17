import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  return (
    <>
      <header className="w-full pb-5 text-center">
        {isAuthenticated && currentUser && (
          <div className="flex items-center justify-between bg-slate-500 p-3 text-white">
            <span>Logged in as {currentUser.email}</span>
            <ul className="flex gap-3">
              <li>
                <Link
                  className="block rounded bg-cobalt-blue px-3 py-2 text-xs font-semibold uppercase text-white transition hover:brightness-110 hover:filter "
                  to={routes.admin()}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="block rounded bg-monza-red px-3 py-2 text-xs font-semibold uppercase text-white transition hover:brightness-110 hover:filter "
                  onClick={logOut}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        <Link to={routes.home()} title="Ohayou Goededagu" aria-label="Home">
          <img
            src="/images/logo.png"
            className="mx-auto origin-top rounded-b-full shadow-lg transition duration-500 ease-in-out hover:scale-110 hover:transform hover:shadow-xl"
            alt="Logo Ohayo Goededagu"
            width={128}
            height={128}
          />
        </Link>
        <h1 className="pt-3 text-3xl font-bold">
          Ohayou Goededagu | おはよ グデダギュ
        </h1>
        <pre className="mt-3">Japan 2023</pre>
        <nav>
          <ul className="mt-3 flex justify-center gap-5">
            <li>
              <Link className="rw-button" to={routes.home()}>
                Blog
              </Link>
            </li>
            <li>
              <Link className="rw-button" to={routes.about()}>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-xl">{children}</main>
    </>
  )
}

export default BlogLayout
