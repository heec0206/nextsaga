const searchRankBody = (pageProps) => {

  return (
    <>
      
    </>
  );
};

export default searchRankBody;

searchRankBody.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
