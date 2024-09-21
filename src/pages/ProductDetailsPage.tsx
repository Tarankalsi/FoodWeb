import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome component
import { faShoppingCart, faCircle } from '@fortawesome/free-solid-svg-icons'; // Import shopping cart & circle icons
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NutriRow from '../components/ProductPage/NutriRow';

export default function ProductDetailsPage() {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${productId}.json&additives_tags_en=e322&fields=product_name,image_url,nutrition_grades,code,id,nutriments,labels,ingredients`);
            setProduct(response.data.product);
        };
        fetchProduct();
    }, [productId]);

    return (
        <div className="max-w-7xl mx-auto p-6 lg:p-10">
            {product && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Product Image and Labels */}
                    <div className="flex flex-col items-center ">
                        <img
                            src={product.image_url}
                            alt={product.product_name}
                            className="max-w-lg rounded-lg shadow-lg"
                        />

                        {/* Product Labels */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {product.labels?.split(",").map((label) => (
                                <span
                                    key={label}
                                    className="px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm shadow-sm"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between">
                        {/* Product Name and Nutrition Grade */}
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold text-gray-900">{product.product_name}</h1>

                            {/* Nutrition Grade */}
                            <div className="flex items-center">
                                <span className="font-semibold text-lg text-gray-700">Nutrition Grade:</span>
                                <div
                                    className={`ml-3 px-3 py-1 rounded-full text-sm font-bold text-white ${
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
                                    {product.nutrition_grades?.toUpperCase()}
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {product.ingredients.reduce((rows, ingredient, index) => {
                                        if (index % 10 === 0) rows.push([]);
                                        rows[rows.length - 1].push(ingredient.text);
                                        return rows;
                                    }, []).map((row, rowIndex) => (
                                        <div key={rowIndex} className="flex flex-col space-y-2">
                                            {row.map((ingredient, index) => (
                                                <span
                                                    key={index}
                                                    className="flex items-center text-gray-700"
                                                >
                                                    <FontAwesomeIcon icon={faCircle} className="text-xs text-gray-400 mr-2" />
                                                    {ingredient}
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="flex items-center justify-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg mt-6 shadow-md transition duration-300">
                            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                            <span className="text-lg font-medium">Add to Cart</span>
                        </button>
                    </div>

                    {/* Nutritional Information */}
                    <div className="col-span-1 lg:col-span-2 mt-12">
                        <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">Nutritional Values</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border rounded-lg shadow-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nutrient</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount per 100g</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Nutritional Rows */}
                                    <NutriRow label="Carbohydrates" value={product.nutriments.carbohydrates_100g} unit={product.nutriments.carbohydrates_unit} />
                                    <NutriRow label="Proteins" value={product.nutriments.proteins_100g} unit={product.nutriments.proteins_unit} />
                                    <NutriRow label="Fat" value={product.nutriments.fat_100g} unit={product.nutriments.fat_unit} />
                                    <NutriRow label="Saturated Fat" value={product.nutriments['saturated-fat_100g']} unit={product.nutriments['saturated-fat_unit']} />
                                    <NutriRow label="Sugars" value={product.nutriments.sugars_100g} unit={product.nutriments.sugars_unit} />
                                    <NutriRow label="Salt" value={product.nutriments.salt_100g} unit={product.nutriments.salt_unit} />
                                    <NutriRow label="Energy (kJ)" value={product.nutriments['energy-kj_100g']} unit="kJ" />
                                    <NutriRow label="Energy (kcal)" value={product.nutriments['energy-kcal_100g']} unit="kcal" />
                                    <NutriRow label="Sodium" value={product.nutriments.sodium_100g} unit={product.nutriments.sodium_unit} />
                                    <NutriRow label="Fruits/Vegetables/Nuts" value={product.nutriments['fruits-vegetables-nuts-estimate-from-ingredients_100g']} unit="%" />
                                    <NutriRow label="Carbon Footprint (Product)" value={product.nutriments['carbon-footprint-from-known-ingredients_product']} unit="g" />
                                    <NutriRow label="Carbon Footprint (Serving)" value={product.nutriments['carbon-footprint-from-known-ingredients_serving']} unit="g" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
