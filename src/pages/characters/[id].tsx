import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { ErrorPage } from '../../containers/Error';
import { characterFragment } from '../../graphql/characterFragment';
import { fetchSwapi } from '../../lib/swapi';
import { ICharacter } from '../../types';

import { Layout } from '../../components/layout/Layout';
import { Person } from '../../components/person/Person';

export type PageProps = {
  person: ICharacter | null;
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { person } = data;

  if (!person) {
    return <ErrorPage message="Person not found" status={404} />;
  }

  const { name } = person;

  return (
    <Layout>
      <Head>
        <title>Star Wars character—{name}</title>
      </Head>
      <Person person={person} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
  const id = params?.id as string | undefined;

  const query = `
    query($id: ID!) {
      person(id: $id){
        ...character
      }
    }
    ${characterFragment}
  `;

  let person = null;

  if (id) {
    const result = await fetchSwapi<any>(query, { id });

    person = result.person ?? null;
  }

  return {
    props: {
      person,
    },
  };
};
