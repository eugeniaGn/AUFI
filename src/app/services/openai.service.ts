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

  async sendPetition(prompt: string):Promise<string | undefined>{
   try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 256
      });
      console.log(response.data.choices[0].text);
    } catch (error) {
      console.log(`An error has occured:${error}`);
    }
    return;
  }
}