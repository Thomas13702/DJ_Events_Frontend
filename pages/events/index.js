import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage({ events, page, total }) {
  //catch events as a prop
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //gets page from url, on page 1 by default

  //Calculate start page -> how many events we should skip past depending on page we are on
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  //check to see if we are on first page if not work out how many to skip, adding + infront of page turns it from string to int

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`); //gets all evens and counts them
  const total = await totalRes.json();

  // Fetch Events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  ); //gets all evens and sorts by date ascending, limts the amount and which ones or gotten
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total }, //return events as a prop - > passes events to our client side component as a prop
  };
}
