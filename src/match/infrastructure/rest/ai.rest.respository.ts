import { Injectable } from '@nestjs/common';
import { getResponseAI } from 'src/match/config/deepseek';

export interface IAI {
    getResponse(prompt: string, creativity: number): Promise<any>;
}

@Injectable()
export class AI implements IAI {
    async getResponse(prompt: string, creativity: number): Promise<any> {
        return await getResponseAI(prompt, creativity);
    }
}
