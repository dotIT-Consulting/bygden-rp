const Index = () => {
  return (
    <p>Loading...</p>
  )
}

export default Index;

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: "/dashboard/home"
    }
  };
}