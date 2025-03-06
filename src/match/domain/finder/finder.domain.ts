import { BadRequestException } from '@nestjs/common';
import { Gender } from '../match/gender.domain';
import { IProfile } from '../profile/profile.domain';
import { IProfileRepository } from '../profile/profile.repository';
import { IAI } from 'src/match/infrastructure/rest/ai.rest.respository';

export abstract class Finder {
    protected args: Record<string, any>;

    constructor(args: Record<string, any> = {}) {
        this.args = args;
    }

    protected getArg<T>(key: string, defaultValue?: T): T {
        if (!(key in this.args) && defaultValue === undefined) {
            throw new Error(`Falta el parámetro '${key}' en ${this.constructor.name}.`);
        }
        return (this.args[key] ?? defaultValue) as T;
    }

    abstract find(): Promise<IProfile[]>;
}

/** Estrategia para traer todos los perfiles */
export class AllStrategy extends Finder {
    async find(): Promise<IProfile[]> {
        try {
            const profileRepo = this.getArg<IProfileRepository>('profileRepo');
            return await profileRepo.getProfileByFilter({});
        } catch (error) {
            throw new Error(
                `Error en la estrategia 'AllStrategy': ${(error as Error).message}`,
            );
        }
    }
}

/** Estrategia para buscar por género */
export class GenderStrategy extends Finder {
    async find(): Promise<IProfile[]> {
        try {
            const profileRepo = this.getArg<IProfileRepository>('profileRepo');
            const genders = this.getArg<Gender[]>('genders');

            if (!genders || genders.length === 0) {
                throw new BadRequestException(
                    'El parámetro "genders" no puede estar vacío.',
                );
            }

            return await profileRepo.getProfileByFilter({
                gender: genders as string[],
            });
        } catch (error) {
            throw new Error(
                `Error en la estrategia 'GenderStrategy':${(error as Error).message}`,
            );
        }
    }
}

export class AIStrategy extends Finder {
    async find(): Promise<IProfile[]> {
        try {
            const profileRepo = this.getArg<IProfileRepository>('profileRepo');
            const AI = this.getArg<IAI>('aiRepo');

            const profiles = await profileRepo.getProfileByFilter({});
            const criterio = 'género: FEMALE, suscripción: BASIC, role: ADMIN';

            const prompt = `
            ### INSTRUCCIONES IMPORTANTES:
            Eres un experto en selección de perfiles. 
            Tu tarea es devolver únicamente los índices de los perfiles que coincidan con los siguientes criterios:
            - ${criterio}
            - No añadas ningún texto adicional.
            
            Lista de perfiles:
            ${profiles.map((p, i) => `${i}, genero: ${p.gender}, subscripcion: ${p.type}, role:${p.role}`).join('\n')}
            
            Solo responde con los índices, separados por comas.  
            Ejemplo de respuesta:  
            19,26,27
            `;

            const response = await AI.getResponse(prompt, 0.5);

            const indicesSeleccionados = response
                ?.split(',')
                .map((index: string) => parseInt(index.trim(), 10))
                .filter(
                    (num: number) => !isNaN(num) && num >= 0 && num < profiles.length,
                );

            return indicesSeleccionados.map((index: number) => profiles[index]);
        } catch (error) {
            throw new Error(
                `Error en la estrategia 'AIStrategy': ${(error as Error).message}`,
            );
        }
    }
}

/** Contexto que maneja la estrategia actual */
export class ContextFinder {
    private finderStrategy?: Finder;

    setFinderStrategy(strategy: Finder): void {
        this.finderStrategy = strategy;
    }

    async findProfile(): Promise<IProfile[]> {
        if (!this.finderStrategy) {
            throw new Error('No se ha definido una estrategia de búsqueda.');
        }
        try {
            return await this.finderStrategy.find();
        } catch (error) {
            throw new BadRequestException(
                `Error en la ejecución de la estrategia de búsqueda: ${(error as Error).message}`,
            );
        }
    }
}

/** Fábrica que crea y almacena estrategias al inicializar */
export class FactoryStrategy {
    private strategies: Map<string, Finder> = new Map();

    constructor(
        profileRepo: IProfileRepository,
        aiRepo: IAI,
        args: Record<string, any> = {},
    ) {
        try {
            this.strategies.set('all', new AllStrategy({ profileRepo }));
            this.strategies.set('gender', new GenderStrategy({ profileRepo, ...args }));
            this.strategies.set('ai', new AIStrategy({ profileRepo, aiRepo, ...args }));
        } catch (error) {
            throw new Error(
                `Error al inicializar FactoryStrategy:${(error as Error).message}`,
            );
        }
    }

    /** Obtiene una estrategia ya instanciada */
    getStrategy(name: string): Finder | Error {
        const strategy = this.strategies.get(name);
        if (!strategy) {
            throw new Error(`Estrategia "${name}" no está registrada.`);
        }
        return strategy;
    }
}
