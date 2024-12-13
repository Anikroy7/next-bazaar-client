import Banner from "@/src/components/ui/homepage/Banner";
import Category from "@/src/components/ui/homepage/Category";
import FlashSaleProducts from "@/src/components/ui/homepage/FlashSaleProducts";
import RecomendedProduct from "@/src/components/ui/homepage/RecomendedProdut";
import ScrollToTop from "@/src/components/ui/homepage/ScrollToTop";
import { Toaster } from 'sonner';


export default function Home() {
  
  return (
    <>
      <Banner></Banner>
      <Category />
      <RecomendedProduct />
      <FlashSaleProducts />
      <ScrollToTop />
      {/*   <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Categories</h2>
          <div className="flex gap-4 overflow-x-auto">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Electronics
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Fashion
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Home & Kitchen
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Beauty
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Sports
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Flash Sale</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/150" alt="Product" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700">Flash Product 1</h3>
                <p className="text-sm text-gray-500">$25.00</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              View All Flash Sales
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">All Products</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <select className="px-4 py-2 border rounded-lg text-gray-600">
                <option>Price Range</option>
                <option>$0 - $50</option>
                <option>$50 - $100</option>
              </select>
              <select className="px-4 py-2 border rounded-lg text-gray-600">
                <option>Category</option>
                <option>Electronics</option>
                <option>Fashion</option>
              </select>
            </div>
            <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-lg w-1/3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/150" alt="Product" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700">Product 1</h3>
                <p className="text-sm text-gray-500">$20.00</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Load More Products
            </button>
          </div>
        </div>

        <button id="scrollToTop" className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
          ↑
        </button>
      </div> */}
     
    </>
  );
}
