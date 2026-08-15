import { lazy } from 'react'

export { default as LandingPage } from '../features/landing/LandingPage'
export { default as ProfilePage } from '../features/profile/ProfilePage'
export { default as UmkmListPage } from '../features/umkm/UmkmListPage'
export { default as UmkmDetailPage } from '../features/umkm/UmkmDetailPage'
export { default as NewsListPage } from '../features/news/NewsListPage'
export { default as NewsDetailPage } from '../features/news/NewsDetailPage'
export { default as ContactPage } from '../features/contact/ContactPage'

export const LoginPage = lazy(() => import('../features/auth/LoginPage'))
export const AdminDashboardPage = lazy(() => import('../features/admin/AdminDashboardPage'))
export const ProfileAdminPage = lazy(() => import('../features/admin/ProfileAdminPage'))
export const UmkmAdminPage = lazy(() => import('../features/admin/UmkmAdminPage'))
export const NewsAdminPage = lazy(() => import('../features/admin/NewsAdminPage'))
export const GalleryAdminPage = lazy(() => import('../features/admin/GalleryAdminPage'))
export const NotFoundPage = lazy(() => import('../features/notfound/NotFoundPage'))
