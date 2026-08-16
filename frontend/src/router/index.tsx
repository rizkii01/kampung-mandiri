import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import AdminLayout from '../components/layout/AdminLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import Spinner from '../components/ui/Spinner'
import {
  AboutPage,
  AdminDashboardPage,
  ContactPage,
  GalleryAdminPage,
  LandingPage,
  LoginPage,
  NewsAdminPage,
  NewsDetailPage,
  NewsListPage,
  NotFoundPage,
  ProfileAdminPage,
  ProfilePage,
  UmkmAdminPage,
  UmkmDetailPage,
  UmkmListPage,
} from './lazyPages'

const withSuspense = (element: React.ReactNode) => (
  <Suspense
    fallback={
      <div className="flex min-h-[55vh] items-center justify-center py-10">
        <Spinner />
      </div>
    }
  >
    {element}
  </Suspense>
)

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: withSuspense(<LandingPage />) },
      { path: '/profil', element: withSuspense(<ProfilePage />) },
      { path: '/tentang', element: withSuspense(<AboutPage />) },
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
        children: [
          { path: '/admin', element: withSuspense(<AdminDashboardPage />) },
          { path: '/admin/profil', element: withSuspense(<ProfileAdminPage />) },
          { path: '/admin/umkm', element: withSuspense(<UmkmAdminPage />) },
          { path: '/admin/kegiatan', element: withSuspense(<NewsAdminPage />) },
          { path: '/admin/galeri', element: withSuspense(<GalleryAdminPage />) },
        ],
      },
    ],
  },
  { path: '*', element: withSuspense(<NotFoundPage />) },
])
