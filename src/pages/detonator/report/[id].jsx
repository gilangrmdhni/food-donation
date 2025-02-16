import ReportCamp from '@/components/page/Detonator/ReportCamp';
import { useRouter } from 'next/router';

const Report = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <main className="my-0 mx-auto min-h-full mobile-w">
            <div className="my-0 mx-auto min-h-screen max-w-480 overflow-x-hidden bg-white flex flex-col">

                <ReportCamp />
            </div>

        </main>
    );
};

export default Report;