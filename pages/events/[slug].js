//to get dynamic page url put [] around name
//example: www.mywebsite/events/event_1
//file would be [event_id(slug)] inside events folder

import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function EventPage({ evt }) {
  return (
    <Layout>
      <h1>{evt.name}</h1>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json(); //return array of one event

  return {
    props: {
      evt: events[0],
    },
  };
}
