// REVIEWED: 2025-05-05 - Good to go ✅
import ItemDetails from "@/app/components/dashboard/learning/software/details/ItemDetails";

export default async function ItemDetailsPage({ params }: { params: { id: string } }) {
    const id = params.id;

    return (
        <div className="w-full flex flex-col items-center mt-5">
            <ItemDetails id={id} />
        </div>
    );
}