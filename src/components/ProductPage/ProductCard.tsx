
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }: { product: any }) {
    const navigate = useNavigate();

    const handleAddToCart = () => {
        // Add product to cart logic here
        console.log(`${product.product_name} added to cart.`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-5000 p-4 w-full h-80 sm:w-64 mx-auto group cursor-pointer">
            <div
                onClick={() => {
                    navigate(`/product/${product.code}`);
                }}
                className="h-full flex flex-col"
            >
             
                <div className="h-56 overflow-hidden mb-3 flex justify-center">
                    <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="h-full"
                    />
                </div>

     
                <div className="flex flex-col h-full">
         
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                        {product.product_name}
                    </h2>

  
                    <div className="mb-2">
                        <span className="text-sm font-semibold">Ingredients: </span>
                        {product.ingredients && product.ingredients.slice(0, 3).map((ingredient: any, index: number) => (
                            <span key={index} className="text-xs">{ingredient.text}{index < 2 && ', '}</span>
                        ))}
                        {product.ingredients && product.ingredients.length > 3 && <span className="text-xs">...</span>}
                    </div>

     
                    <div className="flex items-center mb-4">
                        <span className="font-semibold text-sm text-gray-700">Nutrition Grade:</span>
                        <div
                            className={`ml-2 px-3 py-1 rounded-full text-xs font-bold text-white ${
                                product.nutrition_grades === 'a'
                                    ? 'bg-green-500'
                                    : product.nutrition_grades === 'b'
                                    ? 'bg-green-400'
                                    : product.nutrition_grades === 'c'
                                    ? 'bg-yellow-400'
                                    : product.nutrition_grades === 'd'
                                    ? 'bg-orange-500'
                                    : 'bg-red-500'
                            }`}
                        >
                            {product.nutrition_grades.toUpperCase()}
                        </div>
                    </div>


                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                        }}
                        className="mt-auto bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors duration-200"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
