import { NavBar } from '@/components/NavBar';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import FocusElement from '@/components/FocusElement';

export function createRouter() {
  return createBrowserRouter([
    {
      element: (
        <>
          <NavBar />
          <FocusElement>
            <Outlet />
          </FocusElement>
        </>
      ),
      children: [
        {
          path: '/',
          lazy: async () => {
            const { About } = await import('./About');
            return { Component: About };
          },
        },
        {
          path: '/about',
          lazy: async () => {
            const { About } = await import('./About');
            return { Component: About };
          },
        },
        {
          path: '/gallery',
          lazy: async () => {
            const { Gallery } = await import('./Gallery');
            return { Component: Gallery };
          },
        },
        {
          path: '/commissions',
          lazy: async () => {
            const { Commissions } = await import('./Commissions');
            return { Component: Commissions };
          },
        },
        {
          path: '/ocs',
          lazy: async () => {
            const { OCs } = await import('./OCs');
            return { Component: OCs };
          },
        },
        {
          path: '/queue',
          lazy: async () => {
            const { Queue } = await import('./Queue');
            return { Component: Queue };
          },
        },
        {
          path: '/login',
          lazy: async () => {
            const { AdminLogin } = await import('./AdminLogin');
            return { Component: AdminLogin };
          },
        },
        {
          path: '/apanel',
          lazy: async () => {
            const { AdminPanel } = await import('./AdminPanel');
            return { Component: AdminPanel };
          },
        },
        {
          path: '*',
          lazy: async () => {
            const { NotFound } = await import('./NotFound');
            return { Component: NotFound };
          },
        },
      ],
    },
  ]);
}
