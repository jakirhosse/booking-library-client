import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Route'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async'
import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from './Providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
AOS.init();
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <HelmetProvider >
   <QueryClientProvider client={queryClient}>
   <AuthProvider>
   <RouterProvider router={router}>
   </RouterProvider>
   <Toaster></Toaster>
   </AuthProvider>
   </QueryClientProvider>
   </HelmetProvider>
  </StrictMode>,
)
