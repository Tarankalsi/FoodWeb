import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { productsAtom, selectedCategoriesAtom, sortOrderAtom } from '../../store/atoms/atoms';
import axios from 'axios';

export default function ProductFilter({setLoading } : {setLoading : any} ) {
  const [sortOrder, setSortOrder] = useRecoilState(sortOrderAtom);
  const [selectedCategories, setSelectedCategories] = useRecoilState(selectedCategoriesAtom);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useRecoilState(productsAtom);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://world.openfoodfacts.org/categories.json');
        setCategories(response.data.tags);
      } catch (error) {
        console.error('There has been a problem with your fetching Categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSort = (order: string) => {
    setSortOrder(order);
    setLoading(true)
    let sortedProducts = [...products];

    switch (order) {
      case 'nameAsc':
        sortedProducts.sort((a : any, b : any) => a.product_name.localeCompare(b.product_name));
        break;
      case 'nameDesc':
        sortedProducts.sort((a : any, b : any) => b.product_name.localeCompare(a.product_name));
        break;
      case 'nutritionAsc':
        sortedProducts.sort((a : any, b : any) => a.nutrition_grades?.localeCompare(b.nutrition_grades) || 0);
        break;
      case 'nutritionDesc':
        sortedProducts.sort((a : any, b : any) => b.nutrition_grades?.localeCompare(a.nutrition_grades) || 0);
        break;
    }
    console.log(sortedProducts)
    setProducts(sortedProducts);
    setLoading(false)
  };

  const handleSortChange = (e: any) => {
    handleSort(e.target.value);
    console.log('Selected Sort Order:', e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item : any) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md mr-1">
      {/* Sort By Section */}
      <h3 className="text-2xl font-bold text-gray-800 mb-3">Sort by</h3>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="px-4 py-2 bg-white border w-full border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-150 ease-in-out"
        >
          <option value="nameAsc">Name A-Z</option>
          <option value="nameDesc">Name Z-A</option>
          <option value="nutritionAsc">Nutrition Grade (low to high)</option>
          <option value="nutritionDesc">Nutrition Grade (high to low)</option>
        </select>
      </div>

      {/* Categories Section */}
      <div>
        <h3 className="text-base font-bold text-gray-800 mb-3">Categories</h3>
        <div className="flex flex-col space-y-2">
          {categories.map((category: any) => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category.name}
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
