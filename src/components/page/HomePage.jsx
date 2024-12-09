import styles from "@/styles/Home.module.css"
import Image from "next/image";
import { IconBuildingStore, IconCirclePlus } from '@tabler/icons-react';
import CardCampaign from "../CardCampaign";
import SlideCard from "../SlideCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const HomePage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [dataApi, setDataApi] = useState([]);
    const [DataCamp, setDataCamp] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`https://api.foodia-dev.nuncorp.id/api/v1/campaign/filter?status=approved`, {
                    headers: {
                        'Authorization': `Bearer`,
                    },
                });


                setDataApi(response.data.body);
                setDataCamp(response.data.body);
                setLoading(false);

                if (response.data.body.length === 0) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div className="container mx-auto mt-24 bg-white h-screen">
                <div className="place-content-center">
                    <div className={`bg-green-50 rounded-lg ${styles.listMenu}`}>
                        <div className="flex flex-nowrap p-2">
                            <Link href={"/login/detonator"} className="grid justify-items-center mr-2">
                                <div className={`${styles.iconMenu}`}><Image src={'/icon/campaint.png'} alt="Girl in a jacket" width={30} height={30} /></div>
                                <p className="text-base text-sm text-gray-500 dark:text-gray-400">Galang Donasi</p>
                            </Link>
                            <Link href={"/login/merchant"} className="grid justify-items-center">
                                <div className={`${styles.iconMenu}`}><IconBuildingStore /></div>
                                <p className="text-base text-sm text-gray-500 dark:text-gray-400">UMKM</p>
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
                <div className="place-content-center">
                    <div className="flex my-5">
                        <div className="mr-2 grid justify-items-center"><span className="text-blue-500">Donasi Terdekat</span>
                            <div className="bg-blue-500 w-32 h-0.5"></div>
                        </div>
                        <div className="grid justify-items-center"><span className="e25_212">Event Donasi </span>
                            <div className="bg-black w-32 h-0.5"></div>
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
                        {DataCamp.map((campData) => {
                            // console.log(`Key: ${dataFilter.id}`);
                            return (
                                <CardCampaign to={`/campaign/${campData.id}`}
                                    img={`${process.env.NEXT_PUBLIC_URL_STORAGE}${campData.image_url}`}
                                    title={campData.event_name}
                                    address={campData.address}
                                    date={campData.event_date}
                                    status={campData.status}
                                />);
                        })}
                    </div>
                )}
            </div>

        </>

    );
}

export default HomePage;