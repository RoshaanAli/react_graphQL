import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState({ title: "", desc: "", price: "" });
  const requestBody = {
    query: `
      mutation {
        createEvent(eventInput:{title:"${data.title}",
        description:"${data.desc}",
        price:${data.price},
        date:"2023-05-23T14:09:31.071Z"
      }) {
        _id
        title
      }
      }
    `,
  };

  const onCreateEvent = () => {
    console.log("fetch");
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resdata) => {
        console.log(resdata, "----");
      })
      .catch((err) => {
        console.log(err, "---err");
      });
  };

  const setter = (k, v) => {
    setData({ ...data, [k]: v });
  };

  return (
    <div style={{}}>
      <h1>GraphQL Practise</h1>
      <input
        placeholder="title"
        value={data.title}
        onChange={(e) => {
          setter("title", e.target.value);
        }}
      />
      <input
        placeholder="description"
        value={data.desc}
        onChange={(e) => {
          setter("desc", e.target.value);
        }}
      />
      <input
        placeholder="price"
        value={data.price}
        onChange={(e) => {
          setter("price", e.target.value);
        }}
      />

      <button onClick={onCreateEvent}>Call api</button>
    </div>
  );
}

export default App;
