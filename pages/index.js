import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function Home({ events }) {
  //catch events as a prop
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
}

export async function getServerSideProps() {
  //run on every page load
  //runs on server first
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events }, //return events as a prop - > passes events to our client side component as a prop
  };
}
