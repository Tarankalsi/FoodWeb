import { useEffect, useState } from "react";
import ProductFilter from "../components/general/ProductFilter";
import ProductCard from "../components/ProductPage/ProductCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsAtom, selectedCategoriesAtom } from "../store/atoms/atoms";
import axios from "axios";
import ProductCardSkeleton from "../components/Loaders/ProductCardSkeleton";

// Define the product type
interface Product {
    id: string;
    product_name: string;
    nutrition_grades: string;
    ingredients: { text: string }[];
    image_url: string;
    code: string;
}

export default function LandingPage() {
    const [products, setProducts] = useRecoilState(productsAtom); 
    const [loading, setLoading] = useState(true);
    const [selectedCategories] = useRecoilValue(selectedCategoriesAtom);
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://world.openfoodfacts.net/api/v2/search`, 
                    {
                        params: {
                            categories_tags_en: selectedCategories,
                            fields: 'product_name,nutrition_grades,ingredients,image_url,id,code',
                            page: page,
                        },
                    }
                );
                
 
                if (page === 1) {
                    setProducts(response.data.products); 
                } else {
                    setProducts((prev) => [...prev, ...response.data.products]);
                }
                setHasMore(response.data.products.length > 0); 
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategories, page]);

  
    useEffect(() => {
        setProducts([]);  
        setPage(1);       
    }, [selectedCategories]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading && hasMore) {
                setPage((prevPage) => prevPage + 1); 
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 p-4 ">
      
            <div className="col-span-3 bg-white p-4 rounded-md">
                <ProductFilter setLoading={setLoading} />
            </div>


            <div className="col-span-8 bg-white p-4 rounded-md">
                <h2 className="ml-6 text-3xl font-bold mb-4">Featured Products</h2>
                <div className="flex flex-wrap items-start gap-6 p-4">
                    {loading && products.length === 0 ? (

                        Array.from({ length: 6 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    ) : (

                        products.map((product: Product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    )}
                </div>

                {loading && products.length > 0 && (

                    <div className="flex justify-center mt-4">
                        <ProductCardSkeleton />
                    </div>
                )}
            </div>
        </div>
    );
}
