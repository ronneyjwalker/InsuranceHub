// import { Configuration, OpenAIApi } from "openai";
// import { useEffect, useState } from "react";

// function Recommender() {
//   const [response, setResponse] = useState("");

//   useEffect(() => {
//     fetch();
//   }, []);

//   const fetch = async () => {
//     const config = new Configuration({
//       organization: "org-XIHXjbcXmQcosB5Nxb3GF2YK",
//       apiKey: "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",
//     });

//     const openai = new OpenAIApi(config);
//     let object = {
//       name: "r",
//       email: "abc@gmail.com",
//       dob: "2023-11-27T01:12:53.994Z",
//       height: "10",
//       weight: "45",
//       bloodGroup: "ABNEGATIVE",
//       employment: "employed",
//       dependent: 0,
//       annualIncome: 25000,
//       otherIncome: "nil",
//       healthHistory: "nil",
//       familyHistory: "nil",
//       existingInsurance: "nil",
//       smoking: "yes",
//       policyTerm: 6,
//     };
//     let price1 = 225;
//     let price2 = 215;
//     let price3 = 200;
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "user",
//           content:
//             object +
//             "For the above json recommend the best package out of the following:\n\n" +
//             "1. Platinum (price per month = $" +
//             price1 +
//             ")\n" +
//             "2. Gold (price per month = $" +
//             price2 +
//             ")\n" +
//             "3. Silver (price per month = $" +
//             price3 +
//             ")\n\n" +
//             "The packages are based on the factors from above json:\n" +
//             "1. Platinum: dependent\n" +
//             "2. Gold: weight\n" +
//             "3. Silver: smoking\n\n" +
//             "Recommend in one word",
//         },
//       ],
//     });
//     setResponse(completion.data.choices[0].message.content);
//     console.log(completion.data.choices[0].message.content);
//   };
//   return <div style={{ height: "90vh" }}>{response}</div>;
// }

// export default Recommender;

import { Configuration, OpenAIApi } from "openai";

let response = {};

class Recommender {
  // add a new variable named type in order to change the message below based on auto, home, life
  fetch = async (object, price1, price2, price3, type) => {
    const config = new Configuration({
      organization: "org-XIHXjbcXmQcosB5Nxb3GF2YK",
      apiKey: "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",
    });

    const openai = new OpenAIApi(config);

    let content;

    if (type === "life") {
      content =
        object +
        "For the above json recommend the best package out of the following:\n\n" +
        "1. Platinum (price per month = $" +
        price1 +
        ")\n" +
        "2. Gold (price per month = $" +
        price2 +
        ")\n" +
        "3. Silver (price per month = $" +
        price3 +
        ")\n\n" +
        "The packages are based on the factors from above json:\n" +
        "1. Platinum: dependent\n" +
        "2. Gold: weight\n" +
        "3. Silver: smoking\n\n" +
        "Recommend in one word";
    } else if (type === "home") {
      content =
        object +
        "For the above json recommend the best package out of the following:\n\n" +
        "1. Platinum (price per month = $" +
        price1 +
        ")\n" +
        "2. Gold (price per month = $" +
        price2 +
        ")\n" +
        "3. Silver (price per month = $" +
        price3 +
        ")\n\n" +
        "The packages are based on the factors from above json:\n" +
        "1. Platinum: dependent\n" +
        "2. Gold: weight\n" +
        "3. Silver: smoking\n\n" +
        "Recommend in one word";
    } else if (type === "auto") {
      content =
        object +
        "For the above json recommend the best package out of the following:\n\n" +
        "1. Platinum (price per month = $" +
        price1 +
        ")\n" +
        "2. Gold (price per month = $" +
        price2 +
        ")\n" +
        "3. Silver (price per month = $" +
        price3 +
        ")\n\n" +
        "The packages are based on the factors from above json:\n" +
        "1. Platinum: dependent\n" +
        "2. Gold: weight\n" +
        "3. Silver: smoking\n\n" +
        "Recommend in one word";
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    });

    return completion.data.choices[0].message.content;
  };
}

export default new Recommender();
