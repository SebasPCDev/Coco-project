import CoworkingDetailCard from "@/components/coworkingDetail";
import GetCoworkingDetail from "../../../../../utils/gets/getCoworkingDetail";

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const detail = await GetCoworkingDetail(id);

  return (
    <div>
      <CoworkingDetailCard coworking={detail} />
    </div>
  );
};

export default ProductDetail;
