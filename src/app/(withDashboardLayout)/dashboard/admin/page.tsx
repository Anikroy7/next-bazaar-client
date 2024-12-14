import { Card } from "@nextui-org/card";
import { FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";

const AdminDashboard = () => {
    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">Business Analytics</h1>

            {/* Top section with analytics summary */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <Card className="p-4 flex-1">
                    <div className="flex items-center">
                        <FaShoppingCart className="text-3xl mr-3" />
                        <div>
                            <h4 className="text-2xl font-bold">1,024</h4>
                            <h4 className="text-sm">Total Orders</h4>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 flex-1">
                    <div className="flex items-center">
                        <FaDollarSign className="text-3xl mr-3" />
                        <div>
                            <h3 className="text-2xl font-bold">$58,273</h3>
                            <h3 className="text-sm">Revenue</h3>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 flex-1">
                    <div className="flex items-center">
                        <FaBoxOpen className="text-3xl mr-3" />
                        <div>
                            <h3 className="text-2xl font-bold">847</h3>
                            <h3 className="text-sm">Products Sold</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Graph sections */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Orders Summary */}
                <Card className="p-4 flex-1">
                    <h3 className="text-lg font-bold mb-4">Orders Summary</h3>
                    <div className="bg-purple-500 h-48 rounded-md" />
                </Card>

                {/* Revenue Summary */}
                <Card className="p-4 flex-1">
                    <h3 className="text-lg font-bold mb-4">Revenue Summary</h3>
                    <div className="bg-cyan-500 h-48 rounded-md" />
                </Card>

                {/* Products Sold Summary */}
                <Card className="p-4 flex-1">
                    <h3 className="text-lg font-bold mb-4">Products Sold Summary</h3>
                    <div className="bg-teal-500 h-48 rounded-md" />
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
