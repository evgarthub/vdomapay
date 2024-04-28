import { ChangeEvent, useCallback, useState } from "react";
import { Button, Stack, Wrap, WrapItem, useToast } from "@chakra-ui/react";
import { useUtilitiesQuery } from "./dataLayer/queries/useUtilitiesQuery";
import useCreateUtilityMutation from "./dataLayer/mutations/useCreateUtilityMutation";
import { ChakraProvider } from "@chakra-ui/react";
import { Tag } from "./components";
import { useDeleteUtilityMutation } from "./dataLayer/mutations/useDeleteUtilityMutation";
import { Input } from "@chakra-ui/react";

function App() {
  const toast = useToast();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const { data } = useUtilitiesQuery();
  const { mutateAsync: createUtility } = useCreateUtilityMutation();
  const { mutateAsync: deleteUtility } = useDeleteUtilityMutation();

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  const handleIdChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setId(event.target.value);
    },
    [setId]
  );

  return (
    <ChakraProvider>
      <div className="card">
        <Stack spacing={3} align="flex-start">
          <Input
            variant="filled"
            placeholder="Identifier"
            value={id}
            onChange={handleIdChange}
          />
          <Input
            variant="filled"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <Button
            onClick={() => {
              const examplePromise = createUtility({ name, id });
              toast.promise(examplePromise, {
                success: {
                  title: "Promise resolved",
                  description: "Looks great",
                },
                error: {
                  title: "Promise rejected",
                  description: "Something wrong",
                },
                loading: {
                  title: "Promise pending",
                  description: "Please wait",
                },
              });
            }}
          >
            Create Utility
          </Button>
        </Stack>
        <p>
          <strong>Utilities:</strong>
          <Wrap>
            {data
              ? data.map((utility) => (
                  <WrapItem>
                    <Tag
                      label={utility.name}
                      id={utility.id}
                      onClose={() => {
                        const promise = deleteUtility(utility.id);
                        toast.promise(promise, {
                          success: {
                            title: "Utility deleted",
                            description: "Looks great",
                          },
                          error: {
                            title: "Utility has not been deleted",
                            description: "Something wrong",
                          },
                          loading: {
                            title: "Deleting...",
                            description: "Please wait",
                          },
                        });
                      }}
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
