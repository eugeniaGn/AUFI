import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private openai: OpenAIApi;
  configuration = new Configuration({
    apiKey: environment.OPENAI_API_KEY,
  });

  constructor() {
    this.openai = new OpenAIApi(this.configuration);
  }

  async sendPetition(prompt: string): Promise<string | undefined>{
   try {
      const response = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        messages: [{"role": "user", "content": prompt}],
        max_tokens: 10000,
        temperature: 1
      });
      return response.data.choices[0].message?.content;
    } catch (error) {
      console.log(`An error has occured:${error}`);
    }
    return;
  }
}