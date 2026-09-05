import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router";
import AuthProvider from "./providers/AuthProvider";
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
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);