import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
  //catch events as a prop
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  //runs on build
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`); //gets all evens and sorts by date ascending
  const events = await res.json();

  return {
    props: { events }, //return events as a prop - > passes events to our client side component as a prop
    revalidate: 1,
    //have to have this incase someone updates their data,
    //as request has already happened on build and update wont be shown, this gets data again after 1 sec if data has change
  };
}
