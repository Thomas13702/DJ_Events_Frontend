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

export async function getStaticProps() {
  //runs on build
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events }, //return events as a prop - > passes events to our client side component as a prop
    revalidate: 1,
    //have to have this incase someone updates their data,
    //as request has already happened on build and update wont be shown, this gets data again after 1 sec if data has change
  };
}
