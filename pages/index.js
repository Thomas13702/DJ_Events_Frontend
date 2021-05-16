import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Link from "next/link";
import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  //catch events as a prop
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  //runs on build
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`); //?_sort=date:ASC&_limit=3 means itll get the last 3 in ascending order
  const events = await res.json();

  return {
    props: { events }, //return events as a prop - > passes events to our client side component as a prop
    revalidate: 1,
    //have to have this incase someone updates their data,
    //as request has already happened on build and update wont be shown, this gets data again after 1 sec if data has change
  };
}
