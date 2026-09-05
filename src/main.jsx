import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router";
import AuthProvider from "./providers/AuthProvider";
import SmoothScroll from "./providers/SmoothScroll";
import { Toaster } from "react-hot-toast";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <SmoothScroll />
          <RouterProvider router={router} />
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);