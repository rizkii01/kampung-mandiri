import { lazy } from 'react'

export const LandingPage = lazy(() => import('../features/landing/LandingPage'))
export const ProfilePage = lazy(() => import('../features/profile/ProfilePage'))
export const UmkmListPage = lazy(() => import('../features/umkm/UmkmListPage'))
export const UmkmDetailPage = lazy(() => import('../features/umkm/UmkmDetailPage'))
export const NewsListPage = lazy(() => import('../features/news/NewsListPage'))
export const NewsDetailPage = lazy(() => import('../features/news/NewsDetailPage'))
export const ContactPage = lazy(() => import('../features/contact/ContactPage'))
export const LoginPage = lazy(() => import('../features/auth/LoginPage'))
export const AdminDashboardPage = lazy(() => import('../features/admin/AdminDashboardPage'))
export const NotFoundPage = lazy(() => import('../features/notfound/NotFoundPage'))
