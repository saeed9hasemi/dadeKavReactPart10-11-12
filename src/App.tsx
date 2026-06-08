import { Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Layout from "./components/layout/Layout";
import Users from "./pages/users/Users";
import AddUsers from "./pages/addUser/AddUsers";
import EditUsers from "./pages/editUser/EditUsers";
import Login from "./pages/login/Login";
import PrivateRoute from "./components/privateRoute/privateRoute";
import PrivateRouteReverse from "./components/privateRouteReverse/PrivateRouteReverse";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <>
      <Layout>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRouteReverse />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/users/addUser" element={<AddUsers />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="users/edit/:id" element={<EditUsers />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Layout>
    </>
  );
}

export default App;
