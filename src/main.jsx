import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import { BrowserRouter } from "react-router";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <ChakraProvider theme={theme}> */}
        <App />
        {/* </ChakraProvider> */}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
