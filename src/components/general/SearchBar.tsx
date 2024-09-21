import { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { productsAtom } from '../../store/atoms/atoms';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';


export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name'); 
  const [, setProducts] = useRecoilState(productsAtom);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); 
  
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true); 


    try {
      if (searchType === 'name') {
        const response = await axios.get(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&json=true&fields=product_name,image_url,nutrition_grades,code,id,nutriments,labels,ingredients`
        );
        setProducts(response.data.products);
        navigate(`../`);
      } else {

        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${searchQuery}.json`
        );
        if (response.data.status === 1) {
          navigate(`/product/${response.data.code}`);
        } else {
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false); 
    }

  };

  return (
    <div className='flex items-center bg-gray-100 rounded-full px-4 py-1.5 w-full max-w-xs shadow-inner'>
      <FontAwesomeIcon icon={faSearch} className='text-gray-500' />

      <input
        type='text'
        placeholder={`Search by`}
        className='bg-transparent outline-none border-none ml-2 w-full text-gray-700'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={loading} 
      />

      <select
        className='ml-2 bg-transparent text-gray-700'
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        disabled={loading} 
      >
        <option value='name'>Name</option>
        <option value='barcode'>Barcode</option>
      </select>

      <button
        onClick={handleSearch}
        className='ml-2 bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full'
        disabled={loading} 
      >
        Search
      </button>

      <Modal show={showModal} onClose={() => setShowModal(false)} message="Product Not Found" />


     
    </div>
  );
}
