import { FaCreditCard, FaUsers, FaPen, FaStar, FaHistory, FaBoxOpen, FaPlusCircle } from "react-icons/fa";

export const vendorMenuItems = [

  {
    path: "add-product",
    label: "Add Product",
    icon: <FaPlusCircle className="h-5 w-5" />,
  },
  {
    path: "customer-review",
    label: "Customer Reviews",
    icon: <FaStar className="h-5 w-5" />,
  },
  {
    path: "order-history",
    label: "Order History",
    icon: <FaHistory className="h-5 w-5" />
  },
];

// Import the icons you want to use

export const adminMenuItems = [
  {
    path: "manage-customers",
    label: "Manage Customers",
    icon: <FaUsers className="h-5 w-5" />,
  },
  {
    path: "manage-vendors",
    label: "Manage Vendors",
    icon: <FaPen className="h-5 w-5" />,
  },
  {
    path: "manage-products",
    label: "Manage Product",
    icon: <FaPlusCircle className="h-5 w-5" />,
  },
  {
    path: "manage-payments",
    label: "Manage Payments",
    icon: <FaCreditCard className="h-5 w-5" />,
  },
  {
    path: "order-history",
    label: "Order History",
    icon: <FaHistory className="h-5 w-5" />
  },
];
