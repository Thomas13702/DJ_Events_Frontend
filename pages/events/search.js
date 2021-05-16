import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function SearchPage({ events }) {
  //catch events as a prop
  const router = useRouter(); //use this to get url
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term} </h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  //term will be in url

  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  }); //using this so the term is search in name, performers, description, venue

  const res = await fetch(`${API_URL}/events?${query}`); //gets all evens and sorts by date ascending
  const events = await res.json();

  return {
    props: { events }, //return events as a prop - > passes events to our client side component as a prop
  };
}
