import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { useUtilitiesQuery } from "./dataLayer/queries/useUtilitiesQuery";
import useCreateUtilityMutation from "./dataLayer/mutations/useCreateUtilityMutation";

function App() {
  const [count, setCount] = useState(0);
  const { data } = useUtilitiesQuery();
  const { mutateAsync: createUtility } = useCreateUtilityMutation();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            createUtility({ id: count.toString(), name: `utility ${count}` });
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          <strong>Utilities:</strong>
          {data ? data.map((utility) => utility.name).join(", ") : "loading..."}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
