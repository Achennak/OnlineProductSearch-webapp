
import PropertyCard from './PropertyCard';
import './index.css'
import './bootstrap.min.css'
import { useEffect } from 'react';
import NavbarComponent from '../NavbarComponent';
import SearchComponent from '../../components/SearchComponent';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { findProductsThunk } from '../../services/home-page-thunks';
import { findCategoriesThunk } from '../../services/categories.thunks';
import SelectComponent from '../../components/SelectComponent';
import ReactLoading from 'react-loading';


function HomeScreen() {
    const { products, loading } = useSelector((state) => state.products);
    const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);
    const {currentUser} = useSelector((state) => state.user);

    const profile = useSelector((state) => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findProductsThunk({ userID: profile.id, categoryName: "" }))
        dispatch(findCategoriesThunk())
    }, [])

    const [filter, setFilter] = useState('');

    const [category, setCategory] = useState('')

    const handleCategorySelection = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        if (selectedCategory) {
            dispatch(findProductsThunk({ userID: profile.id, categoryName: selectedCategory }))
        }
    }

    console.log(loading, products)

    return (
        <>

            {
                currentUser && <h3>welcome {currentUser.userName}</h3>
            }
            {
                categoriesLoading && loading &&
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}

                >      <ReactLoading type="balls" color="#0000FF"
                    height={100} width={50} /></div>

            }

            {
                !loading &&
                <div className='container-fluid wd-container '>
                    <div>
                        <NavbarComponent />
                    </div>
                    <div className="wd-search-filter">
                        <div className="wd-search">
                            <SearchComponent placeHolder="Search for Products..." onSearch={(res) => { setFilter(res) }} />
                        </div>
                        <div className="wd-filter">
                            {
                                !categoriesLoading &&
                                <SelectComponent
                                    selectedValue={category}
                                    handleSelection={handleCategorySelection}
                                    values={categories}
                                    label="Category"
                                    name="category"
                                />
                            }
                        </div>
                    </div>
                    <div className="wd-mt-40">
                        <div className="row wd-mb-80 wd-home-gallery wd-products-container">
                            {
                                products.filter(p => p.title?.includes(filter) || filter === '').length === 0 ? <h3>sorry no properties found :(</h3> :
                                    products.filter(
                                        p => p.title?.includes(filter) || filter === '')
                                        .map(property => <PropertyCard key={property.id} property={property} />)

                            }
                        </div>
                    </div>
                    <div>FOOTER</div>
                </div>
            }

        </>

    );

}

export default HomeScreen;