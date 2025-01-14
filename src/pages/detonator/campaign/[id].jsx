import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DetailCamp from '@/components/page/Detonator/DetailCamp';

const Campaign = () => {
    const router = useRouter();
    const { id } = router.query;
    const [campaignData, setCampaignData] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.foodia-dev.nuncorp.id/api/v1/campaign/fetch/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCampaignData(response.data.body);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <main className="my-0 mx-auto min-h-full mobile-w">
            <div className="my-0 mx-auto min-h-screen max-w-480 overflow-x-hidden bg-white flex flex-col">
                {campaignData && <DetailCamp data={campaignData} />}
            </div>
        </main>
    );
};

export default Campaign;
