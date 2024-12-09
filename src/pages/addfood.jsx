
import { ContextAddFoodProvider } from "@/components/FormCampaing/AddFoodContext";
import AddFoodCamp from "@/components/page/AddFoodCamp";

function addfood({ pageProps }) {
    return (
        <ContextAddFoodProvider>
            <AddFoodCamp {...pageProps} />
        </ContextAddFoodProvider>
    );
}

export default addfood;