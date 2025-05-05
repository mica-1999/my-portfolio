import ItemDetails from "@/app/components/dashboard/learning/software/details/ItemDetails";

export default async function ItemDetailsPage({ params }: { params: { id: string } }) {
    const id = params.id;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <ItemDetails id={id} />
        </div>
    );
}