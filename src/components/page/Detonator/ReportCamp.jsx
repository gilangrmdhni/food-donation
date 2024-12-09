import styles from "@/styles/Campaign.module.css"
import { IconCirclePlus } from '@tabler/icons-react';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardReport from "@/components/CardReport";
const ReportCamp = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log('rout', id);
    const [dataApi, setDataApi] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jumlahOrder, setJumlahOrder] = useState(0);
    const [jumlahTrue, setJumlahTrue] = useState(0);
    ;


    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
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

                console.log('data', response.data.body.orders);
                setDataApi(response.data.body.orders);
                setFilteredData(response.data.body);
                setLoading(false);

            } catch (error) {
                handleRequestError(error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        setJumlahOrder(dataApi.length);
        setJumlahTrue(dataApi.filter((data) => data.is_rating === true).length);

        if (jumlahTrue === jumlahOrder) {
            console.log('open');
        } else {
            console.log('close');
        }

        console.log('jum', dataApi.length, 'true', dataApi.filter((data) => data.is_rating === true).length);
    }, [dataApi]);
    const handleRequestError = (error) => {
        console.error('Error fetching data:', error);

        if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push('/login/detonator');
        }

        setLoading(false);
        setFilteredData([]);
    };

    return (
        <>
            <div className="container mx-auto mt-24 bg-white h-screen">

                <div className="mx-auto text-center p-2 text-primary">
                    <h1 className="font-bold">Report Campaigner</h1>
                    <h1>TEBAR 1000 PAKET NASI JUMAT BERKAH</h1>
                </div>
                <hr className="w-full h-1 mx-auto mt-2 bg-gray-300 border-0 rounded" />

                <div className="w-full grid place-content-center p-2">
                    {jumlahTrue === jumlahOrder ? (
                        <Link href={`/detonator/createreport/${id}`} className="bg-primary text-white font-bold py-2 px-4 rounded-full flex items-center">
                            <IconCirclePlus className="mr-2" />
                            New Report
                        </Link>
                    ) : (
                        <button className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full cursor-not-allowed" disabled>
                            Button Closed
                        </button>
                    )}
                </div>

                {loading && <p>Loading...</p>}

                {/* {dataApi.map((item) => (
                    <CardReport key={item.id} data={item} />
                ))} */}

            </div>

        </>

    );
}

export default ReportCamp;