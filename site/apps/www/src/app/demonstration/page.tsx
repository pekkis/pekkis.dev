import Form from "@/app/demonstration/Form";
import Layout from "@/components/Layout";
import Padder from "@/components/Padder";

export const metadata = {
  title: `Demonstrashuun`
};

export default async function DemonstrationPage() {
  return (
    <Layout>
      <Padder>
        <Form />
      </Padder>
    </Layout>
  );
}
