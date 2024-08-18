import { defineEventHandler, readBody } from 'h3';
import { agentService } from '../../utils/llm-agent.service';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const method = event._method;

  const response = await agentService.invokeAgent(
    body.msg,
    body.virtualProfile
  );

  return { message: response };
});
