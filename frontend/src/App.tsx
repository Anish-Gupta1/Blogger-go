import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Blogs } from "./pages/blogs";
import { Blog } from "./pages/blog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          {/* <Route path="/publish" element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
