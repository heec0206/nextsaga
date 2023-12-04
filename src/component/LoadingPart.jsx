import { Dimmer, Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";

export default function Loading({}) {
  const isLoading = useSelector((state) => state.commonCodes.loadingPart);
  return (
    <>
      { isLoading && (
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
      )}
    </>
  );
}
