import VendorDetails from "@/src/components/ui/homepage/VendorDetails"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return <>
        <VendorDetails id={id} key={id} />
    </>
}