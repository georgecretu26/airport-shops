import Link from "next/link";

const Home = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">
      Welcome to the Airport Shops Management System
    </h1>
    <Link className="text-blue-500" href="/shops">
      View Shops
    </Link>
  </div>
);

export default Home;
