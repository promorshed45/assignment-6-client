import Loading from "@/src/components/ui/Loading";
import { useUser } from "@/src/providers/user.provider";

const Dashboard = () => {
  const { setIsLoading, user } = useUser();

  // Optional: Check if the user is loading or not
  if (!user) {
    return <Loading/>
  }

  // Determine the appropriate path based on the user's role
  const path = user.role === "ADMIN" ? '/admin-dashboard' : '/user-dashboard';

  return (
    <div>
      <p>Path: {path}</p>
    </div>
  );
};

export default Dashboard;
