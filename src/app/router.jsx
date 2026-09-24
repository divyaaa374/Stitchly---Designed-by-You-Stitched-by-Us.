import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts & Guards
import PublicLayout from './layouts/PublicLayout';
import CustomerLayout from './layouts/CustomerLayout';
import TailorLayout from './layouts/TailorLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './guards/ProtectedRoute';
import RoleGuard from './guards/RoleGuard';
import NeedleLoader from '../components/motifs/NeedleLoader';

// Lazy-loaded feature pages for clean code splitting
const LandingPage = lazy(() => import('../features/landing/LandingPage'));
const HowItWorksPage = lazy(() => import('../features/public/HowItWorksPage'));
const TailorsPage = lazy(() => import('../features/public/TailorsPage'));
const InspirationPage = lazy(() => import('../features/public/InspirationPage'));
const LoginPage = lazy(() => import('../features/auth/LoginPage'));
const SignupPage = lazy(() => import('../features/auth/SignupPage'));
const OnboardingPage = lazy(() => import('../features/auth/OnboardingPage'));
const NotFoundPage = lazy(() => import('../features/public/NotFoundPage'));

// Protected Customer Pages
const CustomerDashboard = lazy(() => import('../features/customer/CustomerDashboard'));
const CustomerOrders = lazy(() => import('../features/customer/CustomerOrders'));
const CustomerMeasurements = lazy(() => import('../features/customer/CustomerMeasurements'));

// Protected Tailor Pages
const TailorDashboard = lazy(() => import('../features/tailor/TailorDashboard'));
const TailorOrders = lazy(() => import('../features/tailor/TailorOrders'));
const TailorProfile = lazy(() => import('../features/tailor/TailorProfile'));

// Protected Admin Pages
const AdminDashboard = lazy(() => import('../features/admin/AdminDashboard'));
const AdminTailors = lazy(() => import('../features/admin/AdminTailors'));

const PageFallback = () => (
  <div className="min-h-[70vh] flex items-center justify-center bg-cream">
    <NeedleLoader size="md" text="Loading atelier canvas..." />
  </div>
);

export const router = createBrowserRouter([
  // Public Routes Shell
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: 'how-it-works',
        element: (
          <Suspense fallback={<PageFallback />}>
            <HowItWorksPage />
          </Suspense>
        ),
      },
      {
        path: 'tailors',
        element: (
          <Suspense fallback={<PageFallback />}>
            <TailorsPage />
          </Suspense>
        ),
      },
      {
        path: 'inspiration',
        element: (
          <Suspense fallback={<PageFallback />}>
            <InspirationPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<PageFallback />}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: 'onboarding',
        element: (
          <Suspense fallback={<PageFallback />}>
            <OnboardingPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },

  // Protected Customer Shell (/app/*)
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={['customer']}>
          <CustomerLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <CustomerDashboard />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<PageFallback />}>
            <CustomerOrders />
          </Suspense>
        ),
      },
      {
        path: 'measurements',
        element: (
          <Suspense fallback={<PageFallback />}>
            <CustomerMeasurements />
          </Suspense>
        ),
      },
      {
        path: 'saved',
        element: (
          <Suspense fallback={<PageFallback />}>
            <CustomerDashboard />
          </Suspense>
        ),
      },
    ],
  },

  // Protected Tailor Shell (/tailor/*)
  {
    path: '/tailor',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={['tailor']}>
          <TailorLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <TailorDashboard />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<PageFallback />}>
            <TailorOrders />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<PageFallback />}>
            <TailorProfile />
          </Suspense>
        ),
      },
      {
        path: 'earnings',
        element: (
          <Suspense fallback={<PageFallback />}>
            <TailorDashboard />
          </Suspense>
        ),
      },
    ],
  },

  // Protected Admin Shell (/admin/*)
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={['admin']}>
          <AdminLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: 'tailors',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AdminTailors />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: 'metrics',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
