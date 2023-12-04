import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return <></>;
}

Index.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
