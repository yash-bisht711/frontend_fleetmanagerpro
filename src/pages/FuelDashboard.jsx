import FuelEntryForm from "../componenets/fuels/FuelEntryForm";
import FuelStats from "../componenets/fuels/FuelStats";
import { useParams } from "react-router-dom";

const FuelDashboard = ({ token }) => {
  const { vehicleId } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Fuel Dashboard</h1>
      <FuelEntryForm vehicleId={vehicleId} token={token} />
      <FuelStats vehicleId={vehicleId} token={token} />
    </div>
  );
};

export default FuelDashboard;
