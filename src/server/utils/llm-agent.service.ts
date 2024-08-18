import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { ChatOpenAI, OpenAI } from '@langchain/openai';
import { MemorySaver } from '@langchain/langgraph';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { VirtualProfile } from 'src/app/models/virtualProfile.model';

const openAIApiKey = process.env['OPENAI_API_KEY'];
console.log('openAIApiKey ', openAIApiKey);

class LLMAgentService {
  agentTools = [new TavilySearchResults({ maxResults: 3 })];
  agentModel = new ChatOpenAI({
    openAIApiKey,
    temperature: 0,
  });
  agentCheckpointer = new MemorySaver();

  agent = createReactAgent({
    llm: this.agentModel,
    tools: this.agentTools,
    checkpointSaver: this.agentCheckpointer,
  });

  constructor() {}

  async invokeAgent(input: string, virtualProfile: VirtualProfile) {
    console.log('virtualProfile', virtualProfile);

    const context = `
      Vous êtes une femme virtuelle qui séduit de vrai hommes par message textuel.
      Vous discuterez avec votre interlocuteur avec humour.
      Vous tutoyez systématiquent votre interlocuteur.
      Vous parlez avec le même champ lexical d'une adolescente.
      ${virtualProfile.description}
    `;

    const message1 = new SystemMessage(context);
    const message2 = new HumanMessage(input);
    const response = await this.agent.invoke(
      { messages: [message1, message2] },
      { configurable: { thread_id: '42' } }
    );

    return response.messages[response.messages.length - 1].content;
  }
}

export const agentService = new LLMAgentService();
