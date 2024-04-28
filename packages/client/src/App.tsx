import { useEffect, useState } from "react";
import { Button, Wrap, WrapItem } from "@chakra-ui/react";
import { useUtilitiesQuery } from "./dataLayer/queries/useUtilitiesQuery";
import useCreateUtilityMutation from "./dataLayer/mutations/useCreateUtilityMutation";
import { ChakraProvider } from "@chakra-ui/react";
import { Tag } from "./components";
import { useDeleteUtilityMutation } from "./dataLayer/mutations/useDeleteUtilityMutation";

function App() {
  const { data, isFetched } = useUtilitiesQuery();
  const [count, setCount] = useState(0);
  const { mutateAsync: createUtility } = useCreateUtilityMutation();
  const { mutateAsync: deleteUtility } = useDeleteUtilityMutation();

  useEffect(() => {
    if (isFetched) {
      setCount(data?.[data?.length - 1]?.key || 0 + 1);
    }
  }, [data, isFetched]);

  return (
    <ChakraProvider>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          onClick={() => {
            createUtility({ id: count.toString(), name: `utility ${count}` });
            setCount((count) => count + 1);
          }}
        >
          Create Utility #{count}
        </Button>
        <p>
          <strong>Utilities:</strong>
          <Wrap>
            {data
              ? data.map((utility) => (
                  <WrapItem>
                    <Tag
                      label={utility.name}
                      id={utility.id}
                      onClose={() => deleteUtility(utility.id)}
                    />
                  </WrapItem>
                ))
              : "loading..."}
          </Wrap>
        </p>
      </div>
    </ChakraProvider>
  );
}

export default App;
