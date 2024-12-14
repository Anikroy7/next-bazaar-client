import UpdateProduct from "@/src/components/products/UpdateProduct"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return <>
        <UpdateProduct id={id} key={id} />
    </>
}