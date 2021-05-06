//to get dynamic page url put [] around name
//example: www.mywebsite/events/event_1
//file would be [event_id(slug)] inside events folder

import Layout from "@/components/Layout";

export default function EventPage() {
  return (
    <Layout>
      <h1>My Event</h1>
    </Layout>
  );
}
