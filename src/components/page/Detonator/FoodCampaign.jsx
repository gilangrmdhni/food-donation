import styles from "@/styles/Campaign.module.css"
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { Link } from "tabler-icons-react";
import CardRepordFood from "@/components/CardRepordFood";
const FoodCampaign = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log('rout', id);
    const [foodOrder, setFoodOrder] = useState([]);
    const [DataAPI, setDataApi] = useState([]);
    const [loading, setLoading] = useState(true);
    ;


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const fetchData = async () => {
            try {
                if (!id || !token) {
                    throw new Error('Missing required session data');
                }

                const response = await axios.get(
                    `https://api.foodia-dev.nuncorp.id/api/v1/campaign/fetch/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setFoodOrder(response.data.body.orders);
                setDataApi(response.data.body);
                setLoading(false);
                console.log('order', response.data.body.orders);
                console.log('data', response.data.body);

            } catch (error) {
                handleRequestError(error);
            }
        };

        fetchData();
    }, [id]);

    const handleRequestError = (error) => {
        console.error('Error fetching data:', error);

        if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push('/login/detonator');
        }

        setLoading(false);
        setDataApi([]);
    };



    return (
        <>
            <div className="container mx-auto mt-24 bg-white h-screen">

                <div className="mx-auto text-center p-2 text-primary">
                    <h1 className="font-bold">Report Order Food</h1>
                    <h1>{DataAPI.event_name}</h1>
                </div>
                <hr className="w-full h-1 mx-auto mt-2 bg-gray-300 border-0 rounded" />

                {/* <div className="w-full grid place-content-center p-2">
                    <Link href={`/detonator/createreport/${id}`} className="bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center">
                        <IconCirclePlus className="mr-2" />
                        New Report
                    </Link>
                </div> */}

                {loading && <p>Loading...</p>}

                <div className="items-center justify-center mt-2 w-full">
                    {foodOrder.map((item) => (

                        <CardRepordFood
                            key={item.id}
                            to={`/detonator/reportfood/${item.id}`}
                            img={item.merchant_product.images.length > 0 ? `${process.env.NEXT_PUBLIC_URL_STORAGE}${item.merchant_product.images[0].image_url}` : '/img/default-image.png'}
                            title={item.merchant_product.name}
                            price={item.merchant_product.price}
                            nameMerchant={item.merchant.oauth.fullname}
                            qty={item.qty}
                            approval_status={item.approval_status}
                            order_status={item.order_status}
                        />
                    ))}
                </div >

            </div>

        </>

    );
}

export default FoodCampaign;