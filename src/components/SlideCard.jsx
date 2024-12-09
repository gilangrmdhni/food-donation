import styles from "@/styles/Home.module.css"
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const SlideCard = (props) => {
    const { to, img, title, address, date, status } = props;
    return (
        <div className="flex justify-center mt-1 w-full m-2">
            <Link href="#" className={` bg-white hover:bg-gray-100  text-black rounded-lg inline-flex items-center ${styles.items_slide}`}>
                <div className="flex justify-between w-80">
                    <div className="flex p-1">
                        <div className={`text-left ml-1 ${styles.text_card}`}>
                            <p className="mb-1 text-black  font-sans font-semibold text-sm truncate">{title}</p>

                            <p className={`font-sans text-xs text-gray-500 mr-2 whitespace-normal ${styles.truncate}`}>{address}</p>
                            <button className="bg-primary text-white p-2 rounded-lg flex mt-1">
                                <span>Donasi</span>
                                <IconChevronRight />
                            </button>
                        </div>

                    </div>

                </div>
                <img src={img} className={`place-items-start text-gray-500 rounded-lg object-cover ${styles.img_slide}`} alt="" />
            </Link>
        </div>

    );
}

export default SlideCard;