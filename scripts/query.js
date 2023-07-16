const fs = require('fs');

const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "";

const CLAUDE_API_ENDPOINT = "https://api.anthropic.com/v1/complete";
const CLAUDE_API_KEY = "";

const INSTRUCTION = "Explain why the following joke is funny:\n";
const TEMPERATURE = 1;

async function queryGPT4(query) {
  const payload = {
    model: "gpt-4",
    temperature: TEMPERATURE,
    messages: [
      {
        role: "user",
        content: INSTRUCTION + query,
      }
    ],
  };
  const res = await (await fetch(OPENAI_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify(payload),
  })).json();
  console.log(JSON.stringify(res));
  return res.choices[0].message.content;
}

async function queryClaude2(query) {
  const payload = {
    model: "claude-2",
    temperature: TEMPERATURE,
    prompt: `\n\nHuman: ${INSTRUCTION}${query}\n\nAssistant:`,
    max_tokens_to_sample: 512,
    temperature: 1,
  };
  const res = await (await fetch(CLAUDE_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": CLAUDE_API_KEY,
    },
    body: JSON.stringify(payload),
  })).json();
  console.log(JSON.stringify(res));
  return res.completion;
}

async function query(input, output, queryFunc) {
  const answers = JSON.parse(fs.readFileSync(output));
  const json = JSON.parse(fs.readFileSync(input));
  console.log(json.queries.length);
  for (let i = 0; i < json.queries.length; i++) {
    const id = json.queries[i].id;
    const query = json.queries[i].query;
    console.log(`query ${i}: ${query}`);
    if (answers.answers.find(a => a.id === id)) {
      console.log("already answered");
      continue;
    }
    const answer = await queryFunc(query);
    answers.answers.push({
      id,
      answer,
      rating: 1, // default
    });
    fs.writeFileSync(output, JSON.stringify(answers, undefined, 2));
  }
}

async function main() {
  await query("../humorset-1/queries.json", "../humorset-1/answers-gpt4.json", queryGPT4);
  await query("../humorset-1/queries.json", "../humorset-1/answers-claude2.json", queryClaude2);
}

main();