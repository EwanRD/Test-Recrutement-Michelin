import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Overview from "./pages/overview";
import Dashboard from "./pages/dashboard";
import Books from "./pages/books";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <Dashboard />,
          children: [
            {
              path: "",
              element: <Overview />,
            },
            {
              path: "/books",
              element: <Books />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
