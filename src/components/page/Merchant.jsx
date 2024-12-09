import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { IconCirclePlus } from "@tabler/icons-react";
import SlideCard from "../SlideCard";
import styles from "@/styles/Home.module.css";
import CardFood from "../CardFood";

const Merchant = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [dataApi, setDataApi] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        const token = sessionStorage.getItem('token');
        const status = sessionStorage.getItem('status');
        const id = sessionStorage.getItem('id');

        if (!role || !token || role !== 'merchant' || status !== 'approved' || !id) {
            // Redirect to login if either role or token is missing or role is not 'detonator' or status is not 'approved'
            sessionStorage.clear();
            router.push('/login/merchant');
        } else {
            // Role is 'detonator' and token is present
            setLoading(false); // Set loading to false once the check is complete
        }
    }, [router]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = sessionStorage.getItem('id');
                const token = sessionStorage.getItem('token');

                if (!id || !token) {
                    throw new Error('Missing required session data');
                }

                const response = await axios.get(`https://api.foodia-dev.nuncorp.id/api/v1/merchant-product/filter?merchant_id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setDataApi(response.data.body);
                setFilteredData(response.data.body);
                setLoading(false);

                if (response.data.body.length === 0) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);

                if (error.response && error.response.status === 401) {
                    // Unauthorized error (e.g., token expired)
                    sessionStorage.clear();
                    router.push('/login/merchant');
                }
            }
        };

        fetchData();
    }, [page]);

    const handleFilterChange = (status) => {
        let filtered = [];

        if (status === 'listMenu') {
            // Show items with 'waiting' or 'rejected' status
            filtered = dataApi.filter((data) => data.status === 'waiting' || data.status === 'rejected');
        } else {
            // Show items with the selected status
            filtered = dataApi.filter((data) => data.status === status);
        }

        setSelectedStatus(status);
        setFilteredData(filtered);
    };

    return (
        <>
            <div className="container mx-auto mt-24 bg-white h-screen">
                <div className="place-content-center">
                    <div className={`bg-green-50 rounded-lg ${styles.listMenu}`}>
                        <div className="flex flex-nowrap p-4">
                            <Link href="/merchant" className="grid justify-items-center mr-2">
                                <div className={`${styles.iconMenu}`}><IconCirclePlus /></div>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">List Menu</p>
                            </Link>
                            <Link href="/merchant/pesanan" className="grid justify-items-center ">
                                <div className={`${styles.iconMenu}`}><Image src={'/icon/pesanan.png'} alt="Girl in a jacket" width={30} height={30} /></div>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Pesanan</p>
                            </Link>
                        </div>
                    </div >
                </div>

                <div className={` flex ${styles.slide_card}`}>
                    <SlideCard to={"/campaign/1"}
                        img="/img/card/rectangle_70.png"
                        title="Makanan Untuk Semua"
                        address="Bersama-sama Kita Bisa Mengakhiri Kelaparan."
                        date="30/10/2022"
                        status="Pending"
                    />
                    <SlideCard to={"/campaign/1"}
                        img="/img/card/rectangle_70.png"
                        title="TEBAR 1000 PAKET NASI JUMAT BERKAH"
                        address="Kav Barokah, Gg. Ceria I, Bahagia, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17121"
                        date="30/10/2022"
                        status="Approved"
                    />
                    <SlideCard to={"/campaign/1"}
                        img="/img/card/rectangle_70.png"
                        title="TEBAR 1000 PAKET NASI JUMAT BERKAH"
                        address="Kav Barokah, Gg. Ceria I, Bahagia, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17121 ppppppppppppppppppppppppppppppppppppppp"
                        date="30/10/2022"
                        status="Rejected"
                    />

                    <SlideCard to={"/campaign/1"}
                        img="/img/card/rectangle_70.png"
                        title="TEBAR 1000 PAKET NASI JUMAT BERKAH"
                        address="Kav Barokah, Gg. Ceria I, Bahagia, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17121"
                        date="30/10/2022"
                        status="Approved"
                    />
                </div>
                <div className="grid flex justify-end py-2 px-2">
                    <Link href="/createmenu?step=1" className="bg-primary text-white rounded-lg w-28 flex h-10 items-center "><IconCirclePlus />Add Menu</Link>
                </div>
                <div className="place-content-center">
                    <div className="flex my-2 p-2">
                        <div
                            className={`mr-2 grid justify-items-center ${selectedStatus === 'approved' ? 'text-blue-500 ' : ''}`}
                            onClick={() => handleFilterChange('approved')}
                        >
                            <span>Menu Approved</span>
                            <div className={`w-24 h-0.5 ${selectedStatus === 'approved' ? 'bg-blue-500 ' : 'bg-black'}`}></div>
                        </div>
                        <div
                            className={`mr-2 grid justify-items-center ${selectedStatus === 'listMenu' ? 'text-blue-500' : ''}`}
                            onClick={() => handleFilterChange('listMenu')}
                        >
                            <span>List Menu</span>
                            <div className={`w-24 h-0.5 ${selectedStatus === 'listMenu' ? 'bg-blue-500 ' : 'bg-black'}`}></div>
                        </div>

                    </div>
                </div>

                {loading ? (
                    <div className={`${styles.card}`}>
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className={`${styles.loadingCard}`}>
                                <div className={`${styles.shimmer}`}></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`${styles.card}`}>
                        {filteredData.map((data) => (
                            <CardFood
                                key={data.id}
                                to={`/product/${data.id}`}
                                img={data.images.length > 0 ? `${process.env.NEXT_PUBLIC_URL_STORAGE}${data.images[0].image_url}` : '/img/default-image.png'}
                                title={data.name}
                                description={data.description}
                                date={data.created_at}
                                status={data.status}
                                qty={data.qty}
                                price={data.price}
                                images={data.images}
                            />
                        ))}
                    </div>
                )}



            </div >
            <div id="infinite-scroll-trigger" className={`${styles.loadingCard}`}></div>

        </>

    );
}

export default Merchant;