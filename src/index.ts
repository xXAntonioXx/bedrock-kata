import { config } from 'dotenv';
import {
    BedrockRuntimeClient,
    InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

config();
const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

function handler() {
    const prompt = 'Hello, Bedrock!';

    const command = new InvokeModelCommand({
        modelId: process.env.AWS_BEDROCK_MODEL_ID,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
            anthropic_version: process.env.AWS_BEDROCK_ANTHROPIC_VERSION,
            max_tokens: 300,
            messages: [{ role: 'user', content: prompt }],
        }),
    });

    client.send(command).then((data) => {
        const responseBody = JSON.parse(new TextDecoder().decode(data.body));
        console.log('Model response:', responseBody);
    });
}

handler();
