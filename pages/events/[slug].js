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

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  })); //outputs array like example

  return {
    paths,
    fallback: true, //will look for path again if it wasnt generated at build time
    //fallback: false, //shows a 404 is path not found
  };
}
//have to have to use getStaticProps
//returns an array of objects with slugs example:
// return {
//   paths: [
//     { params: { slug: "slug_string" } },
//     { params: { slug: "slug_string" } },
//     { params: { slug: "slug_string" } },
//   ],
// };

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json(); //return array of one event

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json(); //return array of one event

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
