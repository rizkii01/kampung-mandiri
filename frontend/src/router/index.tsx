import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import AdminLayout from '../components/layout/AdminLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import Spinner from '../components/ui/Spinner'
import {
  AdminDashboardPage,
  ContactPage,
  LandingPage,
  LoginPage,
  NewsDetailPage,
  NewsListPage,
  NotFoundPage,
  ProfilePage,
  UmkmDetailPage,
  UmkmListPage,
} from './lazyPages'

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<Spinner />}>{element}</Suspense>
)

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: withSuspense(<LandingPage />) },
      { path: '/profil', element: withSuspense(<ProfilePage />) },
      { path: '/umkm', element: withSuspense(<UmkmListPage />) },
      { path: '/umkm/:id', element: withSuspense(<UmkmDetailPage />) },
      { path: '/kegiatan', element: withSuspense(<NewsListPage />) },
      { path: '/kegiatan/:id', element: withSuspense(<NewsDetailPage />) },
      { path: '/kontak', element: withSuspense(<ContactPage />) },
    ],
  },
  { path: '/login', element: withSuspense(<LoginPage />) },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [{ path: '/admin', element: withSuspense(<AdminDashboardPage />) }],
      },
    ],
  },
  { path: '*', element: withSuspense(<NotFoundPage />) },
])
