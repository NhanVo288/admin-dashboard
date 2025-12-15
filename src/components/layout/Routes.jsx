import { lazy } from "react";

const NotFound = lazy(() => import("../../pages/error/NotFound"));
const Dashboard = lazy(() => import("../../pages/dashboard/Overview"));

// Media
const Media = lazy(() => import("../../pages/media/Media.jsx"));

// Settings
const Api = lazy(() => import("../../pages/settings/Api"));
const Email = lazy(() => import("../../pages/settings/Email"));
const General = lazy(() => import("../../pages/settings/General"));
const CronJob = lazy(() => import("../../pages/settings/CronJob"));
const Permalink = lazy(() => import("../../pages/settings/Permalink"));
const Languages = lazy(() => import("../../pages/settings/Languages"));
const SocialLogin = lazy(() => import("../../pages/settings/SocialLogin"));

// Products
const Attribute = lazy(() => import("../../pages/products/Attribute"));
const AddProduct = lazy(() => import("../../pages/products/AddProduct"));
const EditProduct = lazy(() => import("../../pages/products/EditProduct"));
const ManageProduct = lazy(() => import("../../pages/products/ManageProduct"));

// Orders
const AddOrder = lazy(() => import("../../pages/orders/AddOrder"));
const ManageOrder = lazy(() => import("../../pages/orders/ManageOrder"));
const OrderDetail = lazy(() => import("../../pages/orders/OrderDetail"));

// Brand
const AddBrand = lazy(() => import("../../pages/brands/AddBrand"));
const ManageBrand = lazy(() => import("../../pages/brands/ManageBrand"));
const EditBrand = lazy(() => import("../../pages/brands/EditBrand"));

// Customers
const AddCustomer = lazy(() => import("../../pages/customers/AddCustomer"));
const EditCustomer = lazy(() => import("../../pages/customers/EditCustomer"));
const ManageCustomer = lazy(() => import("../../pages/customers/ManageCustomer"));

// Users
const AddUser = lazy(() => import("../../pages/users/AddUser"));
const EditUser = lazy(() => import("../../pages/users/EditUser"));
const UserList = lazy(() => import("../../pages/users/UserList"));

// Venue
const AddVenue = lazy(() => import("../../pages/venue/AddVenue"));
const ManageVenue = lazy(() => import("../../pages/venue/ManageVenue"));

// Categories
const AddCategories = lazy(() => import("../../pages/categories/AddCategories"));
const EditCategories = lazy(() => import("../../pages/categories/EditCategories"));
const ManageCategories = lazy(() => import("../../pages/categories/ManageCategories"));

// Reviews
const ManageReviews = lazy(() => import("../../pages/reviews/ManageReviews"));
const ReviewsDetail = lazy(() => import("../../pages/reviews/ReviewsDetail"));

// Pages
const AddPage = lazy(() => import("../../pages/pages/AddPage"));
const EditPage = lazy(() => import("../../pages/pages/EditPage"));
const ManagePages = lazy(() => import("../../pages/pages/ManagePages"));

// Payment
const ManageTransactions = lazy(() => import("../../pages/payment/ManageTransactions"));
const PaymentMethod = lazy(() => import("../../pages/payment/PaymentMethod"));
const TransactionDetail = lazy(() => import("../../pages/payment/TransactionDetail"));

const routes = [
  { path: "/", element: <Dashboard /> },

  { path: "/catalog/product/add", element: <AddProduct /> },
  { path: "/catalog/product/manage", element: <ManageProduct /> },
  { path: "/catalog/product/manage/:productId", element: <EditProduct /> },
  { path: "/catalog/product/attribute", element: <Attribute /> },

  { path: "/orders/add", element: <AddOrder /> },
  { path: "/orders/manage", element: <ManageOrder /> },
  { path: "/orders/manage/:orderID", element: <OrderDetail /> },

  { path: "/catalog/categories/manage", element: <ManageCategories /> },
  { path: "/catalog/categories/:categoryid", element: <EditCategories /> },

  { path: "/customers/add", element: <AddCustomer /> },
  { path: "/customers/manage", element: <ManageCustomer /> },
  { path: "/customers/manage/:customerId", element: <EditCustomer /> },

  { path: "/brands/add", element: <AddBrand /> },
  { path: "/brands/manage", element: <ManageBrand /> },
  { path: "/brands/manage/:brandId", element: <EditBrand /> },

  { path: "/users/list", element: <UserList /> },
  { path: "/users/add", element: <AddUser /> },
  { path: "/users/list/:userid", element: <EditUser /> },

  { path: "/venue/add", element: <AddVenue /> },
  { path: "/venue/manage", element: <ManageVenue /> },

  { path: "/reviews", element: <ManageReviews /> },
  { path: "/reviews/:reviewid", element: <ReviewsDetail /> },

  { path: "/pages", element: <ManagePages /> },
  { path: "/pages/add", element: <AddPage /> },
  { path: "/pages/:pageId", element: <EditPage /> },

  { path: "/payment/transactions", element: <ManageTransactions /> },
  { path: "/payment/transactions/:transactionId", element: <TransactionDetail /> },
  { path: "/payment/payment-method", element: <PaymentMethod /> },

  { path: "/media", element: <Media /> },

  { path: "/setting/general", element: <General /> },
  { path: "/setting/email", element: <Email /> },
  { path: "/setting/cronJob", element: <CronJob /> },
  { path: "/setting/permalink", element: <Permalink /> },
  { path: "/setting/languages", element: <Languages /> },
  { path: "/setting/social-login", element: <SocialLogin /> },
  { path: "/setting/api", element: <Api /> },

  { path: "*", element: <NotFound /> },
];

export default routes;
