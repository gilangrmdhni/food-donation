import styles from "@/styles/Campaign.module.css"
import { IconCirclePlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import CardFood from "../CardFood";
import { useRouter } from "next/router";
const FoodCampaign = () => {
    const router = useRouter();
    const { id } = router.query;
    const [showFullText, setShowFullText] = useState(false);
    const [userId, setuserId] = useState();
    const [userToken, setuserToken] = useState("");


    useEffect(() => {
        const detonator_id = sessionStorage.getItem('id');

        setuserId(detonator_id);

        const token = sessionStorage.getItem('token');
        setuserToken(token);
    }, [])

    console.log('id User', userId, 'id router', id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId || !token) {
                    throw new Error('Missing required session data');
                }

                const response = await axios.get(
                    `https://api.foodia-dev.nuncorp.id/api/v1/merchant/filter`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('data', response);
                setDataApi(response.data.body);
                setFilteredData(response.data.body);
                setLoading(false);

            } catch (error) {
                console.log('error =', error);
            }
        };

        fetchData();
    }, [id]);

    // const toggleReadMore = () => {
    //     setShowFullText((prevShowFullText) => !prevShowFullText);
    // };
    return (
        <>
            <div className="container mx-auto mt-24 bg-white h-screen">
                <div className="flex justify-center w-full">
                    <h1>Food Campaign</h1>
                </div>

                <hr className="w-full h-1 mx-auto mt-2 bg-gray-300 border-0 rounded" />

                <div className="items-center justify-center mt-1 w-full">
                    <div className="w-full bg-white  text-black rounded-lg inline-flex items-center px-4 py-2.5 ">
                        <div className="flex justify-between w-full">
                            <div className="flex">
                                <div className="text-left place-items-start">
                                    <div className="mb-1 text-primary">food required :16</div>
                                    <div className="-mt-1 font-sans text-xs text-gray-500">lack of food :10</div>
                                </div>
                            </div>
                            <div className="grid place-items-center">
                                <button className="flex rounded-lg w-20 h-10 grid grid-cols-3 gap-4 content-center text-white bg-primary p-2 hover:shadow-lg"><IconCirclePlus />add </button>

                            </div>
                        </div>
                    </div>
                </div>
                <hr className="w-full h-1 mx-auto mt-2 bg-gray-300 border-0 rounded" />


                <div className="items-center justify-center mt-2 w-full">
                    <CardFood
                        to="2"
                        img="/img/card/rectangle_70.png"
                        title="Nasi Kuning"
                        name="Warung Makan Amar"
                        qty="10"
                        status_makanan="Makanan Di Kirim"
                        status="Approved"
                    />
                </div >


            </div >

        </>

    );
}

export default FoodCampaign;