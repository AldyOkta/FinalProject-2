import { Fragment, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { initiateProducts } from "../../redux/ProductsSlice";
import { getProducts } from "../../api";
import Header from "../../components/Header";
import ProductCards from "../../components/ProductCards";
import SectionHeader from "../../components/SectionHeader";
import Banner from "../../components/Banner";

const Home = () => {
    const products = useSelector((state) => state.products.products);
    
    const firstRender = useSelector((state) => state.products.firstRender);

    const dispatch = useDispatch();

    useEffect(() => {
        getProducts().then(res => {
            const tempData = res.data?.map((item) => {
                return { ...item, quantity: 20 }
            });

            if (firstRender) {
                dispatch(initiateProducts(tempData));
            }
        });
    }, [firstRender, dispatch]);

    return (
        <Fragment>
            <Header />
            <Banner />
            <SectionHeader title="Products" />
            {
                products ?
                    <ProductCards data={products} />
                    :
                    <InfinitySpin color="black" />
            }
        </Fragment>
    );
};

export default Home;