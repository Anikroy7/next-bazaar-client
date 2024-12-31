import {
  FaCreditCard,
  FaUsers,
  FaStar,
  FaHistory,
  FaPlusCircle,
  FaUserTie,
  FaListAlt,
} from "react-icons/fa";

export const vendorMenuItems = [
  {
    path: "add-product",
    label: "Add Product",
    icon: <FaPlusCircle className="h-5 w-5" />,
  },
  {
    path: "manage-cupons",
    label: "Manage Cupon",
    icon: <FaPlusCircle className="h-5 w-5" />,
  },
  {
    path: "order-history",
    label: "Order History",
    icon: <FaHistory className="h-5 w-5" />,
  },
];

export const adminMenuItems = [
  {
    path: "manage-customers",
    label: "Manage Customers",
    icon: <FaUsers className="h-5 w-5" />,
  },
  {
    path: "manage-vendors",
    label: "Manage Vendors",
    icon: <FaUserTie className="h-5 w-5" />,
  },
  {
    path: "manage-categories",
    label: "Manage Categories",
    icon: <FaListAlt className="h-5 w-5" />,
  },
  {
    path: "manage-products",
    label: "Manage Product",
    icon: <FaPlusCircle className="h-5 w-5" />,
  },
  /* {
    path: "manage-cupons",
    label: "Manage Cupon",
    icon: <FaPlusCircle className="h-5 w-5" />,
  }, */
  {
    path: "manage-transactions",
    label: "Manage Transactions",
    icon: <FaCreditCard className="h-5 w-5" />,
  },
  {
    path: "manage-reviews",
    label: "Manage Reviews",
    icon: <FaStar className="h-5 w-5" />,
  },
];
