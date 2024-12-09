import styles from "@/styles/Campaign.module.css"
import { IconClock, IconCalendarEvent, IconCreditCard, IconClipboardCheck, IconSoup, IconArrowNarrowRight, IconBellRingingFilled, IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from 'react';
const DetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [showFullText, setShowFullText] = useState(false);

    const toggleReadMore = () => {
        setShowFullText((prevShowFullText) => !prevShowFullText);
    };
    return (
        <>
            <div className="container mx-auto mt-24 bg-white h-screen">
                <div className="place-content-center">
                    <img src={`/img/card/rectangle_70.png`} alt="" className="rounded-lg" style={{ width: '390px', height: '195px', objectFit: 'cover' }} />
                </div>

                <div className="place-content-center mt-4  p-2">
                    <div className="flex">
                        <h1>TEBAR 1000 PAKET NASI JUMAT BERKAH</h1>
                    </div>
                    <div className="flex">
                        <p>Kav Barokah, Gg. Ceria I, Bahagia, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17121</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between ">
                        <h4>Rp.50.000.000</h4>
                        <h4 className="flex items-center text-blue-400"><IconClock />24 Hari</h4>

                    </div>


                    <ol className="flex items-center w-full mt-2">
                        <li className="flex w-40 items-center after:w-full after:border-b after:border-4 after:border-primary">
                            <span className="flex items-center justify-center w-6 h-6  rounded-full  bg-primary shrink-0">
                                <IconCalendarEvent className="w-3.5 h-3.5 text-gray-100" />

                            </span>
                        </li>
                        <li className="flex w-40 items-center after:w-full after:w-full after:h-1 after:border-b  after:border-4  after:border-gray-700">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary shrink-0">
                                <IconCreditCard className="w-3.5 h-3.5 text-gray-100" />

                            </span>
                        </li>
                        <li className="flex items-center w-full">
                            <span className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full bg-gray-700 shrink-0">
                                <IconClipboardCheck className="w-3.5 h-3.5 text-gray-100" />

                            </span>
                        </li>
                    </ol>

                </div>
                <hr className="w-full h-1 mx-auto mt-2 bg-gray-300 border-0 rounded" />

                <div className="items-center justify-center mt-1 w-full">
                    <Link href={`/food/${id}`} className="w-full bg-white hover:bg-gray-100  text-black rounded-lg inline-flex items-center px-4 py-2.5 ">
                        <div className="flex justify-between w-full">
                            <div className="flex">
                                <div className="w-10 h-10 rounded-full bg-blue-100 grid place-items-center mr-2 text-blue-600"><IconSoup className=" w-7 h-7" /></div>
                                <div className="text-left place-items-start">
                                    <div className="mb-1 text-primary">Food Campaigner</div>
                                    <div className="-mt-1 font-sans text-xs text-gray-500">3 merchants</div>
                                </div>
                            </div>
                            <div className="grid place-items-center">
                                <IconArrowNarrowRight className=" grid grid-cols-3 gap-4 place-items-end text-gray-500" />
                            </div>
                        </div>
                    </Link>
                    <Link href={`/report/${id}`} className="w-full bg-white hover:bg-gray-100  text-black rounded-lg inline-flex items-center px-4 py-2.5 mt-2">
                        <div className="flex justify-between w-full">
                            <div className="flex">
                                <div className="text-left place-items-start">
                                    <div className="mb-1 text-primary flex">Kabar Terbaru <IconBellRingingFilled size={10} className="text-blue-600" /></div>
                                    <div className="-mt-1 font-sans text-xs text-gray-500">Terahir Update 18 Oktober 2023</div>
                                </div>
                            </div>
                            <div className="grid place-items-center">
                                <IconArrowNarrowRight className=" grid grid-cols-3 gap-4 place-items-end text-gray-500" />
                            </div>
                        </div>
                    </Link>
                </div>
                <hr className="w-full h-1 mx-auto mt-2 bg-gray-300 border-0 rounded" />
                <div className="block mt-1 p-6 bg-white rounded-lg shadow bg-blue-100">
                    <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900">Tentang Program</h5>
                    <p className={`font-normal text-gray-700 text-xs  ${showFullText ? '' : styles.truncate}`}>
                        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham
                    </p>
                    <div className="bg-white hover:bg-gray-100 w-full grid place-content-center rounded-sm text-primary text-xs mt-2">
                        <button className="flex" onClick={toggleReadMore}>
                            Selengkapnya {showFullText ? <IconCaretUp size={20} /> : <IconCaretDown size={20} />}
                        </button>
                    </div>
                </div>

                {/* <CardCampaign /> */}

            </div>

        </>

    );
}

export default DetailPage;