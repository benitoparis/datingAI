import { defineEventHandler, readBody } from 'h3';
import { agentService } from '../../utils/llm-agent.service';

export default defineEventHandler(async (event) => {
  console.log('event', event);

  const body = await readBody(event);
  const method = event._method;

  console.log({ body, method });

  const response = await agentService.invokeAgent(body.msg);

  return { message: response };
});
